import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { getComponentConfig, getRadiusClass, getSize, getButtonVariant } from '@/stores/useThemeStore';
import type { SizeKey, ButtonVariantKey } from '@/stores/useThemeStore';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Button variant style */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Show loading spinner */
  loading?: boolean;
  /** Icon to display */
  icon?: ReactNode;
  /** Icon position */
  iconPosition?: 'left' | 'right';
  /** Full width button */
  fullWidth?: boolean;
  /** Button content */
  children?: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-(--color-primary) text-white
    hover:bg-(--color-primary-light)
    active:bg-(--color-primary-dark)
    shadow-md hover:shadow-lg
    shadow-(--color-primary)/30 hover:shadow-(--color-primary)/40
  `,
  secondary: `
    bg-(--bg-layer-2) text-(--text-main)
    hover:bg-(--bg-layer-1)
    border border-(--divider)
  `,
  ghost: `
    bg-transparent text-(--text-main)
    hover:bg-(--bg-layer-2)
  `,
  danger: `
    bg-(--color-error) text-white
    hover:bg-red-600
    shadow-md shadow-red-500/30
  `,
  outline: `
    bg-transparent text-(--color-primary)
    border-2 border-(--color-primary)
    hover:bg-(--color-primary)/10
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2.5 text-sm gap-2',
  lg: 'px-6 py-3.5 text-base gap-2.5',
};

const iconSizeStyles: Record<ButtonSize, string> = {
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

/**
 * Button component with Telegram-style tactile feedback
 * 
 * Defaults configured via theme store (runtime configurable):
 * - borderRadius, defaultSize, defaultVariant
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      loading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      disabled,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    // Get config from store (supports runtime override)
    const config = getComponentConfig('button');
    const effectiveVariant: ButtonVariantKey = variant ?? getButtonVariant(config.defaultVariant);
    const effectiveSize: SizeKey = size ?? getSize(config.defaultSize);
    const radiusClass = getRadiusClass(config.borderRadius);

    const isDisabled = disabled || loading;

    const baseStyles = `
      inline-flex items-center justify-center
      font-semibold
      ${radiusClass}
      transition-all
      cursor-pointer
      select-none
      focus-ring
      active-press-deep
    `;

    const disabledStyles = isDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';
    const widthStyles = fullWidth ? 'w-full' : '';

    // Wrap icon with size class
    const renderIcon = (iconElement: ReactNode) => {
      if (!iconElement) return null;
      return (
        <span className={`shrink-0 ${iconSizeStyles[effectiveSize]}`}>
          {iconElement}
        </span>
      );
    };

    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        whileTap={{ scale: isDisabled ? 1 : 0.96 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className={`
          ${baseStyles}
          ${variantStyles[effectiveVariant]}
          ${sizeStyles[effectiveSize]}
          ${disabledStyles}
          ${widthStyles}
          ${className}
        `.trim().replace(/\s+/g, ' ')}
        disabled={isDisabled}
        {...(props as HTMLMotionProps<'button'>)}
      >
        {loading ? (
          <Loader2 className={`${iconSizeStyles[effectiveSize]} animate-spin`} />
        ) : (
          iconPosition === 'left' && renderIcon(icon)
        )}

        {children && <span>{children}</span>}

        {!loading && iconPosition === 'right' && renderIcon(icon)}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
