
import { useRef } from 'react';

function SmartImage({ src, fallback, className }) {
  const ref = useRef();

  function handleFallback() {
    // Nullify the error event for subsequent calls
    ref.current.onError = null;
    ref.current.src = fallback;
  }

  return <img ref={ref} src={src} onError={handleFallback} className={className}/>;
}

export default SmartImage;