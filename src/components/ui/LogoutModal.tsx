import { AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Modal } from './Modal';
import { Button } from './Button';

export interface LogoutModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutModal({ open, onClose, onConfirm }: LogoutModalProps) {
  const { t } = useTranslation();

  return (
    <Modal open={open} onClose={onClose} size="sm" showCloseButton={false}>
      <div className="text-center pt-2 pb-4">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
          <AlertTriangle className="w-8 h-8" strokeWidth={2.5} />
        </div>
        <h3 className="text-lg font-bold text-(--text-main) mb-2">
          {t('dashboard.settings.logout')}
        </h3>
        <p className="text-(--text-muted) text-sm mb-6">
          {t('dashboard.settings.logout_confirm')}
        </p>
        <div className="flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={onClose}>
            {t('common.cancel')}
          </Button>
          <Button variant="danger" className="flex-1" onClick={onConfirm}>
            {t('dashboard.settings.logout')}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
