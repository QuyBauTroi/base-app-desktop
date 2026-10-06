import { forwardRef, HTMLAttributes, ReactNode } from 'react';

export interface SwitchProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'onChange'> {
  /** Controlled checked state */
  checked?: boolean;
  /** Callback when switched */
  onChange?: (checked: boolean) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Label text */
  label?: ReactNode;
  /** Description text */
  description?: ReactNode;
  /** Size */
  size?: 'sm' | 'md';
}

const sizeStyles = {
  sm: {
    track: 'w-9 h-5',
    thumb: 'w-4 h-4',
    translate: 'translate-x-4',
  },
  md: {
    track: 'w-11 h-6',
    thumb: 'w-5 h-5',
    translate: 'translate-x-5',
  },
};

/**
 * Toggle switch component
 * 
 * @example
 * <Switch 
 *   checked={isDarkMode}
 *   onChange={setIsDarkMode}
 *   label="Dark mode"
 * />
 */
export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked = false,
      onChange,
      disabled = false,
      label,
      description,
      size = 'md',
      className = '',
      ...props
    },
    ref
  ) => {
    const styles = sizeStyles[size];

    const handleClick = () => {
      if (!disabled && onChange) {
        onChange(!checked);
      }
    };

    const track = (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={handleClick}
        className={`
          ${styles.track}
          relative inline-flex
          rounded-full
          transition-colors
          cursor-pointer
          focus-ring
          ${checked ? 'bg-(--color-primary)' : 'bg-(--bg-layer-2)'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        {...props}
      >
        <span
          className={`
            ${styles.thumb}
            absolute top-0.5 left-0.5
            rounded-full
            bg-white
            shadow-sm
            transition-transform
            ${checked ? styles.translate : 'translate-x-0'}
          `}
        />
      </button>
    );

    if (!label) {
      return track;
    }

    return (
      <div className={`flex items-start gap-3 ${className}`}>
        {track}
        <div className="flex-1">
          <label
            className="text-sm font-medium text-(--text-main) cursor-pointer"
            onClick={handleClick}
          >
            {label}
          </label>
          {description && (
            <p className="text-xs text-(--text-muted) mt-0.5">
              {description}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Switch.displayName = 'Switch';
