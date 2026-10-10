import { MessageCircle, Phone } from 'lucide-react';
import PageBanner from '../components/common/PageBanner';
import Accordion from '../components/common/Accordion';
import Button from '../components/common/Button';
import Reveal from '../components/common/Reveal';
import usePageMeta from '../hooks/usePageMeta';
import { faqs } from '../data/faqs';
import { siteInfo, whatsappLink } from '../data/site';
import { unsplash } from '../utils/format';

export default function FAQ() {
  usePageMeta('FAQ', 'Answers to common questions about check-in times, cancellation, payment, parking, pets and ID requirements at StayInn Guesthouse.');
  return (
    <>
      <PageBanner title="Frequently Asked Questions" subtitle="Everything you need to know before your stay." image={unsplash('1504754524776-8f4f37790ca0', 1920)} />
      <section className="section">
        <div className="container-x max-w-4xl space-y-12">
          {faqs.map((group) => (
            <Reveal key={group.category}>
              <h2 className="mb-5 text-2xl font-semibold md:text-3xl">{group.category}</h2>
              <Accordion items={group.items} />
            </Reveal>
          ))}

          <Reveal className="rounded-3xl bg-charcoal p-8 text-center text-white md:p-12">
            <h2 className="text-2xl font-semibold md:text-3xl">Still have questions?</h2>
            <p className="mt-3 text-white/80">Our team is happy to help – reach out any time.</p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp us
              </Button>
              <Button href={siteInfo.phoneHref} variant="outlineLight">
                <Phone className="h-4 w-4" aria-hidden="true" /> {siteInfo.phone}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
