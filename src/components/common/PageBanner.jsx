import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export default function PageBanner({ title, subtitle, image }) {
  return (
    <section className="relative flex min-h-[340px] items-end overflow-hidden bg-charcoal pb-12 pt-32 md:min-h-[420px] md:pb-16">
      <img src={image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-charcoal/30" />
      <div className="container-x relative">
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 flex items-center gap-1 text-sm text-white/70"
        >
          <Link to="/" className="hover:text-white">Home</Link>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
          <span className="text-white" aria-current="page">{title}</span>
        </motion.nav>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-4xl font-semibold text-white md:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4 max-w-2xl text-base text-white/80 md:text-lg"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
