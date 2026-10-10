import { CalendarX, ScrollText, Lock } from 'lucide-react';
import PageBanner from '../components/common/PageBanner';
import Reveal from '../components/common/Reveal';
import usePageMeta from '../hooks/usePageMeta';
import { unsplash } from '../utils/format';

const sections = [
  {
    id: 'cancellation',
    icon: CalendarX,
    title: 'Cancellation Policy',
    items: [
      'Free cancellation up to 48 hours before the check-in date.',
      'Cancellations made within 48 hours of check-in are charged one night’s stay.',
      'No-shows are charged the full first night; the rest of the booking is released.',
      'Early departures may be charged one additional night.',
      'Offer and package bookings follow the same policy unless stated otherwise.',
      'Refunds for advance payments are processed within 7 working days.',
    ],
  },
  {
    id: 'house-rules',
    icon: ScrollText,
    title: 'House Rules',
    items: [
      'Check-in from 2:00 PM; check-out by 12:00 PM (noon).',
      'All adult guests must present a valid CNIC or passport at check-in.',
      'Smoking is not permitted inside rooms or indoor areas – a fine of Rs 5,000 applies.',
      'Pets are not allowed, except registered service animals.',
      'Quiet hours are 10:00 PM to 7:00 AM out of respect for other guests.',
      'Visitors are welcome in the lounge until 10:00 PM; overnight visitors must be registered.',
      'Guests are responsible for any damage to the property during their stay.',
      'Illegal substances and weapons are strictly prohibited on the premises.',
    ],
  },
  {
    id: 'privacy',
    icon: Lock,
    title: 'Privacy Policy',
    items: [
      'We collect only the information needed to manage your booking: name, contact details, ID number and stay details.',
      'ID information is collected as required by local law and shared only with authorities when legally required.',
      'We never sell or rent your personal data to third parties.',
      'Your email may be used to send booking confirmations and, if you opt in, occasional offers. You can unsubscribe anytime.',
      'CCTV operates in common areas for security only; footage is retained for 30 days.',
      'To access or delete your data, email us at hello@stayinn.pk.',
    ],
  },
];

export default function Policies() {
  usePageMeta('Policies', 'StayInn Guesthouse cancellation policy, house rules and privacy policy.');
  return (
    <>
      <PageBanner title="Policies" subtitle="Clear, fair policies so you can book with confidence." image={unsplash('1631049307264-da0ec9d70304', 1920)} />
      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-[240px_1fr]">
          <nav aria-label="Policy sections" className="lg:sticky lg:top-28 lg:h-fit">
            <ul className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
              {sections.map(({ id, title, icon: SIcon }) => (
                <li key={id}>
                  <a href={`#${id}`} className="flex items-center gap-2 whitespace-nowrap rounded-xl bg-white px-4 py-3 text-sm font-medium shadow-soft transition-colors hover:bg-primary hover:text-white">
                    <SIcon className="h-4 w-4" aria-hidden="true" /> {title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-8">
            {sections.map(({ id, icon: SIcon, title, items }) => (
              <Reveal key={id} as="section" className="card p-6 md:p-10">
                <div id={id} className="mb-6 flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary">
                    <SIcon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h2 className="text-2xl font-semibold md:text-3xl">{title}</h2>
                </div>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item} className="flex gap-3 leading-relaxed text-gray-600">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
            <p className="text-sm text-gray-500">Last updated: October 2026</p>
          </div>
        </div>
      </section>
    </>
  );
}
