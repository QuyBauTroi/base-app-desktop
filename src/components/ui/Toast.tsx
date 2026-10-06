import { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { create } from 'zustand';
import { getComponentConfig, getRadiusClass } from '@/stores/useThemeStore';

// Toast types
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

// Toast store
interface ToastStore {
  toasts: Toast[];
  add: (toast: Omit<Toast, 'id'>) => void;
  remove: (id: string) => void;
  clear: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  add: (toast) => set((state) => ({
    toasts: [...state.toasts, { ...toast, id: crypto.randomUUID() }],
  })),
  remove: (id) => set((state) => ({
    toasts: state.toasts.filter((t) => t.id !== id),
  })),
  clear: () => set({ toasts: [] }),
}));

// Convenience functions
export const toast = {
  success: (title: string, options?: Partial<Toast>) =>
    useToastStore.getState().add({ type: 'success', title, ...options }),
  error: (title: string, options?: Partial<Toast>) =>
    useToastStore.getState().add({ type: 'error', title, ...options }),
  warning: (title: string, options?: Partial<Toast>) =>
    useToastStore.getState().add({ type: 'warning', title, ...options }),
  info: (title: string, options?: Partial<Toast>) =>
    useToastStore.getState().add({ type: 'info', title, ...options }),
};

// Toast item component
interface ToastItemProps {
  toast: Toast;
  onRemove: () => void;
}

const icons: Record<ToastType, ReactNode> = {
  success: <CheckCircle className="w-5 h-5 text-success" />,
  error: <AlertCircle className="w-5 h-5 text-error" />,
  warning: <AlertTriangle className="w-5 h-5 text-warning" />,
  info: <Info className="w-5 h-5 text-info" />,
};

const bgColors: Record<ToastType, string> = {
  success: 'bg-(--color-success)/10 border-(--color-success)/20',
  error: 'bg-(--color-error)/10 border-(--color-error)/20',
  warning: 'bg-(--color-warning)/10 border-(--color-warning)/20',
  info: 'bg-(--color-info)/10 border-(--color-info)/20',
};

function ToastItem({ toast, onRemove }: ToastItemProps) {
  const [isVisible, setIsVisible] = useState(true);
  const duration = toast.duration ?? 5000;

  // Get config from store
  const config = getComponentConfig('toast');
  const radiusClass = getRadiusClass(config.borderRadius);

  useEffect(() => {
    if (duration === 0) return;

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onRemove, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onRemove]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={`
        flex items-start gap-3 p-4
        ${radiusClass}
        border
        backdrop-blur-xl
        shadow-lg
        ${bgColors[toast.type]}
        bg-(--bg-base)/90
      `}
    >
      <span className="shrink-0 mt-0.5">
        {icons[toast.type]}
      </span>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-(--text-main)">
          {toast.title}
        </p>
        {toast.description && (
          <p className="mt-1 text-sm text-(--text-muted)">
            {toast.description}
          </p>
        )}
      </div>

      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onRemove, 300);
        }}
        className="
          shrink-0
          p-1
          rounded-sm
          text-(--text-muted)
          hover:text-(--text-main)
          hover:bg-(--bg-layer-2)
          transition-colors
          cursor-pointer
        "
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

/**
 * Toast container - render once in your app root
 * 
 * Defaults configured via theme store (runtime configurable):
 * - borderRadius
 */
export function ToastContainer() {
  const { toasts, remove } = useToastStore();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-80">
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <ToastItem
            key={t.id}
            toast={t}
            onRemove={() => remove(t.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
