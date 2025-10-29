import { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

interface QRScannerProps {
  onScan: (data: string) => void;
  onError?: (error: string) => void;
}

export const QRScanner = ({ onScan, onError }: QRScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const scannerDivId = 'qr-reader';

  useEffect(() => {
    if (isScanning && !scannerRef.current) {
      scannerRef.current = new Html5QrcodeScanner(
        scannerDivId,
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        },
        false
      );

      scannerRef.current.render(
        (decodedText) => {
          onScan(decodedText);
          stopScanning();
        },
        (errorMessage) => {
          // Ignore frequent scan failures
          if (onError && errorMessage.includes('NotFoundException')) {
            console.debug('No QR code found');
          }
        }
      );
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
        scannerRef.current = null;
      }
    };
  }, [isScanning, onScan, onError]);

  const startScanning = () => {
    setIsScanning(true);
  };

  const stopScanning = () => {
    setIsScanning(false);
    if (scannerRef.current) {
      scannerRef.current.clear().catch(console.error);
      scannerRef.current = null;
    }
  };

  return (
    <div className="space-y-4">
      {!isScanning ? (
        <button
          onClick={startScanning}
          className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          Start QR Scanner
        </button>
      ) : (
        <div className="space-y-4">
          <div id={scannerDivId} className="rounded-lg overflow-hidden border-2 border-primary-500" />
          <button
            onClick={stopScanning}
            className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Stop Scanning
          </button>
        </div>
      )}
    </div>
  );
};
