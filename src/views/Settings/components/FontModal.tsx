import { useTranslation } from 'react-i18next';
import { Modal } from '@/components/ui';
import { Check } from 'lucide-react';
import type { FontMode } from '@/config';

interface FontModalProps {
  open: boolean;
  onClose: () => void;
  fontMode: string;
  onSelect: (font: FontMode) => void;
}

const FONT_OPTIONS: { id: FontMode; name: string; family: string; category: string }[] = [
  { id: 'inter', name: 'Inter', family: 'Inter', category: 'Sans-serif' },
  { id: 'lora', name: 'Lora', family: 'Lora', category: 'Serif' },
  { id: 'jetbrains-mono', name: 'JetBrains Mono', family: "'JetBrains Mono'", category: 'Monospace' },
  { id: 'system', name: 'System', family: 'system-ui', category: 'Native' },
];

const PREVIEW_TEXT = 'App Desktop Base — Giao diện mẫu 0123456789';

export function FontModal({ open, onClose, fontMode, onSelect }: FontModalProps) {
  const { t } = useTranslation();

  const select = (f: FontMode) => {
    onSelect(f);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={t('dashboard.settings.font')}>
      <div className="space-y-2">
        {FONT_OPTIONS.map((font) => {
          const isSelected = fontMode === font.id;
          return (
            <button
              key={font.id}
              onClick={() => select(font.id)}
              className={`
                w-full text-left px-4 py-3.5 rounded-xl transition-all cursor-pointer
                ${isSelected
                  ? 'bg-(--color-primary)/10 ring-2 ring-(--color-primary)/40'
                  : 'bg-(--bg-layer-2)/50 hover:bg-(--bg-layer-2)'
                }
              `}
            >
              {/* Font name + category + checkmark */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-(--text-main)">{font.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-(--bg-layer-2) text-(--text-muted)/70 uppercase tracking-wide">
                    {font.category}
                  </span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-(--color-primary) shrink-0" />}
              </div>

              {/* Live Preview */}
              <p
                className="text-[15px] leading-relaxed text-(--text-main)/80"
                style={{ fontFamily: `${font.family}, sans-serif` }}
              >
                {PREVIEW_TEXT}
              </p>
            </button>
          );
        })}
      </div>
    </Modal>
  );
}
