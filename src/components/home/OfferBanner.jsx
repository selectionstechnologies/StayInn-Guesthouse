import { Percent, ArrowRight } from 'lucide-react';
import Button from '../common/Button';
import Reveal from '../common/Reveal';

export default function OfferBanner() {
  return (
    <section className="py-12 md:py-16">
      <div className="container-x">
        <Reveal className="relative flex flex-col items-center gap-6 overflow-hidden rounded-3xl bg-gradient-to-r from-accent to-[#3a6447] px-6 py-10 text-center text-white md:flex-row md:px-12 md:text-left">
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10" aria-hidden="true" />
          <div className="absolute -bottom-16 left-1/3 h-40 w-40 rounded-full bg-white/5" aria-hidden="true" />
          <span className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white text-accent">
            <Percent className="h-10 w-10" aria-hidden="true" />
          </span>
          <div className="relative flex-1">
            <p className="text-sm font-semibold uppercase tracking-widest text-white/80">Limited time offer</p>
            <h2 className="mt-1 text-2xl font-semibold md:text-4xl">Stay 3 nights, get 10% off</h2>
            <p className="mt-2 text-white/85">Applied automatically at booking. Valid on all room types until 31 Dec 2026.</p>
          </div>
          <Button to="/offers" variant="light" size="lg" className="relative shrink-0">
            View Offers <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
