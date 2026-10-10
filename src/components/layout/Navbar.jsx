import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Phone, CalendarCheck } from 'lucide-react';
import Logo from './Logo';
import Button from '../common/Button';
import useScrolled from '../../hooks/useScrolled';
import { navLinks, siteInfo } from '../../data/site';

// Pages that start with a dark hero/banner, where the navbar can be transparent at the top.
const HERO_ROUTES = ['/', '/rooms', '/booking', '/amenities', '/gallery', '/about', '/offers', '/contact', '/faq', '/policies'];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const scrolled = useScrolled(40);
  const transparent = !scrolled && HERO_ROUTES.includes(pathname);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const linkCls = ({ isActive }) =>
    `relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
      isActive
        ? transparent
          ? 'bg-white/15 text-white'
          : 'bg-primary-50 text-primary'
        : transparent
          ? 'text-white/90 hover:text-white'
          : 'text-charcoal hover:text-primary'
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        transparent ? 'bg-transparent py-5' : 'bg-white/95 py-3 shadow-soft backdrop-blur-md'
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">
        Skip to content
      </a>
      <nav className="container-x flex items-center justify-between gap-4" aria-label="Main navigation">
        <Logo light={transparent} />

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.to === '/'} className={linkCls}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button to="/booking" size="sm" className="hidden sm:inline-flex">
            <CalendarCheck className="h-4 w-4" aria-hidden="true" /> Book Now
          </Button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className={`rounded-full p-2.5 transition-colors lg:hidden ${transparent ? 'text-white hover:bg-white/10' : 'text-charcoal hover:bg-gray-100'}`}
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-charcoal/50 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Mobile menu"
              className="fixed inset-y-0 right-0 z-50 flex w-[85%] max-w-sm flex-col bg-cream p-6 shadow-2xl lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="mb-8 flex items-center justify-between">
                <Logo />
                <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="rounded-full p-2 hover:bg-white">
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <ul className="flex flex-col gap-1">
                {[...navLinks, { label: 'FAQ', to: '/faq' }].map((link, i) => (
                  <motion.li key={link.to} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      className={({ isActive }) =>
                        `block rounded-xl px-4 py-3 text-base font-medium transition-colors ${isActive ? 'bg-primary text-white' : 'hover:bg-white'}`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto space-y-3 pt-6">
                <Button to="/booking" className="w-full" size="lg">
                  <CalendarCheck className="h-5 w-5" aria-hidden="true" /> Book Your Stay
                </Button>
                <Button href={siteInfo.phoneHref} variant="outline" className="w-full">
                  <Phone className="h-4 w-4" aria-hidden="true" /> {siteInfo.phone}
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
