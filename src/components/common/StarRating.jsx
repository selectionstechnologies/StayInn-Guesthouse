import { Star } from 'lucide-react';

export default function StarRating({ rating, size = 16, className = '' }) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`} role="img" aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          width={size}
          height={size}
          aria-hidden="true"
          className={i <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}
        />
      ))}
    </div>
  );
}
