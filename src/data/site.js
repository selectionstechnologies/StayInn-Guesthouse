export const siteInfo = {
  name: 'StayInn Guesthouse',
  tagline: 'Your home away from home',
  phone: '+92 300 1234567',
  phoneHref: 'tel:+923001234567',
  whatsapp: '923001234567',
  email: 'hello@stayinn.pk',
  address: '45 Garden Road, Gulberg III, Lahore, Pakistan',
  mapEmbed: 'https://www.google.com/maps?q=Gulberg+III,+Lahore,+Pakistan&output=embed',
  mapLink: 'https://maps.google.com/?q=Gulberg+III,+Lahore,+Pakistan',
  receptionHours: [
    { day: 'Front Desk', hours: 'Open 24 hours, 7 days a week' },
    { day: 'Phone & WhatsApp', hours: '8:00 AM – 11:00 PM' },
    { day: 'Breakfast', hours: '7:00 AM – 10:30 AM' },
    { day: 'Check-in / Check-out', hours: '2:00 PM / 12:00 PM' },
  ],
  socials: [
    { name: 'Facebook', icon: 'Facebook', href: 'https://facebook.com' },
    { name: 'Instagram', icon: 'Instagram', href: 'https://instagram.com' },
    { name: 'Twitter', icon: 'Twitter', href: 'https://twitter.com' },
    { name: 'YouTube', icon: 'Youtube', href: 'https://youtube.com' },
  ],
};

export const whatsappLink = (text = 'Hi StayInn! I would like to ask about a room booking.') =>
  `https://wa.me/${siteInfo.whatsapp}?text=${encodeURIComponent(text)}`;

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Rooms', to: '/rooms' },
  { label: 'Amenities', to: '/amenities' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Offers', to: '/offers' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export const footerLinks = {
  explore: [
    { label: 'Our Rooms', to: '/rooms' },
    { label: 'Amenities', to: '/amenities' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Special Offers', to: '/offers' },
    { label: 'About Us', to: '/about' },
  ],
  support: [
    { label: 'Book a Stay', to: '/booking' },
    { label: 'Contact Us', to: '/contact' },
    { label: 'FAQ', to: '/faq' },
    { label: 'Cancellation Policy', to: '/policies#cancellation' },
    { label: 'Privacy Policy', to: '/policies#privacy' },
  ],
};

export const stats = [
  { value: 12, suffix: '+', label: 'Years of hospitality' },
  { value: 18500, suffix: '+', label: 'Happy guests' },
  { value: 24, suffix: '', label: 'Cozy rooms' },
  { value: 4.9, suffix: '/5', label: 'Average rating', decimals: 1 },
];
