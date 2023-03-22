import { useState, useEffect, useRef } from 'react';

const useThrottle = (click: boolean, delay = 2000) => {
  const [throttle, setThrottle] = useState(false);
  const timeRef = useRef(Date.now());
  useEffect(() => {
    timeRef.current = Date.now();
    setThrottle(click);
  }, [click]);
  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - timeRef.current >= delay) {
        setThrottle(false);
      }
    }, delay - (Date.now() - timeRef.current));

    return () => {
      clearTimeout(handler);
    };
  }, [click, delay]);
  return throttle;
};
export default useThrottle;
