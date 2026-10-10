import DatePicker from 'react-datepicker';
import { CalendarDays } from 'lucide-react';
import useMediaQuery from '../../hooks/useMediaQuery';

/** Themed date picker; opens in a centered portal on small screens. */
export default function DateInput({ id, selected, onChange, minDate, placeholder = 'Select date', hasError, className = '' }) {
  const isMobile = useMediaQuery('(max-width: 639px)');
  return (
    <div className="relative">
      <CalendarDays className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-primary" aria-hidden="true" />
      <DatePicker
        id={id}
        selected={selected}
        onChange={onChange}
        minDate={minDate}
        dateFormat="dd MMM yyyy"
        placeholderText={placeholder}
        withPortal={isMobile}
        autoComplete="off"
        onFocus={(e) => isMobile && e.target.blur()}
        className={`input pl-11 ${hasError ? 'input-error' : ''} ${className}`}
      />
    </div>
  );
}
