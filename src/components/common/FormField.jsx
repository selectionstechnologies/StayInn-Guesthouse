import { AlertCircle } from 'lucide-react';

export default function FormField({ label, htmlFor, error, required, hint, children, className = '' }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={htmlFor} className="label">
          {label} {required && <span className="text-primary" aria-hidden="true">*</span>}
        </label>
      )}
      {children}
      {error ? (
        <p className="error-text" role="alert" id={`${htmlFor}-error`}>
          <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
          {error}
        </p>
      ) : (
        hint && <p className="mt-1.5 text-xs text-gray-500">{hint}</p>
      )}
    </div>
  );
}
