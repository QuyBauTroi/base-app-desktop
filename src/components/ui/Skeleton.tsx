import { HTMLAttributes, ReactNode } from 'react';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Width of skeleton */
  width?: string | number;
  /** Height of skeleton */
  height?: string | number;
  /** Make skeleton circular */
  circle?: boolean;
  /** Disable animation */
  static?: boolean;
}

/**
 * Skeleton loading placeholder
 * 
 * @example
 * // Text line
 * <Skeleton width="60%" height={16} />
 * 
 * @example
 * // Circle avatar
 * <Skeleton circle width={40} height={40} />
 * 
 * @example
 * // Card skeleton
 * <Skeleton width="100%" height={120} className="rounded-xl" />
 */
export function Skeleton({
  width,
  height,
  circle = false,
  static: isStatic = false,
  className = '',
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={`
        bg-(--bg-layer-2)
        ${circle ? 'rounded-full' : 'rounded-(--radius-md)'}
        ${isStatic ? '' : 'animate-pulse'}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        ...style,
      }}
      {...props}
    />
  );
}

// Pre-built skeleton patterns
export interface SkeletonTextProps {
  /** Number of lines */
  lines?: number;
  /** Width of last line (percentage) */
  lastLineWidth?: string;
}

export function SkeletonText({ lines = 3, lastLineWidth = '60%' }: SkeletonTextProps) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          width={i === lines - 1 ? lastLineWidth : '100%'}
          height={14}
        />
      ))}
    </div>
  );
}

export function SkeletonAvatar({ size = 40 }: { size?: number }) {
  return <Skeleton circle width={size} height={size} />;
}

export interface SkeletonCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Show avatar */
  avatar?: boolean;
  /** Number of text lines */
  lines?: number;
  children?: ReactNode;
}

export function SkeletonCard({
  avatar = false,
  lines = 2,
  className = '',
  children,
  ...props
}: SkeletonCardProps) {
  return (
    <div
      className={`bg-(--bg-layer-2) animate-pulse rounded-xl ${className}`}
      {...props}
    >
      {children || (
        <div className="flex gap-3">
          {avatar && <SkeletonAvatar />}
          <div className="flex-1">
            <SkeletonText lines={lines} />
          </div>
        </div>
      )}
    </div>
  );
}
