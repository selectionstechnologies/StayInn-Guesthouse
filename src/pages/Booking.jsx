import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ArrowLeft, ArrowRight, CalendarDays, Users, BedDouble, Tag, X, CheckCircle2, Printer, Home as HomeIcon } from 'lucide-react';
import PageBanner from '../components/common/PageBanner';
import FormField from '../components/common/FormField';
import DateInput from '../components/common/DateInput';
import Button from '../components/common/Button';
import LazyImage from '../components/common/LazyImage';
import usePageMeta from '../hooks/usePageMeta';
import { useBooking } from '../hooks/useBooking';
import { getRoomBySlug, rooms } from '../data/rooms';
import { getOfferById } from '../data/offers';
import { addDays, calcPrice, formatDate, formatPrice, nightsBetween, unsplash } from '../utils/format';

const STEPS = [
  { id: 1, label: 'Stay details', fields: ['room', 'checkIn', 'checkOut', 'guests'] },
  { id: 2, label: 'Guest details', fields: ['fullName', 'phone', 'email', 'idNumber', 'arrivalTime'] },
  { id: 3, label: 'Review & confirm', fields: ['agree'] },
];

const ARRIVAL_TIMES = ['Before 12:00 PM', '12:00 – 2:00 PM', '2:00 – 4:00 PM', '4:00 – 6:00 PM', '6:00 – 9:00 PM', 'After 9:00 PM', 'Not sure yet'];

