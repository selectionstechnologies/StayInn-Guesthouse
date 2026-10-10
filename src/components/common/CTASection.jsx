import { ArrowRight, Phone } from 'lucide-react';
import Button from './Button';
import Reveal from './Reveal';
import { siteInfo } from '../../data/site';
import { unsplash } from '../../utils/format';

export default function CTASection({
  title = 'Book your stay today',
  subtitle = 'Best rates guaranteed when you book directly with us. Free breakfast, free Wi-Fi and free parking included.',
}) {
  return (
    <section className="section">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-3xl bg-charcoal px-6 py-14 text-center md:px-16 md:py-20">
          <img src={unsplash('1582719478250-c89cae4dc85b', 1600)} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/60 to-charcoal/90" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-semibold text-white md:text-5xl">{title}</h2>
            <p className="mt-4 text-white/85 md:text-lg">{subtitle}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button to="/booking" size="lg">
                Book Now <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Button>
              <Button href={siteInfo.phoneHref} variant="outlineLight" size="lg">
                <Phone className="h-5 w-5" aria-hidden="true" /> {siteInfo.phone}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
