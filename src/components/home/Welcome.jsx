import { ArrowRight, Award } from 'lucide-react';
import Button from '../common/Button';
import Reveal from '../common/Reveal';
import LazyImage from '../common/LazyImage';
import { unsplash } from '../../utils/format';

export default function Welcome() {
  return (
    <section className="section">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative">
          <LazyImage
            src={unsplash('1560448204-e02f11c3d0e2', 1000)}
            alt="Sunlit sitting area inside StayInn Guesthouse"
            wrapperClassName="aspect-[4/5] w-full rounded-2xl sm:w-4/5"
          />
          <LazyImage
            src={unsplash('1533089860892-a7c6f0a88666', 700)}
            alt="Breakfast served at StayInn"
            wrapperClassName="absolute -bottom-8 right-0 hidden aspect-square w-1/2 rounded-2xl border-8 border-cream shadow-lift sm:block"
          />
          <div className="absolute left-4 top-4 flex items-center gap-3 rounded-2xl bg-white/95 p-4 shadow-lift backdrop-blur sm:-left-4 sm:top-10">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-white">
              <Award className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <p className="font-heading text-2xl font-bold">12+</p>
              <p className="text-xs text-gray-500">Years of hospitality</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">Welcome to StayInn</span>
          <h2 className="text-3xl font-semibold leading-tight md:text-4xl">A warm, family-run guesthouse that feels like home</h2>
          <p className="mt-5 leading-relaxed text-gray-600">
            Tucked away on a quiet, leafy street in Gulberg, StayInn Guesthouse has welcomed travellers from over 40 countries. We believe a
            great stay is about the little things – fresh linen, a hot breakfast, a friendly face at any hour and local tips you won’t find in a guidebook.
          </p>
          <p className="mt-4 leading-relaxed text-gray-600">
            Whether you’re here for business, a family visit or exploring the city’s rich heritage, our cozy rooms and caring team are ready to make you feel at home.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4 border-y border-primary-100 py-6">
            {[
              ['24', 'Cozy rooms'],
              ['18k+', 'Happy guests'],
              ['4.9', 'Guest rating'],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="font-heading text-2xl font-bold text-primary md:text-3xl">{value}</p>
                <p className="text-xs text-gray-500 md:text-sm">{label}</p>
              </div>
            ))}
          </div>
          <Button to="/about" variant="outline" className="mt-8">
            Learn More <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
