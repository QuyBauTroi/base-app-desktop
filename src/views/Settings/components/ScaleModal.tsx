import { Modal } from '@/components/ui';
import { OptionItem } from './OptionItem';

interface ScaleModalProps {
  open: boolean;
  onClose: () => void;
  scaleMode: string;
  onSelect: (scale: 'normal' | 'large' | 'extraLarge') => void;
}

export function ScaleModal({ open, onClose, scaleMode, onSelect }: ScaleModalProps) {
  const select = (s: 'normal' | 'large' | 'extraLarge') => {
    onSelect(s);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Kích thước hiển thị">
      <div className="space-y-1">
        <OptionItem
          label="Bình thường (100%)"
          selected={scaleMode === 'normal'}
          onClick={() => select('normal')}
        />
        <OptionItem
          label="Lớn (115%)"
          selected={scaleMode === 'large'}
          onClick={() => select('large')}
        />
        <OptionItem
          label="Rất lớn (130%)"
          selected={scaleMode === 'extraLarge'}
          onClick={() => select('extraLarge')}
          isLast
        />
      </div>
    </Modal>
  );
}
