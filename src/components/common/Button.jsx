import { Link } from 'react-router-dom';

const variants = {
  primary: 'bg-primary text-white shadow-soft hover:bg-primary-600 hover:shadow-lift',
  outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  light: 'bg-white text-charcoal shadow-soft hover:bg-cream',
  outlineLight: 'border-2 border-white/80 text-white hover:bg-white hover:text-charcoal',
  dark: 'bg-charcoal text-white hover:bg-black',
  ghost: 'text-primary hover:bg-primary-50',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export default function Button({ to, href, variant = 'primary', size = 'md', className = '', children, ...props }) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={cls} {...props}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={cls} {...props}>
      {children}
    </button>
  );
}
