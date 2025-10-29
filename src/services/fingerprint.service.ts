// Mock FingerprintJS implementation for now
// In production, use @fingerprintjs/fingerprintjs-pro

export interface DeviceFingerprint {
  visitorId: string;
  components: {
    userAgent: string;
    platform: string;
    language: string;
    screenResolution: string;
    timezone: string;
    plugins: string[];
    canvas: string;
  };
  timestamp: number;
}

/**
 * Generate device fingerprint
 * In production, replace with FingerprintJS Pro
 */
export const generateFingerprint = async (): Promise<DeviceFingerprint> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  let canvasFingerprint = '';

  if (ctx) {
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('Attendify', 2, 2);
    canvasFingerprint = canvas.toDataURL().slice(-50);
  }

  const components = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    screenResolution: `${screen.width}x${screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    plugins: Array.from(navigator.plugins).map((p) => p.name),
    canvas: canvasFingerprint,
  };

  // Generate a simple hash from components
  const hash = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(JSON.stringify(components))
  );
  const visitorId = Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 20);

  return {
    visitorId,
    components,
    timestamp: Date.now(),
  };
};

/**
 * Get stored device fingerprints for user
 */
export const getStoredFingerprints = (): string[] => {
  const stored = localStorage.getItem('device_fingerprints');
  return stored ? JSON.parse(stored) : [];
};

/**
 * Save device fingerprint
 */
export const saveFingerprint = (visitorId: string): void => {
  const existing = getStoredFingerprints();
  if (!existing.includes(visitorId)) {
    existing.push(visitorId);
    localStorage.setItem('device_fingerprints', JSON.stringify(existing));
  }
};

/**
 * Validate if current device is registered
 */
export const validateDevice = async (): Promise<{
  valid: boolean;
  visitorId: string;
  message: string;
}> => {
  const fingerprint = await generateFingerprint();
  const stored = getStoredFingerprints();
  const valid = stored.includes(fingerprint.visitorId);

  return {
    valid,
    visitorId: fingerprint.visitorId,
    message: valid
      ? 'Device recognized'
      : 'New device detected. Please register this device first.',
  };
};

/**
 * Remove device fingerprint
 */
export const removeFingerprint = (visitorId: string): void => {
  const existing = getStoredFingerprints();
  const filtered = existing.filter((id) => id !== visitorId);
  localStorage.setItem('device_fingerprints', JSON.stringify(filtered));
};
