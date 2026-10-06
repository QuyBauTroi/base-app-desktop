import { Check } from 'lucide-react';

interface OptionItemProps {
  icon?: React.ReactNode;
  label: string;
  selected: boolean;
  onClick: () => void;
  isLast?: boolean;
}

export function OptionItem({ icon, label, selected, onClick, isLast }: OptionItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-4 py-3.5 hover:bg-(--bg-layer-2)/50 transition-colors cursor-pointer ${!isLast ? 'border-b border-(--divider)' : ''}`}
    >
      {icon && (
        <div className={`w-5 h-5 ${selected ? 'text-(--color-primary)' : 'text-(--text-muted)'}`}>
          {icon}
        </div>
      )}
      <span className={`flex-1 text-left text-sm ${selected ? 'text-(--color-primary) font-medium' : 'text-(--text-main)'}`}>
        {label}
      </span>
      {selected && <Check className="w-5 h-5 text-(--color-primary)" />}
    </button>
  );
}
