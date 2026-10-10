import { unsplash } from '../utils/format';

export const offers = [
  {
    id: 'long-stay',
    title: 'Long Stay Discount',
    badge: 'Most Popular',
    discount: 10,
    minNights: 3,
    validTill: '2026-12-31',
    image: unsplash('1590490360182-c33d57733427', 900),
    description: 'Stay 3 nights or more and get 10% off your entire booking – applied automatically.',
    includes: ['10% off all room types', 'Free breakfast daily', 'Free late check-out (subject to availability)'],
  },
  {
    id: 'weekend',
    title: 'Weekend Getaway',
    badge: 'Weekend',
    discount: 15,
    minNights: 2,
    validTill: '2026-11-30',
    image: unsplash('1585412727339-54e4bae3bbf9', 900),
    description: 'Escape the routine with a relaxing two-night weekend break, rooftop dinner included.',
    includes: ['15% off 2+ nights', 'Rooftop BBQ dinner for two', 'Welcome drinks on arrival'],
  },
  {
    id: 'family',
    title: 'Family Package',
    badge: 'Kids Stay Free',
    discount: 20,
    minNights: 2,
    validTill: '2027-01-31',
    image: unsplash('1566665797739-1674de7a421a', 900),
    description: 'Make memories together in our Family Suite with special perks for the little ones.',
    includes: ['20% off Family Suite', 'Kids under 8 eat free', 'Free extra mattress & baby cot', 'City tour discount'],
  },
  {
    id: 'honeymoon',
    title: 'Honeymoon Package',
    badge: 'Romantic',
    discount: 25,
    minNights: 3,
    validTill: '2027-02-28',
    image: unsplash('1611892440504-42a792e24d32', 900),
    description: 'Celebrate your new beginning with a beautifully decorated Deluxe room and romantic extras.',
    includes: ['25% off Deluxe rooms', 'Flower & candle decoration', 'Candle-light rooftop dinner', 'Cake on arrival'],
  },
];

export const getOfferById = (id) => offers.find((offer) => offer.id === id);
