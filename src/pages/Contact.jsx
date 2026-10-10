import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, Clock, Send, CheckCircle2 } from 'lucide-react';
import PageBanner from '../components/common/PageBanner';
import FormField from '../components/common/FormField';
import Button from '../components/common/Button';
import Reveal from '../components/common/Reveal';
import usePageMeta from '../hooks/usePageMeta';
import { siteInfo, whatsappLink } from '../data/site';
import { unsplash } from '../utils/format';

const contactCards = [
  { icon: Phone, title: 'Call us', value: siteInfo.phone, href: siteInfo.phoneHref },
  { icon: MessageCircle, title: 'WhatsApp', value: 'Chat instantly', href: whatsappLink(), external: true },
  { icon: Mail, title: 'Email', value: siteInfo.email, href: `mailto:${siteInfo.email}` },
  { icon: MapPin, title: 'Visit us', value: siteInfo.address, href: siteInfo.mapLink, external: true },
];

export default function Contact() {
  usePageMeta('Contact Us', 'Get in touch with StayInn Guesthouse by phone, WhatsApp or email. Find our location in Gulberg III, Lahore.');
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onTouched' });

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 700));
    console.log('Contact form submitted:', data);
    setSent(true);
    reset();
  };

  return (
    <>
      <PageBanner title="Contact Us" subtitle="Questions, special requests or just saying hello – we’d love to hear from you." image={unsplash('1520250497591-112f2f40a3f4', 1920)} />

      <section className="section">
        <div className="container-x">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {contactCards.map(({ icon: CardIcon, title, value, href, external }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="card group flex h-full flex-col items-center p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lift"
                >
                  <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <CardIcon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h2 className="font-sans text-lg font-semibold">{title}</h2>
                  <p className="mt-1 text-sm text-gray-600">{value}</p>
                </a>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            <Reveal className="card p-6 md:p-8">
              <h2 className="text-2xl font-semibold md:text-3xl">Send us a message</h2>
              <p className="mt-2 text-sm text-gray-600">We usually reply within a few hours.</p>
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div key="sent" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-8 rounded-2xl bg-accent-light p-8 text-center" role="status">
                    <CheckCircle2 className="mx-auto h-14 w-14 text-accent" aria-hidden="true" />
                    <h3 className="mt-4 text-2xl font-semibold">Message sent!</h3>
                    <p className="mt-2 text-gray-600">Thank you for reaching out. Our team will get back to you shortly.</p>
                    <Button variant="outline" className="mt-6" onClick={() => setSent(false)}>Send another message</Button>
                  </motion.div>
                ) : (
                  <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 grid gap-5 sm:grid-cols-2">
                    <FormField label="Your name" htmlFor="c-name" error={errors.name?.message} required>
                      <input id="c-name" autoComplete="name" className={`input ${errors.name ? 'input-error' : ''}`} placeholder="Full name" {...register('name', { required: 'Name is required' })} />
                    </FormField>
                    <FormField label="Phone" htmlFor="c-phone" error={errors.phone?.message}>
                      <input
                        id="c-phone"
                        type="tel"
                        autoComplete="tel"
                        className={`input ${errors.phone ? 'input-error' : ''}`}
                        placeholder="+92 300 1234567"
                        {...register('phone', { pattern: { value: /^\+?[\d\s-]{10,16}$/, message: 'Enter a valid phone number' } })}
                      />
                    </FormField>
                    <FormField label="Email" htmlFor="c-email" error={errors.email?.message} required className="sm:col-span-2">
                      <input
                        id="c-email"
                        type="email"
                        autoComplete="email"
                        className={`input ${errors.email ? 'input-error' : ''}`}
                        placeholder="you@example.com"
                        {...register('email', {
                          required: 'Email is required',
                          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' },
                        })}
                      />
                    </FormField>
                    <FormField label="Message" htmlFor="c-message" error={errors.message?.message} required className="sm:col-span-2">
                      <textarea
                        id="c-message"
                        rows={5}
                        className={`input resize-none ${errors.message ? 'input-error' : ''}`}
                        placeholder="How can we help?"
                        {...register('message', { required: 'Message is required', minLength: { value: 10, message: 'Please write at least 10 characters' } })}
                      />
                    </FormField>
                    <div className="sm:col-span-2">
                      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                        {isSubmitting ? 'Sending…' : (<><Send className="h-4 w-4" aria-hidden="true" /> Send Message</>)}
                      </Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </Reveal>

            <Reveal delay={0.1} className="flex flex-col gap-6">
              <div className="card overflow-hidden">
                <iframe
                  title="StayInn Guesthouse location on Google Maps"
                  src={siteInfo.mapEmbed}
                  className="h-72 w-full border-0 lg:h-80"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <div className="card p-6">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                  <Clock className="h-5 w-5 text-primary" aria-hidden="true" /> Reception timings
                </h2>
                <dl className="divide-y divide-gray-100 text-sm">
                  {siteInfo.receptionHours.map((h) => (
                    <div key={h.day} className="flex justify-between gap-4 py-3">
                      <dt className="font-medium">{h.day}</dt>
                      <dd className="text-right text-gray-600">{h.hours}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
