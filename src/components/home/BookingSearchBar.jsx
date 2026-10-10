import { useNavigate } from 'react-router-dom';
import { Search, Users, BedDouble } from 'lucide-react';
import DateInput from '../common/DateInput';
import { useBooking } from '../../hooks/useBooking';
import { roomTypes } from '../../data/rooms';
import { addDays } from '../../utils/format';

export default function BookingSearchBar() {
  const navigate = useNavigate();
  const { search, setSearch } = useBooking();
  const today = new Date();

  const handleCheckIn = (date) => {
    const patch = { checkIn: date };
    if (!search.checkOut || (date && search.checkOut <= date)) patch.checkOut = date ? addDays(date, 1) : null;
    setSearch(patch);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search.roomType) params.set('type', search.roomType);
    if (search.guests) params.set('guests', search.guests);
    navigate(`/rooms?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-2xl bg-white p-4 shadow-lift sm:grid-cols-2 md:p-5 lg:grid-cols-[1fr_1fr_0.8fr_1fr_auto] lg:items-end"
      aria-label="Search room availability"
    >
      <div>
        <label htmlFor="search-checkin" className="label">Check-in</label>
        <DateInput id="search-checkin" selected={search.checkIn} onChange={handleCheckIn} minDate={today} placeholder="Add date" />
      </div>
      <div>
        <label htmlFor="search-checkout" className="label">Check-out</label>
        <DateInput
          id="search-checkout"
          selected={search.checkOut}
          onChange={(date) => setSearch({ checkOut: date })}
          minDate={search.checkIn ? addDays(search.checkIn, 1) : addDays(today, 1)}
          placeholder="Add date"
        />
      </div>
      <div>
        <label htmlFor="search-guests" className="label">Guests</label>
        <div className="relative">
          <Users className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" aria-hidden="true" />
          <select
            id="search-guests"
            value={search.guests}
            onChange={(e) => setSearch({ guests: Number(e.target.value) })}
            className="input appearance-none pl-11"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? 'Guest' : 'Guests'}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="search-type" className="label">Room type</label>
        <div className="relative">
          <BedDouble className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" aria-hidden="true" />
          <select
            id="search-type"
            value={search.roomType}
            onChange={(e) => setSearch({ roomType: e.target.value })}
            className="input appearance-none pl-11"
          >
            <option value="">Any room</option>
            {roomTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-600 sm:col-span-2 lg:col-span-1"
      >
        <Search className="h-4 w-4" aria-hidden="true" /> Check Availability
      </button>
    </form>
  );
}
