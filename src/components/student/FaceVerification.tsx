import { useState, useEffect, useRef } from 'react';

interface FaceVerificationProps {
  onVerified: () => void;
  onError?: (error: string) => void;
}

export const FaceVerification = ({ onVerified, onError }: FaceVerificationProps) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isVerifying) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isVerifying]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 640, height: 480 },
      });
      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      // Mock face detection - in production, use TensorFlow.js BlazeFace
      simulateFaceDetection();
    } catch (err) {
      onError?.('Camera access denied. Please enable camera permissions.');
      setIsVerifying(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const simulateFaceDetection = () => {
    // Mock face detection with gradual confidence increase
    // In production, integrate @tensorflow-models/blazeface here
    let currentConfidence = 0;
    const interval = setInterval(() => {
      currentConfidence += 10;
      setConfidence(currentConfidence);

      if (currentConfidence >= 80) {
        clearInterval(interval);
        setTimeout(() => {
          onVerified();
          setIsVerifying(false);
        }, 500);
      }
    }, 200);

    // Cleanup after 5 seconds max
    setTimeout(() => {
      clearInterval(interval);
      if (currentConfidence < 80) {
        onError?.('Face verification failed. Please ensure good lighting and look at the camera.');
        setIsVerifying(false);
      }
    }, 5000);
  };

  return (
    <div className="space-y-4">
      {!isVerifying ? (
        <button
          onClick={() => setIsVerifying(true)}
          className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          Start Face Verification
        </button>
      ) : (
        <div className="space-y-4">
          <div className="relative rounded-lg overflow-hidden border-2 border-primary-500 bg-black">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-auto"
            />
            {confidence > 0 && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm font-medium">Confidence:</span>
                  <span className="text-white text-sm font-bold">{confidence}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      confidence >= 80 ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${confidence}%` }}
                  />
                </div>
                <p className="text-white text-xs mt-2 text-center">
                  {confidence >= 80
                    ? '✓ Face verified successfully!'
                    : 'Please look at the camera...'}
                </p>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsVerifying(false)}
            className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      )}

      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
        <p className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Ensure good lighting for better results
        </p>
        <p className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          Look directly at the camera
        </p>
      </div>
    </div>
  );
};
