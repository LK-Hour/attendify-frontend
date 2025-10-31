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
    <div className="flex flex-col items-center space-y-3 sm:space-y-4">
      <div className="w-full max-w-[280px] rounded-2xl bg-white p-4 shadow-2xl dark:bg-slate-800 sm:max-w-[320px] sm:p-8">
        {qrData && (
          <QRCodeSVG
            value={qrData}
            size={256}
            level="H"
            includeMargin
            className="h-auto w-full rounded-lg"
          />
        )}
      </div>

      <div className="space-y-2 text-center">
        <div className="flex items-center justify-center gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-500 sm:h-3 sm:w-3" />
          <span className="text-base font-semibold text-gray-900 dark:text-white sm:text-lg">
            QR Code Active
          </span>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
          Refreshes in {secondsLeft}s
        </p>
        <div className="mx-auto h-1.5 w-36 rounded-full bg-gray-200 dark:bg-slate-700 sm:h-2 sm:w-48">
          <div
            className="h-1.5 rounded-full bg-primary-600 transition-all duration-100 sm:h-2"
            style={{ width: `${(secondsLeft / 5) * 100}%` }}
          />
        </div>
      </div>

      <div className="max-w-xs px-4 text-center text-xs text-gray-500 dark:text-gray-400 sm:max-w-md sm:px-0">
        <p>Students must scan within 5 seconds of QR generation</p>
        <p>QR code automatically refreshes for security</p>
      </div>
    </div>
  );
};
