import { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { CheckCircle2, X } from 'lucide-react';

export interface ToastState {
  id: number;
  title: string;
  description?: string;
}

interface ToastNotificationProps {
  toast: ToastState | null;
  onDismiss: () => void;
}

export function ToastNotification({ toast, onDismiss }: ToastNotificationProps) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => {
      onDismiss();
    }, 4500);
    return () => window.clearTimeout(timer);
  }, [toast, onDismiss]);

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed top-20 right-4 sm:right-6 z-50 pointer-events-none max-w-sm w-[calc(100vw-2rem)]"
    >
      <AnimatePresence mode="wait">
        {toast && (
          <motion.div
            key={toast.id}
            role="status"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto bg-white border border-[#cfe0d7] rounded-lg shadow-lg p-4 flex items-start gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-[#168b57] shrink-0 mt-0.5" aria-hidden="true" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#123f43]">{toast.title}</p>
              {toast.description && (
                <p className="mt-0.5 text-xs leading-[1.5] text-[#516866]">{toast.description}</p>
              )}
            </div>
            <button
              type="button"
              onClick={onDismiss}
              aria-label="Dismiss notification"
              className="w-9 h-9 -mr-1 -mt-1 inline-flex items-center justify-center rounded-md text-[#607774] hover:text-[#123f43] hover:bg-[#edf5f1] transition-colors shrink-0 cursor-pointer"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
