import { unsplash } from '../utils/format';

export const amenities = [
  { icon: 'Wifi', title: 'Free Wi-Fi', description: 'High-speed fibre internet in every room and common area.' },
  { icon: 'Croissant', title: 'Breakfast Included', description: 'Fresh desi & continental breakfast every morning.' },
  { icon: 'Car', title: 'Free Parking', description: 'Secure, gated on-site parking for all guests.' },
  { icon: 'ConciergeBell', title: '24/7 Reception', description: 'Our friendly team is here for you day and night.' },
  { icon: 'Snowflake', title: 'AC Rooms', description: 'Individually controlled heating and cooling.' },
  { icon: 'ShowerHead', title: 'Hot Water', description: 'Round-the-clock hot water with backup supply.' },
  { icon: 'WashingMachine', title: 'Laundry', description: 'Same-day laundry and ironing service.' },
  { icon: 'Plane', title: 'Airport Pickup', description: 'Comfortable pick & drop on request.' },
  { icon: 'Cctv', title: 'CCTV Security', description: '24-hour surveillance and secure key access.' },
];

export const whyChooseUs = [
  { icon: 'MapPin', title: 'Prime Location', description: 'In the heart of Gulberg – close to shopping, dining and business districts.' },
  { icon: 'BadgeDollarSign', title: 'Best Value', description: 'Hotel-quality comfort at guesthouse prices, with breakfast included.' },
  { icon: 'Sparkles', title: 'Spotlessly Clean', description: 'Rooms deep-cleaned daily with fresh linen and towels.' },
  { icon: 'HeartHandshake', title: 'Warm Hospitality', description: 'A family-run team that treats every guest like family.' },
];

export const facilities = [
  {
    id: 'dining',
    icon: 'UtensilsCrossed',
    title: 'Dining & Breakfast',
    image: unsplash('1533089860892-a7c6f0a88666', 1400),
    description:
      'Start your day with a generous complimentary breakfast – crispy parathas, omelettes, fresh fruit, cereals, toast and endless cups of chai or coffee. Our kitchen also serves home-style lunch and dinner on request.',
    features: ['Breakfast 7:00 – 10:30 AM', 'Desi & continental menu', 'Room service available', 'Special dietary requests'],
  },
  {
    id: 'lounge',
    icon: 'Sofa',
    title: 'Guest Lounge',
    image: unsplash('1586023492125-27b2c045efd7', 1400),
    description:
      'Our cozy lounge is the heart of the house. Curl up with a book from our library, catch a cricket match on the big screen, or meet fellow travellers over a board game.',
    features: ['Smart TV & streaming', 'Book & board game library', 'Free tea & coffee corner', 'Quiet work area'],
  },
  {
    id: 'garden',
    icon: 'Trees',
    title: 'Garden & Rooftop',
    image: unsplash('1585412727339-54e4bae3bbf9', 1400),
    description:
      'Unwind in our green courtyard garden or head up to the rooftop terrace for stunning sunset views over the city. Perfect for evening chai, family gatherings and small celebrations.',
    features: ['Landscaped courtyard', 'Rooftop seating', 'Evening BBQ on request', 'Kids play corner'],
  },
  {
    id: 'parking',
    icon: 'Car',
    title: 'Parking & Transport',
    image: unsplash('1590674899484-d5640e854abe', 1400),
    description:
      'Free gated parking with 24/7 CCTV keeps your car safe. Need a ride? We arrange airport pickups, city tours and reliable car rentals at fair prices.',
    features: ['Free secure parking', 'Airport pick & drop', 'City tour arrangements', 'Car rental desk'],
  },
  {
    id: 'services',
    icon: 'ConciergeBell',
    title: 'Guest Services',
    image: unsplash('1566073771259-6a8506099945', 1400),
    description:
      'From same-day laundry to travel tips and ticket bookings, our front desk is open around the clock to make your stay effortless.',
    features: ['24/7 front desk', 'Laundry & ironing', 'Luggage storage', 'Travel desk & tickets'],
  },
];
