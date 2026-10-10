const DAY = 24 * 60 * 60 * 1000;

export const unsplash = (id, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

export const formatPrice = (amount) => `Rs ${Math.round(amount).toLocaleString('en-PK')}`;

export const startOfDay = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const addDays = (date, days) => new Date(startOfDay(date).getTime() + days * DAY);

export const nightsBetween = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 0;
  return Math.max(0, Math.round((startOfDay(checkOut) - startOfDay(checkIn)) / DAY));
};

export const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '—';

export const LONG_STAY = { minNights: 3, percent: 10, label: 'Long stay (3+ nights) – 10% off' };

/** Price breakdown for a stay; applies the best of long-stay discount or a selected offer. */
export function calcPrice(pricePerNight, nights, offer) {
  const subtotal = pricePerNight * nights;
  const candidates = [];
  if (nights >= LONG_STAY.minNights) candidates.push({ percent: LONG_STAY.percent, label: LONG_STAY.label });
  if (offer && nights >= (offer.minNights || 1)) {
    candidates.push({ percent: offer.discount, label: `${offer.title} – ${offer.discount}% off` });
  }
  const best = candidates.sort((a, b) => b.percent - a.percent)[0];
  const discount = best ? Math.round((subtotal * best.percent) / 100) : 0;
  return { nights, subtotal, discount, discountLabel: best?.label || '', total: subtotal - discount };
}
