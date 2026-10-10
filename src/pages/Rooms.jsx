import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { SearchX } from 'lucide-react';
import PageBanner from '../components/common/PageBanner';
import RoomCard from '../components/rooms/RoomCard';
import RoomFilters from '../components/rooms/RoomFilters';
import Button from '../components/common/Button';
import CTASection from '../components/common/CTASection';
import usePageMeta from '../hooks/usePageMeta';
import { rooms } from '../data/rooms';
import { unsplash } from '../utils/format';

const prices = rooms.map((r) => r.price);
const MIN_PRICE = Math.floor(Math.min(...prices) / 500) * 500;
const MAX_PRICE = Math.ceil(Math.max(...prices) / 500) * 500;

export default function Rooms() {
  usePageMeta('Rooms & Suites', 'Browse single, double, deluxe, family suite and dormitory rooms at StayInn Guesthouse. Filter by type, price and guests.');
  const [params, setParams] = useSearchParams();

  const filters = {
    type: params.get('type') || '',
    maxPrice: Number(params.get('maxPrice')) || MAX_PRICE,
    guests: Number(params.get('guests')) || 1,
  };

  const updateFilters = (patch) => {
    const next = { ...filters, ...patch };
    const p = new URLSearchParams();
    if (next.type) p.set('type', next.type);
    if (next.maxPrice < MAX_PRICE) p.set('maxPrice', next.maxPrice);
    if (next.guests > 1) p.set('guests', next.guests);
    setParams(p, { replace: true });
  };

  const results = useMemo(
    () =>
      rooms.filter(
        (r) => (!filters.type || r.type === filters.type) && r.price <= filters.maxPrice && r.maxGuests >= filters.guests
      ),
    [filters.type, filters.maxPrice, filters.guests]
  );

  return (
    <>
      <PageBanner
        title="Rooms & Suites"
        subtitle="Thoughtfully designed rooms with everything you need for a restful stay – breakfast always included."
        image={unsplash('1611892440504-42a792e24d32', 1920)}
      />
      <section className="section">
        <div className="container-x grid gap-8 lg:grid-cols-[300px_1fr]">
          <div>
            <RoomFilters
              filters={filters}
              onChange={updateFilters}
              onReset={() => setParams({}, { replace: true })}
              minPrice={MIN_PRICE}
              maxPrice={MAX_PRICE}
              resultCount={results.length}
            />
          </div>
          <div>
            <p className="mb-6 text-sm text-gray-600" aria-live="polite">
              Showing <strong className="text-charcoal">{results.length}</strong> of {rooms.length} rooms
            </p>
            {results.length > 0 ? (
              <motion.div layout className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {results.map((room) => (
                    <motion.div
                      key={room.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <RoomCard room={room} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="card flex flex-col items-center px-6 py-16 text-center">
                <SearchX className="h-14 w-14 text-primary-200" aria-hidden="true" />
                <h2 className="mt-4 text-2xl font-semibold">No rooms match your filters</h2>
                <p className="mt-2 text-gray-600">Try a different room type, a higher price or fewer guests.</p>
                <Button className="mt-6" onClick={() => setParams({}, { replace: true })}>Reset filters</Button>
              </div>
            )}
          </div>
        </div>
      </section>
      <CTASection title="Need help choosing a room?" subtitle="Call or WhatsApp our friendly team – we’ll help you find the perfect room for your trip." />
    </>
  );
}
