import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, label, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    const baseStyles =
      'w-full px-4 py-2 text-sm bg-white border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-slate-900 dark:text-slate-100';

    const stateStyles = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
      : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:border-slate-700';

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`${baseStyles} ${stateStyles} ${className}`}
          {...props}
        />
        {error && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{error}</p>}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
