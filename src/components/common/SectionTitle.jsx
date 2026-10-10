import Reveal from './Reveal';

export default function SectionTitle({ eyebrow, title, subtitle, align = 'center', light = false, className = '' }) {
  const alignCls = align === 'center' ? 'mx-auto text-center' : 'text-left';
  return (
    <Reveal className={`mb-10 max-w-2xl md:mb-14 ${alignCls} ${className}`}>
      {eyebrow && (
        <span className={`mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] ${light ? 'text-primary-200' : 'text-primary'}`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`text-3xl font-semibold leading-tight md:text-4xl ${light ? 'text-white' : 'text-charcoal'}`}>{title}</h2>
      {subtitle && <p className={`mt-4 text-base leading-relaxed ${light ? 'text-white/80' : 'text-gray-600'}`}>{subtitle}</p>}
    </Reveal>
  );
}
