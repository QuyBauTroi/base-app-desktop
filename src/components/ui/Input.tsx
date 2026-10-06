import { forwardRef, InputHTMLAttributes, ReactNode, useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import { getComponentConfig, getRadiusClass, getSize } from '@/stores/useThemeStore';
import type { SizeKey } from '@/stores/useThemeStore';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input size */
  size?: InputSize;
  /** Prefix icon */
  icon?: ReactNode;
  /** Suffix icon/element */
  suffix?: ReactNode;
  /** Error message */
  error?: string;
  /** Show clear button */
  clearable?: boolean;
  /** Callback when clear button is clicked */
  onClear?: () => void;
  /** Label text */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Full width input */
  fullWidth?: boolean;
}

const sizeStyles: Record<InputSize, { input: string; icon: string; label: string }> = {
  sm: {
    input: 'py-2 text-sm',
    icon: 'w-4 h-4',
    label: 'text-xs',
  },
  md: {
    input: 'py-3 text-sm',
    icon: 'w-5 h-5',
    label: 'text-xs',
  },
  lg: {
    input: 'py-4 text-base',
    icon: 'w-5 h-5',
    label: 'text-sm',
  },
};

/**
 * Input component with icon support, error states, and password visibility toggle
 * 
 * Defaults configured via theme store (runtime configurable):
 * - borderRadius, defaultSize
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size,
      icon,
      suffix,
      error,
      clearable = false,
      onClear,
      label,
      helperText,
      fullWidth = true,
      type = 'text',
      className = '',
      disabled,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    // Get config from store (supports runtime override)
    const config = getComponentConfig('input');
    const effectiveSize: SizeKey = size ?? getSize(config.defaultSize);
    const radiusClass = getRadiusClass(config.borderRadius);

    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    const hasValue = value !== undefined && value !== '';
    const showClearButton = clearable && hasValue && !disabled;

    const styles = sizeStyles[effectiveSize];

    const baseInputStyles = `
      w-full
      ${radiusClass}
      bg-(--bg-layer-2)
      text-(--text-main)
      placeholder:text-(--text-muted)/60
      font-medium
      transition-all
      focus:outline-none
      focus:ring-2
      focus:ring-(--color-primary)/50
      focus:bg-(--bg-layer-1)
      disabled:opacity-50
      disabled:cursor-not-allowed
    `;

    const errorStyles = error ? 'ring-2 ring-(--color-error)/50 bg-(--color-error)/5' : '';

    // Calculate padding based on icons
    const paddingLeft = icon ? 'pl-11' : 'pl-4';
    const paddingRight = (isPassword || showClearButton || suffix) ? 'pr-11' : 'pr-4';

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

          {/* Input */}
          <input
            ref={ref}
            type={inputType}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`
              ${baseInputStyles}
              ${styles.input}
              ${paddingLeft}
              ${paddingRight}
              ${errorStyles}
            `.trim().replace(/\s+/g, ' ')}
            {...props}
          />

          {/* Suffix Area */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {/* Clear Button */}
            {showClearButton && (
              <button
                type="button"
                onClick={onClear}
                className={`
                  ${styles.icon}
                  text-(--text-muted)
                  hover:text-(--text-main)
                  transition-colors
                  cursor-pointer
                `}
                tabIndex={-1}
              >
                <X className="w-full h-full" />
              </button>
            )}

            {/* Password Toggle */}
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`
                  ${styles.icon}
                  text-(--text-muted)
                  hover:text-(--text-main)
                  transition-colors
                  cursor-pointer
                `}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-full h-full" />
                ) : (
                  <Eye className="w-full h-full" />
                )}
              </button>
            )}

            {/* Custom Suffix */}
            {suffix && !isPassword && (
              <span className={`${styles.icon} text-(--text-muted)`}>
                {suffix}
              </span>
            )}
          </div>
        </div>

        {/* Error or Helper Text */}
        {(error || helperText) && (
          <p className={`
            mt-1.5 ml-1 text-xs
            ${error ? 'text-error' : 'text-(--text-muted)'}
          `}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
