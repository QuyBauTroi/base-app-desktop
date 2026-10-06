import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { getComponentConfig, getRadiusClass } from '@/stores/useThemeStore';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Badge variant */
  variant?: BadgeVariant;
  /** Badge size */
  size?: BadgeSize;
  /** Show dot indicator instead of content */
  dot?: boolean;
  /** Badge content */
  children?: ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-(--bg-layer-2) text-(--text-main)',
  primary: 'bg-(--color-primary)/15 text-(--color-primary)',
  success: 'bg-(--color-success)/15 text-success',
  warning: 'bg-(--color-warning)/15 text-warning',
  error: 'bg-(--color-error)/15 text-error',
  info: 'bg-(--color-info)/15 text-info',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-1.5 py-0.5 text-xs',
  md: 'px-2 py-1 text-xs',
};

/**
 * Badge component for status indicators and labels
 * 
 * Defaults configured via theme store (runtime configurable):
 * - borderRadius
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'default',
      size = 'md',
      dot = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    // Get config from store (supports runtime override)
    const config = getComponentConfig('badge');
    const radiusClass = getRadiusClass(config.borderRadius);

    if (dot) {
      const dotColors: Record<BadgeVariant, string> = {
        default: 'bg-(--text-muted)',
        primary: 'bg-(--color-primary)',
        success: 'bg-success',
        warning: 'bg-warning',
        error: 'bg-error',
        info: 'bg-info',
      };

      return (
        <span
          ref={ref}
          className={`
            inline-block
            w-2 h-2
            rounded-full
            ${dotColors[variant]}
            ${className}
          `.trim().replace(/\s+/g, ' ')}
          {...props}
        />
      );
    }

    return (
      <span
        ref={ref}
        className={`
          inline-flex items-center
          font-semibold
          ${radiusClass}
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `.trim().replace(/\s+/g, ' ')}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
