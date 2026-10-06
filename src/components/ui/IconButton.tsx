import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { getComponentConfig, getRadiusClass, getSize } from '@/stores/useThemeStore';
import type { SizeKey } from '@/stores/useThemeStore';

export type IconButtonVariant = 'default' | 'primary' | 'ghost' | 'danger';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Icon to display */
  icon: ReactNode;
  /** Button variant */
  variant?: IconButtonVariant;
  /** Button size */
  size?: IconButtonSize;
  /** Accessible label */
  'aria-label': string;
}

const variantStyles: Record<IconButtonVariant, string> = {
  default: `
    bg-(--bg-layer-2)
    text-(--text-main)
    hover:bg-(--bg-layer-1)
  `,
  primary: `
    bg-(--color-primary)
    text-white
    hover:bg-(--color-primary-light)
    shadow-md shadow-(--color-primary)/20
  `,
  ghost: `
    bg-transparent
    text-(--text-muted)
    hover:bg-(--bg-layer-2)
    hover:text-(--text-main)
  `,
  danger: `
    bg-(--color-error)/10
    text-(--color-error)
    hover:bg-(--color-error)/20
  `,
};

const sizeStyles: Record<IconButtonSize, { button: string; icon: string }> = {
  sm: { button: 'w-8 h-8', icon: 'w-4 h-4' },
  md: { button: 'w-10 h-10', icon: 'w-5 h-5' },
  lg: { button: 'w-12 h-12', icon: 'w-6 h-6' },
};

/**
 * Icon-only button component with accessible label
 * 
 * Defaults configured via theme store (runtime configurable):
 * - borderRadius, defaultSize
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      variant = 'default',
      size,
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    // Get config from store (supports runtime override)
    const config = getComponentConfig('iconButton');
    const effectiveSize: SizeKey = size ?? getSize(config.defaultSize);
    const radiusClass = getRadiusClass(config.borderRadius);

    const styles = sizeStyles[effectiveSize];

    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        whileTap={{ scale: disabled ? 1 : 0.92 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className={`
          ${styles.button}
          inline-flex items-center justify-center
          ${radiusClass}
          transition-all
          cursor-pointer
          focus-ring
          ${variantStyles[variant]}
          ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
          ${className}
        `.trim().replace(/\s+/g, ' ')}
        disabled={disabled}
        {...(props as HTMLMotionProps<'button'>)}
      >
        <span className={`${styles.icon} flex items-center justify-center [&_svg]:size-full`}>
          {icon}
        </span>
      </motion.button>
    );
  }
);

IconButton.displayName = 'IconButton';
