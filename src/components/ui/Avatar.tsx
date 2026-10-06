import { forwardRef, HTMLAttributes, ReactNode } from 'react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  /** Image source URL */
  src?: string;
  /** Alt text for image */
  alt?: string;
  /** Fallback text (usually initials) */
  fallback?: string;
  /** Avatar size */
  size?: AvatarSize;
  /** Show online indicator */
  online?: boolean;
}

const sizeStyles: Record<AvatarSize, { container: string; text: string; indicator: string }> = {
  xs: { container: 'w-6 h-6', text: 'text-xs', indicator: 'w-2 h-2' },
  sm: { container: 'w-8 h-8', text: 'text-xs', indicator: 'w-2.5 h-2.5' },
  md: { container: 'w-10 h-10', text: 'text-sm', indicator: 'w-3 h-3' },
  lg: { container: 'w-12 h-12', text: 'text-base', indicator: 'w-3.5 h-3.5' },
  xl: { container: 'w-16 h-16', text: 'text-lg', indicator: 'w-4 h-4' },
};

/**
 * Avatar component with image, fallback initials, and online indicator
 * 
 * @example
 * // With image
 * <Avatar src="/user.jpg" alt="John Doe" />
 * 
 * @example
 * // With fallback initials
 * <Avatar fallback="JD" size="lg" />
 * 
 * @example
 * // With online indicator
 * <Avatar src="/user.jpg" online />
 */
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt = '',
      fallback,
      size = 'md',
      online,
      className = '',
      ...props
    },
    ref
  ) => {
    const styles = sizeStyles[size];

    // Generate fallback from alt if not provided
    const fallbackText = fallback || alt
      .split(' ')
      .map(word => word[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

    return (
      <div
        ref={ref}
        className={`relative inline-block ${className}`}
        {...props}
      >
        <div
          className={`
            ${styles.container}
            rounded-full
            overflow-hidden
            bg-linear-to-br from-(--color-primary) to-(--color-primary-light)
            flex items-center justify-center
            ring-2 ring-(--bg-base)
          `}
        >
          {src ? (
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Hide image on error, show fallback
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <span className={`${styles.text} font-semibold text-white`}>
              {fallbackText}
            </span>
          )}
        </div>

        {online !== undefined && (
          <span
            className={`absolute bottom-0 right-0 block ${styles.indicator} rounded-full ring-2 ring-(--bg-base) ${online ? 'bg-(--color-success)' : 'bg-(--text-muted)'}`}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

// Avatar Group for stacking multiple avatars
export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Maximum avatars to show before +N */
  max?: number;
  /** Size of avatars */
  size?: AvatarSize;
  children: ReactNode;
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ max = 4, size = 'md', className = '', children, ...props }, ref) => {
    const childArray = Array.isArray(children) ? children : [children];
    const visibleChildren = childArray.slice(0, max);
    const remainingCount = childArray.length - max;

    const overlapMap: Record<AvatarSize, string> = {
      xs: '-ml-2',
      sm: '-ml-2.5',
      md: '-ml-3',
      lg: '-ml-4',
      xl: '-ml-5',
    };

    return (
      <div
        ref={ref}
        className={`flex items-center ${className}`}
        {...props}
      >
        {visibleChildren.map((child, index) => (
          <div
            key={index}
            className={index > 0 ? overlapMap[size] : ''}
            style={{ zIndex: visibleChildren.length - index }}
          >
            {child}
          </div>
        ))}

        {remainingCount > 0 && (
          <div
            className={`
              ${overlapMap[size]}
              ${sizeStyles[size].container}
              rounded-full
              bg-(--bg-layer-2)
              flex items-center justify-center
              ring-2 ring-(--bg-base)
            `}
            style={{ zIndex: 0 }}
          >
            <span className={`${sizeStyles[size].text} font-semibold text-(--text-muted)`}>
              +{remainingCount}
            </span>
          </div>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';
