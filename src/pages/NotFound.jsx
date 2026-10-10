import { motion } from 'framer-motion';
import { Home, BedDouble, KeyRound } from 'lucide-react';
import Button from '../components/common/Button';
import usePageMeta from '../hooks/usePageMeta';

export default function NotFound() {
  usePageMeta('Page not found', 'Sorry, the page you are looking for could not be found.');
  return (
    <section className="flex min-h-[80vh] items-center bg-cream px-4 pb-16 pt-32">
      <div className="mx-auto max-w-xl text-center">
        <motion.div
          initial={{ rotate: -20, opacity: 0 }}
          animate={{ rotate: [0, -12, 12, -6, 0], opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary-50"
        >
          <KeyRound className="h-12 w-12 text-primary" aria-hidden="true" />
        </motion.div>
        <p className="font-heading text-7xl font-bold text-primary md:text-8xl">404</p>
        <h1 className="mt-4 text-3xl font-semibold md:text-4xl">Oops! This room doesn’t exist</h1>
        <p className="mt-4 text-gray-600">
          Looks like we couldn’t find the key to this page. It may have been moved or never existed. Let’s get you back somewhere cozy.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button to="/" size="lg">
            <Home className="h-5 w-5" aria-hidden="true" /> Back to Home
          </Button>
          <Button to="/rooms" variant="outline" size="lg">
            <BedDouble className="h-5 w-5" aria-hidden="true" /> Browse Rooms
          </Button>
        </div>
      </div>
    </section>
  );
}
