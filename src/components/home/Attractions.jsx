import { MapPin, Clock } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import Reveal from '../common/Reveal';
import LazyImage from '../common/LazyImage';
import { attractions } from '../../data/attractions';

export default function Attractions() {
  return (
    <section className="section bg-white">
      <div className="container-x">
        <SectionTitle eyebrow="Explore nearby" title="Nearby attractions" subtitle="Shopping, food streets and centuries-old heritage – all just a short ride away." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {attractions.map((a, i) => (
            <Reveal key={a.id} delay={(i % 3) * 0.08}>
              <article className="group overflow-hidden rounded-2xl bg-cream transition-shadow hover:shadow-lift">
                <div className="relative">
                  <LazyImage src={a.image} alt={a.name} wrapperClassName="aspect-[16/10]" className="transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-charcoal">{a.category}</span>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold">{a.name}</h3>
                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-primary" aria-hidden="true" /> {a.distance}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-accent" aria-hidden="true" /> {a.time}
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
