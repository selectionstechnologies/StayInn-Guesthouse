import { motion } from 'framer-motion';

/** Subtle fade-up entrance animation when the element scrolls into view. */
export default function Reveal({ children, delay = 0, y = 24, className = '', as = 'div' }) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
