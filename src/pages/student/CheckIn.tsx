import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/templates';
import { Card } from '../../components/molecules';
import { FaceVerification } from '../../components/student/FaceVerification';
import { QRScanner } from '../../components/student/QRScanner';
import { validateGeofence } from '../../services/geolocation.service';
import { validateDevice } from '../../services/fingerprint.service';

type Step = 'face' | 'qr' | 'location' | 'device' | 'success';

export const CheckIn = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>('face');
  const [faceVerified, setFaceVerified] = useState(false);
  const [qrScanned, setQrScanned] = useState(false);
  const [locationVerified, setLocationVerified] = useState(false);
  const [deviceVerified, setDeviceVerified] = useState(false);
  const [error, setError] = useState<string>('');

  const steps: { id: Step; label: string; completed: boolean }[] = [
    { id: 'face', label: 'Face Verification', completed: faceVerified },
    { id: 'qr', label: 'QR Code Scan', completed: qrScanned },
    { id: 'location', label: 'Location Check', completed: locationVerified },
    { id: 'device', label: 'Device Check', completed: deviceVerified },
    { id: 'success', label: 'Complete', completed: currentStep === 'success' },
  ];

  const handleFaceVerified = () => {
    setFaceVerified(true);
    setCurrentStep('qr');
  };

  const handleQRScanned = async (data: string) => {
    console.log('QR Data:', data);
    setQrScanned(true);
    setCurrentStep('location');
    
    try {
      // Validate geofence
      setError('');
      const locationResult = await validateGeofence({
        latitude: 11.5564,
        longitude: 104.9282,
        radius: 100,
      });

      if (!locationResult.valid) {
        setError(locationResult.message);
        return;
      }

      setLocationVerified(true);
      setCurrentStep('device');

      // Validate device
      const deviceResult = await validateDevice();
      if (!deviceResult.valid) {
        setError(deviceResult.message);
        return;
      }

      setDeviceVerified(true);
      setCurrentStep('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
    }
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Check-In</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Complete all steps to mark your attendance
          </p>
        </div>

        {/* Progress Steps */}
        <Card>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Progress</h2>
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                        step.completed
                          ? 'bg-green-500 text-white'
                          : currentStep === step.id
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-300 dark:bg-slate-700 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {step.completed ? '✓' : index + 1}
                    </div>
                    <span className="text-xs mt-2 text-center text-gray-600 dark:text-gray-400">
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-2 transition-colors ${
                        step.completed ? 'bg-green-500' : 'bg-gray-300 dark:bg-slate-700'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Error Message */}
        {error && (
          <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800">
            <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        {/* Step Content */}
        <Card>
          {currentStep === 'face' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Step 1: Face Verification
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Please look at the camera for face verification (80% confidence required)
                </p>
              </div>
              <FaceVerification onVerified={handleFaceVerified} onError={handleError} />
            </div>
          )}

          {currentStep === 'qr' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Step 2: Scan QR Code
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Scan the QR code displayed by your lecturer (valid for 5 seconds)
                </p>
              </div>
              <QRScanner onScan={handleQRScanned} onError={handleError} />
            </div>
          )}

          {currentStep === 'location' && (
            <div className="space-y-4 text-center py-8">
              <div className="flex justify-center">
                <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Step 3: Verifying Location
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Checking if you're within the classroom geofence...
                </p>
              </div>
            </div>
          )}

          {currentStep === 'device' && (
            <div className="space-y-4 text-center py-8">
              <div className="flex justify-center">
                <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Step 4: Verifying Device
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Checking device fingerprint...
                </p>
              </div>
            </div>
          )}

          {currentStep === 'success' && (
            <div className="space-y-6 text-center py-8">
              <div className="flex justify-center">
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Attendance Marked Successfully!
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Your attendance has been recorded for this session.
                </p>
              </div>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => navigate('/student/dashboard')}
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  Go to Dashboard
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600 transition-colors font-medium"
                >
                  Check-In Again
                </button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};
