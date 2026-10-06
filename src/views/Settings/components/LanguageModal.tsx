import { Globe } from 'lucide-react';
import { Modal } from '@/components/ui';
import { OptionItem } from './OptionItem';

interface LanguageModalProps {
  open: boolean;
  onClose: () => void;
  language: string;
  onSelect: (lang: string) => void;
}

export function LanguageModal({ open, onClose, language, onSelect }: LanguageModalProps) {
  const select = (lang: string) => {
    onSelect(lang);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Ngôn ngữ">
      <div className="space-y-1">
        <OptionItem
          icon={<Globe className="w-full h-full" />}
          label="Tiếng Việt"
          selected={language === 'vn'}
          onClick={() => select('vn')}
        />
        <OptionItem
          icon={<Globe className="w-full h-full" />}
          label="English"
          selected={language === 'en'}
          onClick={() => select('en')}
          isLast
        />
      </div>
    </Modal>
  );
}
