import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import { ArrowRight, Expand } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import Reveal from '../common/Reveal';
import LazyImage from '../common/LazyImage';
import { gallery } from '../../data/gallery';

export default function GalleryPreview() {
  const [index, setIndex] = useState(-1);
  const images = gallery.slice(0, 6);
  const layout = ['md:col-span-2 md:row-span-2', '', '', '', '', 'md:col-span-2'];

  return (
    <section className="section bg-white">
      <div className="container-x">
        <SectionTitle eyebrow="Gallery" title="Take a peek inside" subtitle="Cozy rooms, sunny corners and delicious breakfasts – see what awaits you." />
        <div className="grid auto-rows-[160px] grid-cols-2 gap-3 md:auto-rows-[200px] md:grid-cols-4 md:gap-4">
          {images.map((img, i) => (
            <Reveal key={img.id} delay={i * 0.05} className={layout[i]}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group relative h-full w-full overflow-hidden rounded-2xl"
                aria-label={`Open image: ${img.alt}`}
              >
                <LazyImage src={img.src} alt={img.alt} wrapperClassName="h-full w-full" className="transition-transform duration-700 group-hover:scale-110" />
                <span className="absolute inset-0 flex items-center justify-center bg-charcoal/0 transition-colors group-hover:bg-charcoal/40">
                  <Expand className="h-8 w-8 text-white opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button to="/gallery" variant="outline">
            View Full Gallery <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
      <Lightbox open={index >= 0} index={index} close={() => setIndex(-1)} slides={images.map((i) => ({ src: i.src, alt: i.alt }))} />
    </section>
  );
}
