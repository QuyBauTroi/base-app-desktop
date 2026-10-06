import { Moon, Sun, Laptop } from 'lucide-react';
import { Modal } from '@/components/ui';
import { OptionItem } from './OptionItem';

interface ThemeModalProps {
  open: boolean;
  onClose: () => void;
  theme: string;
  onSelect: (theme: 'dark' | 'light' | 'system') => void;
}

export function ThemeModal({ open, onClose, theme, onSelect }: ThemeModalProps) {
  const select = (t: 'dark' | 'light' | 'system') => {
    onSelect(t);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Giao diện">
      <div className="space-y-1">
        <OptionItem
          icon={<Moon className="w-full h-full" />}
          label="Chế độ tối"
          selected={theme === 'dark'}
          onClick={() => select('dark')}
        />
        <OptionItem
          icon={<Sun className="w-full h-full" />}
          label="Chế độ sáng"
          selected={theme === 'light'}
          onClick={() => select('light')}
        />
        <OptionItem
          icon={<Laptop className="w-full h-full" />}
          label="Theo hệ thống"
          selected={theme === 'system'}
          onClick={() => select('system')}
          isLast
        />
      </div>
    </Modal>
  );
}
