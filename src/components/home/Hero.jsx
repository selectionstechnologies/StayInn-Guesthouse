import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import BookingSearchBar from './BookingSearchBar';
import { unsplash } from '../../utils/format';

const slides = [
  { src: unsplash('1566073771259-6a8506099945', 1920), alt: 'StayInn Guesthouse exterior at golden hour' },
  { src: unsplash('1590490360182-c33d57733427', 1920), alt: 'Cozy deluxe bedroom with warm lighting' },
  { src: unsplash('1586023492125-27b2c045efd7', 1920), alt: 'Welcoming guest lounge' },
];

export default function Hero() {
  return (
    <section className="relative">
      <div className="relative h-[100svh] min-h-[640px] overflow-hidden bg-charcoal">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          loop
          speed={1200}
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="hero-swiper h-full"
        >
          {slides.map((s, i) => (
            <SwiperSlide key={s.src}>
              <img src={s.src} alt={s.alt} className="h-full w-full scale-105 object-cover" loading={i === 0 ? 'eager' : 'lazy'} fetchpriority={i === 0 ? 'high' : 'auto'} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-charcoal/70 via-charcoal/40 to-charcoal/80" />

        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container-x pb-40 pt-24 md:pb-32">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm sm:text-sm">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" /> Rated 4.9/5 by 2,000+ guests
              </span>
              <h1 className="text-4xl font-semibold leading-[1.1] text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Your Cozy Stay <span className="italic text-primary-200">Awaits</span>
              </h1>
              <p className="mt-5 max-w-xl text-base text-white/85 md:text-lg">
                Warm rooms, home-cooked breakfast and heartfelt hospitality in the heart of Lahore. Your home away from home.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container-x relative z-30 -mt-36 md:-mt-28">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
          <BookingSearchBar />
        </motion.div>
      </div>
    </section>
  );
}
