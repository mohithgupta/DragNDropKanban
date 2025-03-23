import { useState, useEffect, useCallback, useRef } from 'react';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const timeoutId = useRef();

  const handleResize = useCallback(() => {
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => setIsMobile(window.innerWidth <= 768), 100);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId.current);
    };
  }, [handleResize]);

  return isMobile;
};

export default useIsMobile;