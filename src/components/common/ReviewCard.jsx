import { Quote } from 'lucide-react';
import StarRating from './StarRating';

export default function ReviewCard({ review }) {
  const initials = review.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);
  return (
    <article className="card flex h-full flex-col p-7">
      <Quote className="mb-4 h-8 w-8 text-primary-200" aria-hidden="true" />
      <StarRating rating={review.rating} />
      <p className="mt-4 flex-1 leading-relaxed text-gray-600">“{review.text}”</p>
      <div className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-5">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white" aria-hidden="true">
          {initials}
        </span>
        <div>
          <p className="font-semibold">{review.name}</p>
          <p className="text-xs text-gray-500">
            {review.country} · {review.date}
          </p>
        </div>
      </div>
    </article>
  );
}
