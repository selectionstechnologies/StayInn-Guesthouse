import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';
import { Quote, Heart, Leaf, ShieldCheck, Users } from 'lucide-react';
import PageBanner from '../components/common/PageBanner';
import SectionTitle from '../components/common/SectionTitle';
import LazyImage from '../components/common/LazyImage';
import Reveal from '../components/common/Reveal';
import CTASection from '../components/common/CTASection';
import usePageMeta from '../hooks/usePageMeta';
import { stats } from '../data/site';
import { unsplash } from '../utils/format';

const values = [
  { icon: Heart, title: 'Heartfelt hospitality', text: 'We welcome every guest like family – with a smile, a cup of chai and genuine care.' },
  { icon: ShieldCheck, title: 'Safety & trust', text: '24/7 security, verified staff and transparent pricing with no hidden charges.' },
  { icon: Leaf, title: 'Mindful living', text: 'Solar water heating, refillable toiletries and a garden that grows our breakfast herbs.' },
  { icon: Users, title: 'Community first', text: 'We work with local bakers, artisans and guides to support our neighbourhood.' },
];

const propertyPhotos = [
  { src: unsplash('1564501049412-61c2a3083791', 900), alt: 'Guesthouse entrance' },
  { src: unsplash('1585412727339-54e4bae3bbf9', 900), alt: 'Courtyard garden' },
  { src: unsplash('1586023492125-27b2c045efd7', 900), alt: 'Guest lounge' },
  { src: unsplash('1504754524776-8f4f37790ca0', 900), alt: 'Breakfast table' },
];

function Counter({ value, decimals = 0, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    const controls = animate(0, value, { duration: 2, ease: 'easeOut', onUpdate: setDisplay });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

export default function About() {
  usePageMeta('About Us', 'The story of StayInn Guesthouse – a family-run home away from home in Lahore since 2014.');
  return (
    <>
      <PageBanner title="About Us" subtitle="A family-run guesthouse built on warmth, comfort and a love for hosting." image={unsplash('1564501049412-61c2a3083791', 1920)} />

      <section className="section bg-white">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">Our story</span>
            <h2 className="text-3xl font-semibold leading-tight md:text-4xl">From a family home to your home away from home</h2>
            <div className="mt-5 space-y-4 leading-relaxed text-gray-600">
              <p>
                StayInn began in 2014 when the Raza family opened the spare rooms of their Gulberg home to visiting friends and relatives. Word spread
                quickly about the spotless rooms, the hearty breakfasts and the family’s legendary hospitality.
              </p>
              <p>
                Today, StayInn has grown into a 24-room guesthouse – but our heart hasn’t changed. We’re still family-run, we still cook breakfast
                every morning, and we still believe that the best stays are the ones where you feel truly at home.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="grid grid-cols-2 gap-4">
            <LazyImage src={unsplash('1560448204-e02f11c3d0e2', 800)} alt="Bright sitting area" wrapperClassName="aspect-[3/4] rounded-2xl" />
            <LazyImage src={unsplash('1631049307264-da0ec9d70304', 800)} alt="Cozy guest room" wrapperClassName="mt-10 aspect-[3/4] rounded-2xl" />
          </Reveal>
        </div>
      </section>

      <section className="bg-primary py-14 text-white">
        <dl className="container-x grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <dd className="font-heading text-4xl font-bold md:text-5xl">
                <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
              </dd>
              <dt className="mt-2 text-sm text-white/85">{s.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      <section className="section">
        <div className="container-x">
          <Reveal className="card mx-auto grid max-w-5xl items-center gap-8 overflow-hidden md:grid-cols-[280px_1fr]">
            <LazyImage src={unsplash('1500648767791-00dcc994a43e', 600)} alt="Ali Raza, owner of StayInn Guesthouse" wrapperClassName="aspect-square md:aspect-auto md:h-full" />
            <div className="p-6 md:p-10 md:pl-0">
              <Quote className="h-10 w-10 text-primary-200" aria-hidden="true" />
              <h2 className="mt-3 text-2xl font-semibold md:text-3xl">A message from our owner</h2>
              <p className="mt-4 leading-relaxed text-gray-600">
                “When my parents first welcomed guests into our home, they taught me that hospitality isn’t a service – it’s a feeling. Every guest who
                walks through our door should feel cared for, rested and at peace. That promise is what StayInn is built on, and I’m proud that our
                team keeps it every single day. We look forward to welcoming you.”
              </p>
              <p className="mt-5 font-heading text-lg font-semibold">Ali Raza</p>
              <p className="text-sm text-gray-500">Owner & Host, StayInn Guesthouse</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x">
          <SectionTitle eyebrow="Our values" title="What we stand for" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: ValueIcon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.1}>
                <div className="h-full rounded-2xl bg-cream p-7 text-center">
                  <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white">
                    <ValueIcon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <h3 className="mb-2 text-xl font-semibold">{title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionTitle eyebrow="The property" title="Around the house" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {propertyPhotos.map((p, i) => (
              <Reveal key={p.src} delay={i * 0.08}>
                <LazyImage src={p.src} alt={p.alt} wrapperClassName="aspect-[3/4] rounded-2xl" className="transition-transform duration-700 hover:scale-105" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
