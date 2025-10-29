import React, { useEffect, useRef, useState } from 'react';
import * as blazeface from '@tensorflow-models/blazeface';

interface FaceVerificationProps {
  onVerification: (success: boolean, confidence: number) => void;
  threshold?: number;
}

export const FaceVerification: React.FC<FaceVerificationProps> = ({
  onVerification,
  threshold = 0.8, // 80% confidence required
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let isMounted = true;

    const setupCamera = async () => {
      try {
        // Request camera access
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
          audio: false,
        });

        if (videoRef.current && isMounted) {
          videoRef.current.srcObject = stream;
        }

        // Load the model
        const model = await blazeface.load();
        
        // Start face detection
        const detectFace = async () => {
          if (!videoRef.current || !isMounted) return;

          const predictions = await model.estimateFaces(videoRef.current, false);
            
          if (predictions.length > 0) {
            // Get the confidence score
            const confidence = (predictions[0] as any).probability?.[0] || 0;
              
            // Check if the confidence meets our threshold
            if (isMounted) {
              onVerification(confidence >= threshold, confidence);
            }

            // Check for liveness (simplified version)
            const isLive = await checkLiveness(predictions[0]);
            if (!isLive && isMounted) {
              setError('Please show natural movement');
              return;
            }
          } else if (isMounted) {
            onVerification(false, 0);
            setError('No face detected');
          }
        };

        // Run detection every 500ms
        const interval = setInterval(detectFace, 500);
        if (isMounted) {
          setIsLoading(false);
          setError(null);
        }

        return () => {
          clearInterval(interval);
        };
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to access camera');
          setIsLoading(false);
        }
      }
    };

    setupCamera();
    
    return () => {
      isMounted = false;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [onVerification, threshold]);

  // Simple liveness detection check
  const checkLiveness = async (face: blazeface.NormalizedFace): Promise<boolean> => {
    // In a real implementation, you would:
    // 1. Track face landmarks over multiple frames
    // 2. Detect blink patterns
    // 3. Check for natural head movement
    // 4. Use challenge-response patterns
    return true; // Simplified for demo
  };

  return (
    <div className="relative rounded-lg overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-white">
            <svg
              className="animate-spin h-8 w-8 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <div className="mt-2">Initializing camera...</div>
          </div>
        </div>
      )}
      
      {error && (
        <div className="absolute top-0 left-0 right-0 bg-red-500 text-white text-center py-2 text-sm">
          {error}
        </div>
      )}
      
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-[300px] object-cover"
      />

      <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 text-white text-xs text-center">
        Please look at the camera and move naturally
      </div>
    </div>
  );
};