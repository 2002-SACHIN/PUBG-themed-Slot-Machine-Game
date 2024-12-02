import React, { useEffect, useState } from 'react';

interface CountdownTimerProps {
  isSpinning: boolean;
  duration: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ isSpinning, duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!isSpinning) {
      setTimeLeft(duration);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 10;
      });
    }, 10);

    return () => clearInterval(timer);
  }, [isSpinning, duration]);

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const milliseconds = ms % 1000;
    return `${seconds}.${milliseconds.toString().padStart(3, '0')}`;
  };

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 transform">
      <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 
                    px-6 py-2 rounded-lg shadow-lg border border-indigo-400">
        <span className="font-mono text-2xl font-bold text-white 
                       tracking-wider neon-text">
          {isSpinning ? formatTime(timeLeft) : formatTime(duration)}
        </span>
      </div>
    </div>
  );
};