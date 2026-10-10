import { useState } from 'react';
import { SlidersHorizontal, RotateCcw, ChevronDown } from 'lucide-react';
import { roomTypes } from '../../data/rooms';
import { formatPrice } from '../../utils/format';

export default function RoomFilters({ filters, onChange, onReset, minPrice, maxPrice, resultCount }) {
  const [open, setOpen] = useState(false);

  return (
    <aside className="card p-5 lg:sticky lg:top-28 lg:p-6" aria-label="Room filters">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between lg:pointer-events-none"
      >
        <span className="flex items-center gap-2 font-semibold">
          <SlidersHorizontal className="h-5 w-5 text-primary" aria-hidden="true" /> Filters
          <span className="rounded-full bg-primary-50 px-2 py-0.5 text-xs text-primary">{resultCount} rooms</span>
        </span>
        <ChevronDown className={`h-5 w-5 transition-transform lg:hidden ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      <div className={`${open ? 'block' : 'hidden'} mt-6 space-y-7 lg:block`}>
        <fieldset>
          <legend className="label">Room type</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {['All', ...roomTypes].map((type) => {
              const active = (filters.type || 'All') === type;
              return (
                <button
                  key={type}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onChange({ type: type === 'All' ? '' : type })}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${active ? 'bg-primary text-white' : 'bg-cream text-charcoal hover:bg-primary-50'}`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div>
          <label htmlFor="price-range" className="label flex justify-between">
            Max price / night <span className="font-semibold text-primary">{formatPrice(filters.maxPrice)}</span>
          </label>
          <input
            id="price-range"
            type="range"
            min={minPrice}
            max={maxPrice}
            step={500}
            value={filters.maxPrice}
            onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
            className="mt-2 w-full accent-primary"
          />
          <div className="mt-1 flex justify-between text-xs text-gray-500">
            <span>{formatPrice(minPrice)}</span>
            <span>{formatPrice(maxPrice)}</span>
          </div>
        </div>

        <div>
          <label htmlFor="guests-filter" className="label">Guests</label>
          <select
            id="guests-filter"
            value={filters.guests}
            onChange={(e) => onChange({ guests: Number(e.target.value) })}
            className="input"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>{n}+ {n === 1 ? 'guest' : 'guests'}</option>
            ))}
          </select>
        </div>

        <button type="button" onClick={onReset} className="flex items-center gap-2 text-sm font-medium text-primary hover:underline">
          <RotateCcw className="h-4 w-4" aria-hidden="true" /> Reset filters
        </button>
      </div>
    </aside>
  );
}
