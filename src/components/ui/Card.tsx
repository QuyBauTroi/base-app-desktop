import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { getComponentConfig, getRadiusClass, getCardVariant, getPadding } from '@/stores/useThemeStore';
import type { CardVariantKey, PaddingKey } from '@/stores/useThemeStore';

export type CardVariant = 'default' | 'glass' | 'outline' | 'elevated';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Card variant style */
  variant?: CardVariant;
  /** Padding size */
  padding?: CardPadding;
  /** Make card clickable */
  clickable?: boolean;
  /** Card content */
  children: ReactNode;
}

const variantStyles: Record<CardVariant, string> = {
  default: `
    bg-(--bg-base)
    border border-(--divider)
  `,
  glass: `
    glass-panel
    border border-white/10
  `,
  outline: `
    bg-transparent
    border-2 border-(--divider)
  `,
  elevated: `
    bg-(--bg-base)
    shadow-lg
  `,
};

const paddingStyles: Record<CardPadding, string> = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

/**
 * Card container component with multiple variants
 * 
 * Defaults configured via theme store (runtime configurable):
 * - borderRadius, defaultVariant, defaultPadding
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant,
      padding,
      clickable = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    // Get config from store (supports runtime override)
    const config = getComponentConfig('card');
    const effectiveVariant: CardVariantKey = variant ?? getCardVariant(config.defaultVariant);
    const effectivePadding: PaddingKey = padding ?? getPadding(config.defaultPadding);
    const radiusClass = getRadiusClass(config.borderRadius);

    const baseStyles = `
      ${radiusClass}
      transition-all
    `;

    const clickableStyles = clickable
      ? 'cursor-pointer hover:scale-[1.01] active:scale-[0.99] hover:shadow-lg'
      : '';

    return (
      <div
        ref={ref}
        className={`
          ${baseStyles}
          ${variantStyles[effectiveVariant]}
          ${paddingStyles[effectivePadding]}
          ${clickableStyles}
          ${className}
        `.trim().replace(/\s+/g, ' ')}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Card sub-components for semantic structure
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className = '', children, ...props }, ref) => (
    <div
      ref={ref}
      className={`mb-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
);

CardHeader.displayName = 'CardHeader';

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className = '', children, ...props }, ref) => (
    <h3
      ref={ref}
      className={`text-lg font-semibold text-(--text-main) ${className}`}
      {...props}
    >
      {children}
    </h3>
  )
);

CardTitle.displayName = 'CardTitle';

export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className = '', children, ...props }, ref) => (
    <p
      ref={ref}
      className={`text-sm text-(--text-muted) mt-1 ${className}`}
      {...props}
    >
      {children}
    </p>
  )
);

CardDescription.displayName = 'CardDescription';

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className = '', children, ...props }, ref) => (
    <div
      ref={ref}
      className={className}
      {...props}
    >
      {children}
    </div>
  )
);

CardContent.displayName = 'CardContent';

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className = '', children, ...props }, ref) => (
    <div
      ref={ref}
      className={`mt-4 flex items-center gap-2 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
);

CardFooter.displayName = 'CardFooter';
