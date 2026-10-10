import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function Logo({ light = false }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="StayInn Guesthouse – home">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-soft">
        <Home className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="leading-none">
        <span className={`block font-heading text-xl font-bold ${light ? 'text-white' : 'text-charcoal'}`}>StayInn</span>
        <span className={`block text-[10px] font-medium uppercase tracking-[0.25em] ${light ? 'text-white/70' : 'text-gray-500'}`}>
          Guesthouse
        </span>
      </span>
    </Link>
  );
}
