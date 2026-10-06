import { Modal } from '@/components/ui';

interface PresetColor {
  name: string;
  value: string;
  light: string;
  dark: string;
}

interface ColorModalProps {
  open: boolean;
  onClose: () => void;
  currentColor: string;
  colors: PresetColor[];
  onSelect: (color: { primary: string; primaryLight: string; primaryDark: string }) => void;
}

export function ColorModal({ open, onClose, currentColor, colors, onSelect }: ColorModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Màu chủ đạo">
      <div className="p-1">
        <div className="grid grid-cols-3 gap-3">
          {colors.map((color) => (
            <button
              key={color.value}
              onClick={() => {
                onSelect({
                  primary: color.value,
                  primaryLight: color.light,
                  primaryDark: color.dark,
                });
                onClose();
              }}
              className={`
                relative flex flex-col items-center gap-2 p-3 rounded-xl border transition-all cursor-pointer
                ${currentColor === color.value
                  ? 'bg-(--bg-layer-2) border-(--color-primary)'
                  : 'bg-transparent border-transparent hover:bg-(--bg-layer-2)'
                }
              `}
            >
              <div
                className="w-10 h-10 rounded-full shadow-sm"
                style={{ backgroundColor: color.value }}
              />
              <span className="text-sm font-medium text-(--text-main)">{color.name}</span>
              {currentColor === color.value && (
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-(--color-primary)" />
              )}
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
}
