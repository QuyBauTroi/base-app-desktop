import { ReactNode, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { IconButton } from './IconButton';
import { getComponentConfig, getRadiusClass } from '@/stores/useThemeStore';

export interface ModalProps {
  /** Whether modal is open */
  open: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Modal description */
  description?: string;
  /** Modal content */
  children: ReactNode;
  /** Modal size */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Show close button */
  showCloseButton?: boolean;
  /** Close on backdrop click */
  closeOnBackdrop?: boolean;
  /** Close on escape key */
  closeOnEscape?: boolean;
  /** Footer content */
  footer?: ReactNode;
}

const sizeStyles = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]',
};

/**
 * Modal dialog component with backdrop blur and spring animation
 * 
 * Defaults configured via theme store (runtime configurable):
 * - borderRadius, defaultSize
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size,
  showCloseButton = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  footer,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Get config from store (supports runtime override)
  const config = getComponentConfig('modal');
  const effectiveSize = size ?? (config.defaultSize as 'sm' | 'md' | 'lg' | 'xl' | 'full');
  const radiusClass = getRadiusClass(config.borderRadius);

  // Handle escape key
  useEffect(() => {
    if (!open || !closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, closeOnEscape, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Focus trap
  useEffect(() => {
    if (!open || !modalRef.current) return;

    const focusable = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusable.length > 0) {
      (focusable[0] as HTMLElement).focus();
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeOnBackdrop ? onClose : undefined}
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className={`
              relative
              z-10
              w-full
              max-h-[calc(100vh-2rem)]
              flex flex-col
              ${sizeStyles[effectiveSize]}
              bg-white dark:bg-(--bg-layer-1)
              border border-(--divider)
              ${radiusClass}
              shadow-2xl
              overflow-hidden
            `}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
            aria-describedby={description ? 'modal-description' : undefined}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-start justify-between p-5 pb-0">
                <div>
                  {title && (
                    <h2
                      id="modal-title"
                      className="text-lg font-semibold text-(--text-main)"
                    >
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p
                      id="modal-description"
                      className="mt-1 text-sm text-(--text-muted)"
                    >
                      {description}
                    </p>
                  )}
                </div>

                {showCloseButton && (
                  <IconButton
                    icon={<X />}
                    variant="ghost"
                    size="sm"
                    aria-label="Close modal"
                    onClick={onClose}
                    className="text-(--text-muted) hover:bg-black/5 dark:hover:bg-white/10 rounded-full"
                  />
                )}
              </div>
            )}

            {/* Content */}
            <div className="p-5 overflow-y-auto min-h-0">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="flex items-center justify-end gap-2 p-5 pt-0">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
