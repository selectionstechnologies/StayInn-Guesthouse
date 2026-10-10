import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Send, CheckCircle2 } from 'lucide-react';
import Logo from './Logo';
import Icon from '../common/Icon';
import { footerLinks, siteInfo } from '../../data/site';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-charcoal text-white/75">
      <div className="container-x grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo light />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            A family-run guesthouse in the heart of Lahore offering cozy rooms, warm hospitality and a true home away from home since 2014.
          </p>
          <ul className="mt-6 flex gap-2">
            {siteInfo.socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-primary hover:text-white"
                >
                  <Icon name={s.icon} className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <FooterLinks title="Explore" links={footerLinks.explore} className="lg:col-span-2" />
        <FooterLinks title="Support" links={footerLinks.support} className="lg:col-span-2" />

        <div className="sm:col-span-2 lg:col-span-4">
          <h3 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-white">Get in touch</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" aria-hidden="true" />
              {siteInfo.address}
            </li>
            <li>
              <a href={siteInfo.phoneHref} className="flex gap-3 hover:text-white">
                <Phone className="h-4 w-4 shrink-0 text-primary-400" aria-hidden="true" /> {siteInfo.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteInfo.email}`} className="flex gap-3 hover:text-white">
                <Mail className="h-4 w-4 shrink-0 text-primary-400" aria-hidden="true" /> {siteInfo.email}
              </a>
            </li>
          </ul>

          <h3 className="mb-3 mt-7 font-sans text-sm font-semibold uppercase tracking-wider text-white">Newsletter</h3>
          {subscribed ? (
            <p className="flex items-center gap-2 text-sm text-green-300" role="status">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Thanks! You’re on the list for exclusive deals.
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <label htmlFor="newsletter" className="sr-only">Email address</label>
              <input
                id="newsletter"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/50 focus:border-primary focus:outline-none"
              />
              <button type="submit" aria-label="Subscribe" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary-600">
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} StayInn Guesthouse. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/policies" className="hover:text-white">Policies</Link>
            <Link to="/policies#privacy" className="hover:text-white">Privacy</Link>
            <Link to="/faq" className="hover:text-white">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLinks({ title, links, className }) {
  return (
    <div className={className}>
      <h3 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-white">{title}</h3>
      <ul className="space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="transition-colors hover:text-primary-400">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
