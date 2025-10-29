import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRGeneratorProps {
  sessionId: string;
  classId: string;
}

export const QRGenerator = ({ sessionId, classId }: QRGeneratorProps) => {
  const [qrData, setQrData] = useState('');
  const [timestamp, setTimestamp] = useState(Date.now());
  const [secondsLeft, setSecondsLeft] = useState(5);

  useEffect(() => {
    // Generate new QR data every 5 seconds
    const generateQR = () => {
      const data = JSON.stringify({
        sessionId,
        classId,
        timestamp: Date.now(),
      });
      setQrData(data);
      setTimestamp(Date.now());
      setSecondsLeft(5);
    };

    generateQR();
    const interval = setInterval(generateQR, 5000);

    return () => clearInterval(interval);
  }, [sessionId, classId]);

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - timestamp) / 1000);
      setSecondsLeft(Math.max(0, 5 - elapsed));
    }, 100);

    return () => clearInterval(timer);
  }, [timestamp]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl">
        {qrData && (
          <QRCodeSVG
            value={qrData}
            size={300}
            level="H"
            includeMargin
            className="rounded-lg"
          />
        )}
      </div>

      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            QR Code Active
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Refreshes in {secondsLeft}s
        </p>
        <div className="w-48 mx-auto bg-gray-200 dark:bg-slate-700 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-100"
            style={{ width: `${(secondsLeft / 5) * 100}%` }}
          />
        </div>
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400 text-center max-w-md">
        <p>Students must scan within 5 seconds of QR generation</p>
        <p>QR code automatically refreshes for security</p>
      </div>
    </div>
  );
};
