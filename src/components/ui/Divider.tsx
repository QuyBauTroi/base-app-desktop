import { forwardRef, HTMLAttributes } from 'react';

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Label text */
  label?: string;
}

/**
 * Divider component for separating content
 * 
 * @example
 * <Divider />
 * 
 * @example
 * <Divider label="Or continue with" />
 */
export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      orientation = 'horizontal',
      label,
      className = '',
      ...props
    },
    ref
  ) => {
    if (orientation === 'vertical') {
      return (
        <div
          ref={ref}
          className={`w-px self-stretch bg-(--divider) ${className}`}
          {...props}
        />
      );
    }

    if (label) {
      return (
        <div
          ref={ref}
          className={`flex items-center gap-3 ${className}`}
          {...props}
        >
          <div className="flex-1 h-px bg-(--divider)" />
          <span className="text-xs text-(--text-muted) font-medium">
            {label}
          </span>
          <div className="flex-1 h-px bg-(--divider)" />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={`h-px w-full bg-(--divider) ${className}`}
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';
