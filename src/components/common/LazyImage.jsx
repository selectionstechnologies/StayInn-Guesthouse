import { useState } from 'react';

const FALLBACK =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><rect width='400' height='300' fill='%23F5E1D1'/><path d='M150 165 200 120l50 45v45a5 5 0 0 1-5 5h-25v-30h-40v30h-25a5 5 0 0 1-5-5Z' fill='%23C2703D' opacity='.5'/></svg>";

/** Lazy-loaded image with shimmer skeleton and graceful fallback. Size the wrapper via wrapperClassName. */
export default function LazyImage({ src, alt, className = '', wrapperClassName = '', eager = false, ...props }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-primary-50 ${wrapperClassName}`}>
      {!loaded && <div className="skeleton absolute inset-0" aria-hidden="true" />}
      <img
        src={failed ? FALLBACK : src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => (failed ? setLoaded(true) : setFailed(true))}
        className={`h-full w-full object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        {...props}
      />
    </div>
  );
}
