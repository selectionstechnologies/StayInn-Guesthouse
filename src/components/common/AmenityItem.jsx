import Icon from './Icon';

export default function AmenityItem({ icon, title, description, compact = false }) {
  if (compact) {
    return (
      <li className="flex items-center gap-3 text-sm text-gray-700">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary">
          <Icon name={icon} className="h-5 w-5" />
        </span>
        {title}
      </li>
    );
  }
  return (
    <div className="card group h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
        <Icon name={icon} className="h-7 w-7" />
      </span>
      <h3 className="mb-1.5 font-sans text-lg font-semibold">{title}</h3>
      {description && <p className="text-sm leading-relaxed text-gray-600">{description}</p>}
    </div>
  );
}
