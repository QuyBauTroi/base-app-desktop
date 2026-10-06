import { ChevronRight } from 'lucide-react';

interface ListItemProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
  onClick?: () => void;
  danger?: boolean;
  isLast?: boolean;
  badge?: boolean;
}

export function ListItem({ icon, label, value, onClick, danger, isLast, badge }: ListItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-4 py-3.5 hover:bg-(--color-primary)/5 active:bg-(--color-primary)/10 transition-colors cursor-pointer ${!isLast ? 'border-b border-(--divider)' : ''}`}
    >
      <div className={`relative w-5 h-5 ${danger ? 'text-red-500' : 'text-(--color-primary)'}`}>
        {icon}
        {badge && (
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-(--bg-base)" />
        )}
      </div>
      <span className={`flex-1 text-left text-sm ${danger ? 'text-red-500' : 'text-(--text-main)'}`}>
        {label}
      </span>
      {value && <span className="text-sm text-(--text-muted)">{value}</span>}
      {!danger && <ChevronRight className="w-4 h-4 text-(--text-muted)/40" />}
    </button>
  );
}
