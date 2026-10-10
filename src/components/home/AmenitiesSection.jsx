import SectionTitle from '../common/SectionTitle';
import AmenityItem from '../common/AmenityItem';
import Reveal from '../common/Reveal';
import Button from '../common/Button';
import { amenities } from '../../data/amenities';

export default function AmenitiesSection({ showButton = true }) {
  return (
    <section className="section">
      <div className="container-x">
        <SectionTitle
          eyebrow="Amenities"
          title="Everything you need for a relaxing stay"
          subtitle="Thoughtful comforts included with every booking – no hidden charges."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {amenities.map((a, i) => (
            <Reveal key={a.title} delay={(i % 3) * 0.08}>
              <AmenityItem {...a} />
            </Reveal>
          ))}
        </div>
        {showButton && (
          <div className="mt-12 text-center">
            <Button to="/amenities" variant="outline">Explore Facilities</Button>
          </div>
        )}
      </div>
    </section>
  );
}
