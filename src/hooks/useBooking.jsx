import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { startOfDay } from '../utils/format';

const BookingContext = createContext(null);
const STORAGE_KEY = 'stayinn-search';
const defaults = { checkIn: null, checkOut: null, guests: 2, roomType: '' };

function loadSearch() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;
    const saved = JSON.parse(raw);
    const checkIn = saved.checkIn ? new Date(saved.checkIn) : null;
    const checkOut = saved.checkOut ? new Date(saved.checkOut) : null;
    // Ignore stale dates from a previous visit.
    if (checkIn && checkIn < startOfDay(new Date())) return { ...defaults, guests: saved.guests || 2 };
    return { ...defaults, ...saved, checkIn, checkOut };
  } catch {
    return defaults;
  }
}

/** Shares the guest's search (dates, guests, room type) across pages so the booking flow stays prefilled. */
export function BookingProvider({ children }) {
  const [search, setSearchState] = useState(loadSearch);

  const setSearch = useCallback((patch) => setSearchState((prev) => ({ ...prev, ...patch })), []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(search));
    } catch {
      /* storage unavailable */
    }
  }, [search]);

  const value = useMemo(() => ({ search, setSearch }), [search, setSearch]);
  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export const useBooking = () => useContext(BookingContext);