export default function Booking() {
  usePageMeta('Book Your Stay', 'Book your room at StayInn Guesthouse in three easy steps. Best rates guaranteed when you book direct.');
  const [params] = useSearchParams();
  const { search, setSearch } = useBooking();
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(null);
  const [offer, setOffer] = useState(() => getOfferById(params.get('offer')));

  const initialRoom =
    getRoomBySlug(params.get('room'))?.slug ||
    rooms.find((r) => r.type === search.roomType && r.maxGuests >= (search.guests || 1))?.slug ||
    '';

  const {
    register,
    control,
    handleSubmit,
    trigger,
    watch,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      room: initialRoom,
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      guests: search.guests || 1,
      fullName: '',
      phone: '',
      email: '',
      idNumber: '',
      arrivalTime: '',
      specialRequests: '',
      agree: false,
    },
  });

  const [roomSlug, checkIn, checkOut, guests] = watch(['room', 'checkIn', 'checkOut', 'guests']);
  const room = getRoomBySlug(roomSlug);
  const nights = nightsBetween(checkIn, checkOut);
  const price = room ? calcPrice(room.price, nights, offer) : null;

  // Keep the shared search in sync so other pages stay prefilled.
  useEffect(() => {
    setSearch({ checkIn, checkOut, guests: Number(guests) });
  }, [checkIn, checkOut, guests, setSearch]);

  const goNext = async () => {
    const valid = await trigger(STEPS[step - 1].fields);
    if (valid) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 260, behavior: 'smooth' });
    }
  };

  const goBack = () => setStep((s) => s - 1);

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 800));
    const booking = {
      reference: `SI-${Date.now().toString().slice(-6)}`,
      ...data,
      roomName: room.name,
      offer: offer?.title || null,
      ...price,
    };
    console.log('Booking submitted:', booking);
    setConfirmed(booking);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = (e) => {
    if (step < 3) {
      e.preventDefault();
      goNext();
    } else {
      handleSubmit(onSubmit)(e);
    }
  };

  if (confirmed) return <BookingSuccess booking={confirmed} />;

  return (
    <>
      <PageBanner title="Book Your Stay" subtitle="Three quick steps to your cozy stay. No payment needed now – pay at the property." image={unsplash('1582719478250-c89cae4dc85b', 1920)} />

      <section className="section">
        <div className="container-x">
          <ProgressSteps step={step} />

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
            <form onSubmit={handleFormSubmit} noValidate className="card p-6 md:p-8">
              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                  {step === 1 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-semibold">Choose your dates & room</h2>

                      {offer && (
                        <div className="flex items-start justify-between gap-3 rounded-xl border border-accent/30 bg-accent-light p-4 text-sm">
                          <p className="flex items-start gap-2 text-accent">
                            <Tag className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                            <span>
                              <strong>{offer.title}</strong> applied – {offer.discount}% off stays of {offer.minNights}+ nights.
                            </span>
                          </p>
                          <button type="button" onClick={() => setOffer(null)} aria-label="Remove offer" className="text-accent hover:text-charcoal">
                            <X className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </div>
                      )}

                      <div className="grid gap-5 sm:grid-cols-2">
                        <FormField label="Check-in date" htmlFor="checkIn" error={errors.checkIn?.message} required>
                          <Controller
                            control={control}
                            name="checkIn"
                            rules={{ required: 'Please select a check-in date' }}
                            render={({ field }) => (
                              <DateInput
                                id="checkIn"
                                selected={field.value}
                                onChange={(date) => {
                                  field.onChange(date);
                                  const out = getValues('checkOut');
                                  if (date && (!out || out <= date)) {
                                    setValue('checkOut', addDays(date, 1), { shouldValidate: true });
                                  }
                                }}
                                minDate={new Date()}
                                hasError={!!errors.checkIn}
                              />
                            )}
                          />
                        </FormField>
                        <FormField label="Check-out date" htmlFor="checkOut" error={errors.checkOut?.message} required>
                          <Controller
                            control={control}
                            name="checkOut"
                            rules={{
                              required: 'Please select a check-out date',
                              validate: (v) => !getValues('checkIn') || v > getValues('checkIn') || 'Check-out must be after check-in',
                            }}
                            render={({ field }) => (
                              <DateInput
                                id="checkOut"
                                selected={field.value}
                                onChange={field.onChange}
                                minDate={checkIn ? addDays(checkIn, 1) : addDays(new Date(), 1)}
                                hasError={!!errors.checkOut}
                              />
                            )}
                          />
                        </FormField>
                      </div>

                      <FormField label="Room" htmlFor="room" error={errors.room?.message} required>
                        <select id="room" className={`input ${errors.room ? 'input-error' : ''}`} {...register('room', { required: 'Please choose a room' })}>
                          <option value="">Select a room</option>
                          {rooms.map((r) => (
                            <option key={r.slug} value={r.slug}>
                              {r.name} – {formatPrice(r.price)}/night (up to {r.maxGuests})
                            </option>
                          ))}
                        </select>
                      </FormField>

                      <FormField label="Number of guests" htmlFor="guests" error={errors.guests?.message} required>
                        <select
                          id="guests"
                          className={`input ${errors.guests ? 'input-error' : ''}`}
                          {...register('guests', {
                            valueAsNumber: true,
                            validate: (v) => {
                              const r = getRoomBySlug(getValues('room'));
                              return !r || v <= r.maxGuests || `${r.name} fits up to ${r.maxGuests} ${r.maxGuests === 1 ? 'guest' : 'guests'}`;
                            },
                          })}
                        >
                          {[1, 2, 3, 4, 5, 6].map((n) => (
                            <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                          ))}
                        </select>
                      </FormField>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-5">
                      <h2 className="text-2xl font-semibold">Your details</h2>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <FormField label="Full name" htmlFor="fullName" error={errors.fullName?.message} required className="sm:col-span-2">
                          <input
                            id="fullName"
                            autoComplete="name"
                            className={`input ${errors.fullName ? 'input-error' : ''}`}
                            placeholder="e.g. Ali Raza"
                            {...register('fullName', {
                              required: 'Full name is required',
                              minLength: { value: 3, message: 'Please enter your full name' },
                            })}
                          />
                        </FormField>
                        <FormField label="Phone number" htmlFor="phone" error={errors.phone?.message} required>
                          <input
                            id="phone"
                            type="tel"
                            autoComplete="tel"
                            className={`input ${errors.phone ? 'input-error' : ''}`}
                            placeholder="+92 300 1234567"
                            {...register('phone', {
                              required: 'Phone number is required',
                              pattern: { value: /^\+?[\d\s-]{10,16}$/, message: 'Enter a valid phone number' },
                            })}
                          />
                        </FormField>
                        <FormField label="Email address" htmlFor="email" error={errors.email?.message} required>
                          <input
                            id="email"
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
                        <FormField label="CNIC / Passport number" htmlFor="idNumber" error={errors.idNumber?.message} required hint="Required by law for all guests at check-in">
                          <input
                            id="idNumber"
                            className={`input ${errors.idNumber ? 'input-error' : ''}`}
                            placeholder="35202-1234567-1 or AB1234567"
                            {...register('idNumber', {
                              required: 'CNIC or passport number is required',
                              pattern: {
                                value: /^(\d{5}-?\d{7}-?\d|[A-Za-z0-9]{6,12})$/,
                                message: 'Enter a valid CNIC (12345-1234567-1) or passport number',
                              },
                            })}
                          />
                        </FormField>
                        <FormField label="Estimated arrival time" htmlFor="arrivalTime" error={errors.arrivalTime?.message} required>
                          <select id="arrivalTime" className={`input ${errors.arrivalTime ? 'input-error' : ''}`} {...register('arrivalTime', { required: 'Please select an arrival time' })}>
                            <option value="">Select time</option>
                            {ARRIVAL_TIMES.map((t) => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </FormField>
                        <FormField label="Special requests (optional)" htmlFor="specialRequests" className="sm:col-span-2">
                          <textarea
                            id="specialRequests"
                            rows={4}
                            className="input resize-none"
                            placeholder="Airport pickup, extra bed, early check-in, dietary needs…"
                            {...register('specialRequests', { maxLength: { value: 500, message: 'Max 500 characters' } })}
                          />
                        </FormField>
                      </div>
                    </div>
                  )}

                  {step === 3 && room && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-semibold">Review your booking</h2>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <ReviewBlock title="Stay" onEdit={() => setStep(1)}>
                          <p className="font-semibold">{room.name}</p>
                          <p>{formatDate(checkIn)} → {formatDate(checkOut)}</p>
                          <p>{nights} {nights === 1 ? 'night' : 'nights'} · {guests} {Number(guests) === 1 ? 'guest' : 'guests'}</p>
                        </ReviewBlock>
                        <ReviewBlock title="Guest" onEdit={() => setStep(2)}>
                          <p className="font-semibold">{getValues('fullName')}</p>
                          <p>{getValues('phone')}</p>
                          <p className="break-all">{getValues('email')}</p>
                          <p>ID: {getValues('idNumber')}</p>
                          <p>Arrival: {getValues('arrivalTime')}</p>
                        </ReviewBlock>
                      </div>
                      {getValues('specialRequests') && (
                        <div className="rounded-xl bg-cream p-4 text-sm">
                          <p className="mb-1 font-semibold">Special requests</p>
                          <p className="text-gray-600">{getValues('specialRequests')}</p>
                        </div>
                      )}
                      <FormField htmlFor="agree" error={errors.agree?.message}>
                        <label htmlFor="agree" className="flex cursor-pointer items-start gap-3 text-sm text-gray-600">
                          <input id="agree" type="checkbox" className="mt-0.5 h-4 w-4 accent-primary" {...register('agree', { required: 'Please accept the policies to continue' })} />
                          <span>
                            I agree to the{' '}
                            <a href="/policies" target="_blank" rel="noreferrer" className="font-medium text-primary underline">
                              house rules and cancellation policy
                            </a>
                            .
                          </span>
                        </label>
                      </FormField>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex items-center justify-between gap-3 border-t border-gray-100 pt-6">
                {step > 1 ? (
                  <Button variant="ghost" onClick={goBack}>
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
                  </Button>
                ) : (
                  <span />
                )}
                <Button type="submit" disabled={isSubmitting}>
                  {step < 3 ? (
                    <>
                      Continue <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </>
                  ) : isSubmitting ? (
                    'Confirming…'
                  ) : (
                    <>
                      <Check className="h-4 w-4" aria-hidden="true" /> Confirm Booking
                    </>
                  )}
                </Button>
              </div>
            </form>

            <SummaryCard room={room} checkIn={checkIn} checkOut={checkOut} guests={guests} price={price} />
          </div>
        </div>
      </section>
    </>
  );
}

function ProgressSteps({ step }) {
  return (
    <ol className="mx-auto flex max-w-2xl items-center" aria-label="Booking progress">
      {STEPS.map((s, i) => {
        const done = step > s.id;
        const active = step === s.id;
        return (
          <li key={s.id} className={`flex items-center ${i < STEPS.length - 1 ? 'flex-1' : ''}`} aria-current={active ? 'step' : undefined}>
            <div className="flex flex-col items-center gap-2">
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-full border-2 font-semibold transition-all duration-300 ${
                  done ? 'border-accent bg-accent text-white' : active ? 'border-primary bg-primary text-white shadow-lift' : 'border-gray-300 bg-white text-gray-400'
                }`}
              >
                {done ? <Check className="h-5 w-5" aria-hidden="true" /> : s.id}
              </span>
              <span className={`whitespace-nowrap text-xs font-medium sm:text-sm ${active ? 'text-primary' : done ? 'text-accent' : 'text-gray-500'}`}>{s.label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="mx-2 mb-7 h-1 flex-1 overflow-hidden rounded-full bg-gray-200">
                <div className={`h-full bg-accent transition-all duration-500 ${done ? 'w-full' : 'w-0'}`} />
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

function ReviewBlock({ title, onEdit, children }) {
  return (
    <div className="rounded-xl border border-gray-100 p-4 text-sm text-gray-600">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{title}</p>
        <button type="button" onClick={onEdit} className="text-xs font-semibold text-primary hover:underline">Edit</button>
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function SummaryCard({ room, checkIn, checkOut, guests, price }) {
  return (
    <aside className="card h-fit overflow-hidden lg:sticky lg:top-28" aria-label="Booking summary">
      {room ? (
        <LazyImage src={room.image} alt={room.name} wrapperClassName="aspect-[16/9]" />
      ) : (
        <div className="flex aspect-[16/9] items-center justify-center bg-primary-50">
          <BedDouble className="h-12 w-12 text-primary-200" aria-hidden="true" />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold">{room ? room.name : 'No room selected'}</h3>
        <ul className="mt-4 space-y-2 text-sm text-gray-600">
          <li className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-primary" aria-hidden="true" /> {formatDate(checkIn)} – {formatDate(checkOut)}</li>
          <li className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" aria-hidden="true" /> {guests} {Number(guests) === 1 ? 'guest' : 'guests'}</li>
        </ul>
        {room && price && price.nights > 0 ? (
          <dl className="mt-5 space-y-2 border-t border-gray-100 pt-4 text-sm">
            <div className="flex justify-between text-gray-600">
              <dt>{formatPrice(room.price)} × {price.nights} {price.nights === 1 ? 'night' : 'nights'}</dt>
              <dd>{formatPrice(price.subtotal)}</dd>
            </div>
            {price.discount > 0 && (
              <div className="flex justify-between gap-3 text-accent">
                <dt>{price.discountLabel}</dt>
                <dd className="shrink-0">−{formatPrice(price.discount)}</dd>
              </div>
            )}
            <div className="flex justify-between border-t border-gray-100 pt-3 text-lg font-bold">
              <dt>Total</dt>
              <dd className="text-primary">{formatPrice(price.total)}</dd>
            </div>
            <p className="pt-1 text-xs text-gray-500">Taxes included. Pay at the property.</p>
          </dl>
        ) : (
          <p className="mt-5 rounded-xl bg-cream p-3 text-center text-sm text-gray-600">Select a room and dates to see your total.</p>
        )}
      </div>
    </aside>
  );
}

function BookingSuccess({ booking }) {
  return (
    <section className="section bg-cream pt-32">
      <div className="container-x max-w-2xl">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card p-8 text-center md:p-12">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent-light text-accent"
          >
            <CheckCircle2 className="h-11 w-11" aria-hidden="true" />
          </motion.span>
          <h1 className="mt-6 text-3xl font-semibold md:text-4xl">Booking confirmed!</h1>
          <p className="mt-3 text-gray-600">
            Thank you, {booking.fullName.split(' ')[0]}! A confirmation has been sent to <strong>{booking.email}</strong>. We can’t wait to welcome you.
          </p>
          <p className="mt-6 inline-block rounded-full bg-primary-50 px-5 py-2 font-semibold text-primary">Reference: {booking.reference}</p>

          <dl className="mt-8 divide-y divide-gray-100 rounded-2xl bg-cream p-5 text-left text-sm">
            {[
              ['Room', booking.roomName],
              ['Check-in', `${formatDate(booking.checkIn)} · from 2:00 PM`],
              ['Check-out', `${formatDate(booking.checkOut)} · until 12:00 PM`],
              ['Guests', booking.guests],
              ['Nights', booking.nights],
              ['Arrival', booking.arrivalTime],
              ...(booking.discount > 0 ? [['Discount', `−${formatPrice(booking.discount)}`]] : []),
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-2.5">
                <dt className="text-gray-500">{k}</dt>
                <dd className="text-right font-medium">{v}</dd>
              </div>
            ))}
            <div className="flex justify-between py-3 text-lg font-bold">
              <dt>Total (pay at property)</dt>
              <dd className="text-primary">{formatPrice(booking.total)}</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button to="/">
              <HomeIcon className="h-4 w-4" aria-hidden="true" /> Back to Home
            </Button>
            <Button variant="outline" onClick={() => window.print()}>
              <Printer className="h-4 w-4" aria-hidden="true" /> Print Summary
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
