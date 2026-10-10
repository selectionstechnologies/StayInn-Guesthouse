import { CheckCircle2 } from 'lucide-react';
import PageBanner from '../components/common/PageBanner';
import AmenitiesSection from '../components/home/AmenitiesSection';
import CTASection from '../components/common/CTASection';
import LazyImage from '../components/common/LazyImage';
import Reveal from '../components/common/Reveal';
import SectionTitle from '../components/common/SectionTitle';
import Icon from '../components/common/Icon';
import usePageMeta from '../hooks/usePageMeta';
import { facilities } from '../data/amenities';
import { unsplash } from '../utils/format';

export default function Amenities() {
  usePageMeta('Amenities & Facilities', 'Free breakfast, guest lounge, rooftop garden, free parking, airport pickup, laundry and 24/7 reception at StayInn Guesthouse.');
  return (
    <>
      <PageBanner
        title="Amenities & Facilities"
        subtitle="Everything you need for a comfortable, carefree stay – all under one cozy roof."
        image={unsplash('1586023492125-27b2c045efd7', 1920)}
      />

      <section className="section bg-white">
        <div className="container-x">
          <SectionTitle eyebrow="Our facilities" title="Spaces designed for comfort" subtitle="From breakfast to bedtime, we’ve thought of the little things so you don’t have to." />
          <div className="space-y-16 md:space-y-24">
            {facilities.map((f, i) => (
              <div key={f.id} id={f.id} className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
                <Reveal className={i % 2 ? 'md:order-2' : ''}>
                  <LazyImage src={f.image} alt={f.title} wrapperClassName="aspect-[4/3] rounded-2xl shadow-lift" />
                </Reveal>
                <Reveal delay={0.1}>
                  <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary">
                    <Icon name={f.icon} className="h-7 w-7" />
                  </span>
                  <h2 className="text-3xl font-semibold">{f.title}</h2>
                  <p className="mt-4 leading-relaxed text-gray-600">{f.description}</p>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {f.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" /> {feat}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AmenitiesSection showButton={false} />
      <CTASection />
    </>
  );
}
