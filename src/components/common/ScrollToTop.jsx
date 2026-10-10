import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import useScrolled from '../../hooks/useScrolled';

/** Scrolls to top (or to a #hash target) on route change, and shows a back-to-top button. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const showButton = useScrolled(700);

  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 150);
      return () => clearTimeout(timer);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-24 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-white text-charcoal shadow-lift transition-colors hover:bg-primary hover:text-white"
        >
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
