import SectionTitle from '../common/SectionTitle';
import Reveal from '../common/Reveal';
import Icon from '../common/Icon';
import { whyChooseUs } from '../../data/amenities';
import { unsplash } from '../../utils/format';

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-16 md:py-24">
      <img src={unsplash('1585412727339-54e4bae3bbf9', 1600)} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-15" />
      <div className="container-x relative">
        <SectionTitle light eyebrow="Why choose us" title="The StayInn difference" subtitle="Here’s why thousands of guests return to us year after year." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm transition-colors hover:bg-white/10">
                <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white">
                  <Icon name={item.icon} className="h-7 w-7" />
                </span>
                <h3 className="mb-2 text-xl font-semibold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-white/70">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
