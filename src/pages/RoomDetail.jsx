import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import { ChevronLeft, Users, Maximize, BedDouble, Star, Images } from 'lucide-react';
import NotFound from './NotFound';
import BookingSidebar from '../components/rooms/BookingSidebar';
import RoomCard from '../components/rooms/RoomCard';
import AmenityItem from '../components/common/AmenityItem';
import LazyImage from '../components/common/LazyImage';
import Reveal from '../components/common/Reveal';
import SectionTitle from '../components/common/SectionTitle';
import Icon from '../components/common/Icon';
import usePageMeta from '../hooks/usePageMeta';
import { getRoomBySlug, houseRules, roomAmenityLabels, rooms } from '../data/rooms';
import { formatPrice } from '../utils/format';

export default function RoomDetail() {
  const { slug } = useParams();
  const room = getRoomBySlug(slug);
  const [index, setIndex] = useState(-1);
  usePageMeta(room?.name || 'Room not found', room?.shortDescription);

  if (!room) return <NotFound />;

  const others = rooms
    .filter((r) => r.id !== room.id)
    .sort((a, b) => (b.type === room.type) - (a.type === room.type))
    .slice(0, 3);

  const facts = [
    { icon: Maximize, label: 'Room size', value: `${room.size} sq ft` },
    { icon: Users, label: 'Max guests', value: `${room.maxGuests} ${room.maxGuests === 1 ? 'guest' : 'guests'}` },
    { icon: BedDouble, label: 'Bed type', value: room.bedType },
  ];

  return (
    <>
      <div className="bg-white pt-24 md:pt-28">
        <div className="container-x">
          <Link to="/rooms" className="mb-5 inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-primary">
            <ChevronLeft className="h-4 w-4" aria-hidden="true" /> All rooms
          </Link>

          {/* Gallery */}
          <div className="relative grid h-[280px] grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-2xl sm:h-[380px] md:h-[460px] md:gap-3">
            {room.images.slice(0, 5).map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`View photo ${i + 1} of ${room.name}`}
                className={`group relative overflow-hidden ${i === 0 ? 'col-span-4 row-span-2 md:col-span-2' : 'hidden md:block'}`}
              >
                <LazyImage src={src} alt={`${room.name} photo ${i + 1}`} eager={i === 0} wrapperClassName="h-full w-full" className="transition-transform duration-700 group-hover:scale-105" />
              </button>
            ))}
            <button
              type="button"
              onClick={() => setIndex(0)}
              className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-lift hover:bg-cream"
            >
              <Images className="h-4 w-4" aria-hidden="true" /> View all {room.images.length} photos
            </button>
          </div>
        </div>
      </div>

      <section className="bg-white pb-16 pt-10 md:pb-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary">{room.type}</span>
              <span className="flex items-center gap-1 text-sm font-medium">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" /> {room.rating} guest rating
              </span>
            </div>
            <h1 className="mt-3 text-3xl font-semibold md:text-5xl">{room.name}</h1>
            <p className="mt-3 text-lg">
              <span className="font-bold text-primary">{formatPrice(room.price)}</span>
              <span className="text-gray-500"> / night · breakfast included</span>
            </p>

            <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {facts.map(({ icon: FactIcon, label, value }) => (
                <div key={label} className="flex items-center gap-3 rounded-2xl bg-cream p-4">
                  <FactIcon className="h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <dt className="text-xs text-gray-500">{label}</dt>
                    <dd className="font-semibold">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>

            <Reveal className="mt-10">
              <h2 className="mb-4 text-2xl font-semibold">About this room</h2>
              <div className="space-y-4 leading-relaxed text-gray-600">
                {room.description.map((p) => (
                  <p key={p.slice(0, 20)}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal className="mt-10 border-t border-gray-100 pt-10">
              <h2 className="mb-6 text-2xl font-semibold">Room amenities</h2>
              <ul className="grid gap-4 sm:grid-cols-2">
                {room.amenities.map((key) => (
                  <AmenityItem key={key} compact icon={roomAmenityLabels[key].icon} title={roomAmenityLabels[key].label} />
                ))}
              </ul>
            </Reveal>

            <Reveal className="mt-10 border-t border-gray-100 pt-10">
              <h2 className="mb-6 text-2xl font-semibold">House rules</h2>
              <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {houseRules.map((rule) => (
                  <li key={rule.title} className="rounded-2xl border border-gray-100 p-4">
                    <Icon name={rule.icon} className="mb-2 h-5 w-5 text-accent" />
                    <p className="font-semibold">{rule.title}</p>
                    <p className="text-sm text-gray-600">{rule.text}</p>
                  </li>
                ))}
              </ul>
              <Link to="/policies" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
                Read full policies →
              </Link>
            </Reveal>
          </div>

          <div>
            <BookingSidebar room={room} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionTitle eyebrow="Keep exploring" title="Other rooms you may like" />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {others.map((r, i) => (
              <Reveal key={r.id} delay={i * 0.1}>
                <RoomCard room={r} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile booking bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 border-t border-gray-100 bg-white/95 px-4 py-3 pr-24 backdrop-blur lg:hidden">
        <p>
          <span className="font-bold text-primary">{formatPrice(room.price)}</span>
          <span className="text-xs text-gray-500"> / night</span>
        </p>
        <a href="#booking-card" className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white">
          Check dates
        </a>
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Zoom]}
        slides={room.images.map((src, i) => ({ src, alt: `${room.name} photo ${i + 1}` }))}
      />
    </>
  );
}
