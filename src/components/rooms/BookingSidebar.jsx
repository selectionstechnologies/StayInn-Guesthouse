import { useNavigate } from 'react-router-dom';
import { CalendarCheck, ShieldCheck } from 'lucide-react';
import DateInput from '../common/DateInput';
import { useBooking } from '../../hooks/useBooking';
import { addDays, calcPrice, formatPrice, nightsBetween } from '../../utils/format';

export default function BookingSidebar({ room }) {
  const navigate = useNavigate();
  const { search, setSearch } = useBooking();
  const today = new Date();
  const nights = nightsBetween(search.checkIn, search.checkOut);
  const price = calcPrice(room.price, nights);
  const guests = Math.min(search.guests || 1, room.maxGuests);

  const handleCheckIn = (date) => {
    const patch = { checkIn: date };
    if (!search.checkOut || (date && search.checkOut <= date)) patch.checkOut = date ? addDays(date, 1) : null;
    setSearch(patch);
  };

  const handleBook = () => {
    setSearch({ guests });
    navigate(`/booking?room=${room.slug}`);
  };

  return (
    <div id="booking-card" className="card p-6 lg:sticky lg:top-28">
      <p className="flex items-baseline gap-1">
        <span className="font-heading text-3xl font-bold text-primary">{formatPrice(room.price)}</span>
        <span className="text-sm text-gray-500">/ night</span>
      </p>

      <div className="mt-6 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="side-checkin" className="label">Check-in</label>
            <DateInput id="side-checkin" selected={search.checkIn} onChange={handleCheckIn} minDate={today} placeholder="Add date" />
          </div>
          <div>
            <label htmlFor="side-checkout" className="label">Check-out</label>
            <DateInput
              id="side-checkout"
              selected={search.checkOut}
              onChange={(d) => setSearch({ checkOut: d })}
              minDate={search.checkIn ? addDays(search.checkIn, 1) : addDays(today, 1)}
              placeholder="Add date"
            />
          </div>
        </div>
        <div>
          <label htmlFor="side-guests" className="label">Guests</label>
          <select id="side-guests" value={guests} onChange={(e) => setSearch({ guests: Number(e.target.value) })} className="input">
            {Array.from({ length: room.maxGuests }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
            ))}
          </select>
        </div>
      </div>

      {nights > 0 ? (
        <dl className="mt-6 space-y-2.5 border-t border-gray-100 pt-5 text-sm">
          <div className="flex justify-between text-gray-600">
            <dt>{formatPrice(room.price)} × {nights} {nights === 1 ? 'night' : 'nights'}</dt>
            <dd>{formatPrice(price.subtotal)}</dd>
          </div>
          {price.discount > 0 && (
            <div className="flex justify-between text-accent">
              <dt>{price.discountLabel}</dt>
              <dd>−{formatPrice(price.discount)}</dd>
            </div>
          )}
          <div className="flex justify-between border-t border-gray-100 pt-3 text-base font-bold">
            <dt>Total</dt>
            <dd>{formatPrice(price.total)}</dd>
          </div>
        </dl>
      ) : (
        <p className="mt-5 rounded-xl bg-cream p-3 text-center text-sm text-gray-600">Select dates to see the total price.</p>
      )}

      <button
        type="button"
        onClick={handleBook}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 font-semibold text-white transition-colors hover:bg-primary-600"
      >
        <CalendarCheck className="h-5 w-5" aria-hidden="true" /> Book Now
      </button>
      <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-gray-500">
        <ShieldCheck className="h-4 w-4 text-accent" aria-hidden="true" /> Free cancellation up to 48 hours before
      </p>
    </div>
  );
}
