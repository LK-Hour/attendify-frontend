export interface GeoLocation {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

export interface GeofenceConfig {
  latitude: number;
  longitude: number;
  radius: number; // in meters
}

/**
 * Calculate distance between two coordinates using Haversine formula
 * @returns distance in meters
 */
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

/**
 * Get current location from browser
 */
export const getCurrentLocation = (): Promise<GeoLocation> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new Error('Location permission denied'));
            break;
          case error.POSITION_UNAVAILABLE:
            reject(new Error('Location information unavailable'));
            break;
          case error.TIMEOUT:
            reject(new Error('Location request timed out'));
            break;
          default:
            reject(new Error('An unknown error occurred'));
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
};

/**
 * Validate if current location is within geofence
 */
export const validateGeofence = async (
  geofence: GeofenceConfig
): Promise<{ valid: boolean; distance: number; message: string }> => {
  try {
    const location = await getCurrentLocation();
    const distance = calculateDistance(
      location.latitude,
      location.longitude,
      geofence.latitude,
      geofence.longitude
    );

    const valid = distance <= geofence.radius;

    return {
      valid,
      distance: Math.round(distance),
      message: valid
        ? `You are within the allowed area (${Math.round(distance)}m from room)`
        : `You are too far from the room (${Math.round(distance)}m away, maximum ${geofence.radius}m allowed)`,
    };
  } catch (error) {
    throw error;
  }
};
