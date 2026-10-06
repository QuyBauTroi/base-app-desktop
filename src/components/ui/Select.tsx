import { forwardRef, SelectHTMLAttributes, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { getComponentConfig, getRadiusClass, getSize } from '@/stores/useThemeStore';
import type { SizeKey } from '@/stores/useThemeStore';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Select options */
  options: SelectOption[];
  /** Select size */
  size?: SelectSize;
  /** Prefix icon */
  icon?: ReactNode;
  /** Error message */
  error?: string;
  /** Label text */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Full width */
  fullWidth?: boolean;
}

const sizeStyles: Record<SelectSize, { select: string; icon: string; label: string }> = {
  sm: {
    select: 'py-2 text-sm',
    icon: 'w-4 h-4',
    label: 'text-xs',
  },
  md: {
    select: 'py-3 text-sm',
    icon: 'w-5 h-5',
    label: 'text-xs',
  },
  lg: {
    select: 'py-4 text-base',
    icon: 'w-5 h-5',
    label: 'text-sm',
  },
};

/**
 * Select dropdown component
 * 
 * Defaults configured via theme store (runtime configurable):
 * - borderRadius, defaultSize
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      size,
      icon,
      error,
      label,
      placeholder,
      fullWidth = true,
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    // Get config from store (supports runtime override)
    const config = getComponentConfig('select');
    const effectiveSize: SizeKey = size ?? getSize(config.defaultSize);
    const radiusClass = getRadiusClass(config.borderRadius);

    const styles = sizeStyles[effectiveSize];

    const baseSelectStyles = `
      w-full
      appearance-none
      ${radiusClass}
      bg-(--bg-layer-2)
      text-(--text-main)
      font-medium
      transition-all
      cursor-pointer
      focus:outline-none
      focus:ring-2
      focus:ring-(--color-primary)/50
      focus:bg-(--bg-layer-1)
      disabled:opacity-50
      disabled:cursor-not-allowed
    `;

    const errorStyles = error ? 'ring-2 ring-(--color-error)/50 bg-(--color-error)/5' : '';
    const paddingLeft = icon ? 'pl-11' : 'pl-4';

    return (
      <div className={`${fullWidth ? 'w-full' : 'inline-block'} ${className}`}>
        {label && (
          <label className={`
            block mb-1.5 ml-1
            ${styles.label}
            font-semibold uppercase tracking-wide
            text-(--text-muted)
          `}>
            {label}
          </label>
        )}

        <div className="relative">
          {/* Prefix Icon */}
          {icon && (
            <span className={`
              absolute left-3.5 top-1/2 -translate-y-1/2
              ${styles.icon}
              text-(--text-muted)
              pointer-events-none
            `}>
              {icon}
            </span>
          )}

          {/* Select */}
          <select
            ref={ref}
            disabled={disabled}
            className={`
              ${baseSelectStyles}
              ${styles.select}
              ${paddingLeft}
              pr-10
              ${errorStyles}
            `.trim().replace(/\s+/g, ' ')}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>

          {/* Dropdown Arrow */}
          <ChevronDown className={`
            absolute right-3 top-1/2 -translate-y-1/2
            ${styles.icon}
            text-(--text-muted)
            pointer-events-none
          `} />
        </div>

        {/* Error */}
        {error && (
          <p className="mt-1.5 ml-1 text-xs text-error">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
