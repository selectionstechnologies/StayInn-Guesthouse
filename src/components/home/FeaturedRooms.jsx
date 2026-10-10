import { ArrowRight } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import Reveal from '../common/Reveal';
import RoomCard from '../rooms/RoomCard';
import { rooms } from '../../data/rooms';

export default function FeaturedRooms() {
  const featured = rooms.filter((r) => r.featured).slice(0, 3);
  return (
    <section className="section bg-white">
      <div className="container-x">
        <SectionTitle
          eyebrow="Rooms & Suites"
          title="Comfortable rooms for every traveller"
          subtitle="From budget-friendly singles to spacious family suites – every room comes with free breakfast, Wi-Fi and 24/7 hot water."
        />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((room, i) => (
            <Reveal key={room.id} delay={i * 0.1}>
              <RoomCard room={room} />
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button to="/rooms" variant="outline">
            View All Rooms <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}
