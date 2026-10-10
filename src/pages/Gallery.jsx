import { useMemo, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import { AnimatePresence, motion } from 'framer-motion';
import { Expand } from 'lucide-react';
import PageBanner from '../components/common/PageBanner';
import LazyImage from '../components/common/LazyImage';
import CTASection from '../components/common/CTASection';
import usePageMeta from '../hooks/usePageMeta';
import { gallery, galleryCategories } from '../data/gallery';
import { unsplash } from '../utils/format';

export default function Gallery() {
  usePageMeta('Photo Gallery', 'See photos of rooms, dining, common areas and the exterior of StayInn Guesthouse in Lahore.');
  const [category, setCategory] = useState('All');
  const [index, setIndex] = useState(-1);

  const images = useMemo(() => (category === 'All' ? gallery : gallery.filter((g) => g.category === category)), [category]);

  return (
    <>
      <PageBanner title="Gallery" subtitle="A glimpse of the comfort, warmth and charm waiting for you at StayInn." image={unsplash('1560448204-e02f11c3d0e2', 1920)} />

      <section className="section">
        <div className="container-x">
          <div className="-mx-4 mb-10 overflow-x-auto px-4 pb-2" role="tablist" aria-label="Filter gallery">
            <div className="mx-auto flex w-max gap-2 rounded-full bg-white p-1.5 shadow-soft">
              {galleryCategories.map((c) => (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={category === c}
                  onClick={() => setCategory(c)}
                  className={`relative whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-colors ${category === c ? 'text-white' : 'text-charcoal hover:text-primary'}`}
                >
                  {category === c && <motion.span layoutId="gallery-tab" className="absolute inset-0 rounded-full bg-primary" transition={{ type: 'spring', duration: 0.5 }} />}
                  <span className="relative">{c}</span>
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            <AnimatePresence mode="popLayout">
              {images.map((img, i) => (
                <motion.button
                  key={img.id}
                  type="button"
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35 }}
                  onClick={() => setIndex(i)}
                  aria-label={`Open image: ${img.alt}`}
                  className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl"
                >
                  <LazyImage src={img.src} alt={img.alt} wrapperClassName={img.aspect} className="transition-transform duration-700 group-hover:scale-110" />
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-charcoal/0 text-white opacity-0 transition-all group-hover:bg-charcoal/50 group-hover:opacity-100">
                    <Expand className="h-8 w-8" aria-hidden="true" />
                    <span className="text-sm font-medium">{img.category}</span>
                  </span>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <Lightbox open={index >= 0} index={index} close={() => setIndex(-1)} plugins={[Zoom]} slides={images.map((i) => ({ src: i.src, alt: i.alt }))} />
      <CTASection title="Like what you see?" />
    </>
  );
}
