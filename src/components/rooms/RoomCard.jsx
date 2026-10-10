import { Link } from 'react-router-dom';
import { Users, Maximize, BedDouble, Star } from 'lucide-react';
import Button from '../common/Button';
import Icon from '../common/Icon';
import LazyImage from '../common/LazyImage';
import { roomAmenityLabels } from '../../data/rooms';
import { formatPrice } from '../../utils/format';

export default function RoomCard({ room }) {
  return (
    <article className="card group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <Link to={`/rooms/${room.slug}`} className="relative block" tabIndex={-1} aria-hidden="true">
        <LazyImage src={room.image} alt="" wrapperClassName="aspect-[4/3]" className="transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-charcoal">{room.type}</span>
        <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-charcoal/80 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {room.rating}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold">
            <Link to={`/rooms/${room.slug}`} className="hover:text-primary">{room.name}</Link>
          </h3>
          <p className="shrink-0 text-right">
            <span className="block text-lg font-bold text-primary">{formatPrice(room.price)}</span>
            <span className="text-xs text-gray-500">/ night</span>
          </p>
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-gray-600">{room.shortDescription}</p>

        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-600">
          <li className="flex items-center gap-1.5"><Users className="h-4 w-4 text-primary" aria-hidden="true" /> Up to {room.maxGuests}</li>
          <li className="flex items-center gap-1.5"><Maximize className="h-4 w-4 text-primary" aria-hidden="true" /> {room.size} sq ft</li>
          <li className="flex items-center gap-1.5"><BedDouble className="h-4 w-4 text-primary" aria-hidden="true" /> {room.bedType}</li>
        </ul>

        <ul className="mt-4 flex gap-2" aria-label="Key amenities">
          {room.amenities.slice(0, 5).map((key) => (
            <li key={key} title={roomAmenityLabels[key].label} className="flex h-9 w-9 items-center justify-center rounded-lg bg-cream text-accent">
              <Icon name={roomAmenityLabels[key].icon} className="h-4 w-4" />
              <span className="sr-only">{roomAmenityLabels[key].label}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto grid grid-cols-2 gap-3 pt-6">
          <Button to={`/rooms/${room.slug}`} variant="outline" size="sm">View Details</Button>
          <Button to={`/booking?room=${room.slug}`} size="sm">Book Now</Button>
        </div>
      </div>
    </article>
  );
}
