import { CalendarClock, CheckCircle2, ArrowRight, Info } from 'lucide-react';
import PageBanner from '../components/common/PageBanner';
import Button from '../components/common/Button';
import LazyImage from '../components/common/LazyImage';
import Reveal from '../components/common/Reveal';
import SectionTitle from '../components/common/SectionTitle';
import CTASection from '../components/common/CTASection';
import usePageMeta from '../hooks/usePageMeta';
import { offers } from '../data/offers';
import { unsplash } from '../utils/format';

const formatValid = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export default function Offers() {
  usePageMeta('Special Offers', 'Save on your stay with StayInn Guesthouse deals: long-stay discounts, weekend getaways, family and honeymoon packages.');
  return (
    <>
      <PageBanner title="Special Offers" subtitle="Exclusive deals when you book directly with us – more comfort, less cost." image={unsplash('1590490360182-c33d57733427', 1920)} />

      <section className="section">
        <div className="container-x">
          <SectionTitle eyebrow="Deals & packages" title="Make your stay even sweeter" subtitle="Choose a package and the discount is applied automatically at booking." />
          <div className="grid gap-8 md:grid-cols-2">
            {offers.map((offer, i) => (
              <Reveal key={offer.id} delay={(i % 2) * 0.1}>
                <article className="card group flex h-full flex-col overflow-hidden sm:flex-row">
                  <div className="relative sm:w-2/5">
                    <LazyImage src={offer.image} alt={offer.title} wrapperClassName="aspect-[16/10] h-full sm:aspect-auto" className="transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute left-4 top-4 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-primary text-white shadow-lift">
                      <span className="text-lg font-bold leading-none">{offer.discount}%</span>
                      <span className="text-[10px] uppercase">off</span>
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="mb-2 w-fit rounded-full bg-accent-light px-3 py-1 text-xs font-semibold text-accent">{offer.badge}</span>
                    <h2 className="text-2xl font-semibold">{offer.title}</h2>
                    <p className="mt-2 text-sm text-gray-600">{offer.description}</p>
                    <ul className="mt-4 space-y-2">
                      {offer.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" /> {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-6">
                      <p className="mb-4 flex items-center gap-2 text-xs font-medium text-gray-500">
                        <CalendarClock className="h-4 w-4 text-primary" aria-hidden="true" /> Valid till {formatValid(offer.validTill)} · Min {offer.minNights} nights
                      </p>
                      <Button to={`/booking?offer=${offer.id}`} className="w-full">
                        Book This Offer <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mx-auto mt-10 flex max-w-2xl items-start gap-2 rounded-xl bg-white p-4 text-sm text-gray-600 shadow-soft">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            Offers cannot be combined. The best available discount is applied automatically. Subject to availability; blackout dates may apply during public holidays.
          </p>
        </div>
      </section>
      <CTASection />
    </>
  );
}
