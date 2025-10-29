import { useState } from 'react';
import { DashboardLayout } from '../../components/templates';
import { Card } from '../../components/molecules';

interface Settings {
  qrRefreshInterval: number;
  faceConfidenceThreshold: number;
  geofenceRadius: number;
  sessionTimeout: number;
}

export const Settings = () => {
  const [settings, setSettings] = useState<Settings>({
    qrRefreshInterval: 5,
    faceConfidenceThreshold: 80,
    geofenceRadius: 100,
    sessionTimeout: 60,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // In production, save to backend
    localStorage.setItem('system_settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">System Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Configure attendance system parameters
          </p>
        </div>

        {/* Settings Form */}
        <Card>
          <div className="space-y-6">
            {/* QR Settings */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                QR Code Settings
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    QR Refresh Interval (seconds)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={settings.qrRefreshInterval}
                    onChange={(e) =>
                      setSettings({ ...settings, qrRefreshInterval: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    How often QR codes refresh for security (1-60 seconds)
                  </p>
                </div>
              </div>
            </div>

            {/* Face Verification Settings */}
            <div className="pt-6 border-t border-gray-200 dark:border-slate-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Face Verification Settings
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Minimum Confidence Threshold (%)
                  </label>
                  <input
                    type="number"
                    min="50"
                    max="100"
                    value={settings.faceConfidenceThreshold}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        faceConfidenceThreshold: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Minimum face detection confidence required (50-100%)
                  </p>
                </div>
              </div>
            </div>

            {/* Geofence Settings */}
            <div className="pt-6 border-t border-gray-200 dark:border-slate-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Geofence Settings
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Default Geofence Radius (meters)
                  </label>
                  <input
                    type="number"
                    min="50"
                    max="500"
                    step="10"
                    value={settings.geofenceRadius}
                    onChange={(e) =>
                      setSettings({ ...settings, geofenceRadius: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Maximum distance students can be from classroom (50-500 meters)
                  </p>
                </div>
              </div>
            </div>

            {/* Session Settings */}
            <div className="pt-6 border-t border-gray-200 dark:border-slate-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Session Settings
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Session Timeout (minutes)
                  </label>
                  <input
                    type="number"
                    min="15"
                    max="180"
                    step="15"
                    value={settings.sessionTimeout}
                    onChange={(e) =>
                      setSettings({ ...settings, sessionTimeout: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    How long attendance sessions stay active (15-180 minutes)
                  </p>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-6 border-t border-gray-200 dark:border-slate-700">
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                {saved ? '✓ Settings Saved!' : 'Save Settings'}
              </button>
            </div>
          </div>
        </Card>

        {/* Preview */}
        <Card>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Current Configuration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-slate-900">
              <div className="text-sm text-gray-600 dark:text-gray-400">QR Refresh</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {settings.qrRefreshInterval}s
              </div>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-slate-900">
              <div className="text-sm text-gray-600 dark:text-gray-400">Face Confidence</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {settings.faceConfidenceThreshold}%
              </div>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-slate-900">
              <div className="text-sm text-gray-600 dark:text-gray-400">Geofence Radius</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {settings.geofenceRadius}m
              </div>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-slate-900">
              <div className="text-sm text-gray-600 dark:text-gray-400">Session Timeout</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {settings.sessionTimeout} min
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};
