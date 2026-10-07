import { useState, useEffect, useRef, useCallback } from 'react';
import { formatTime } from '../utils/helpers';

export function useTimer(initialSeconds = 120) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback((seconds = initialSeconds) => {
    setIsRunning(false);
    setTimeLeft(seconds);
  }, [initialSeconds]);

  const formatted = formatTime(timeLeft);
  const progress = ((initialSeconds - timeLeft) / initialSeconds) * 100;

  return { timeLeft, formatted, isRunning, progress, start, pause, reset };
}
