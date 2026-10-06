interface SectionProps {
  title?: string;
  children: React.ReactNode;
}

export function Section({ title, children }: SectionProps) {
  return (
    <div>
      {title && (
        <h3 className="text-xs font-medium text-(--text-muted) uppercase tracking-wide px-4 mb-2">
          {title}
        </h3>
      )}
      <div className="bg-(--bg-base)/80 backdrop-blur-xl rounded-xl overflow-hidden border border-white/10 shadow-lg shadow-black/5">
        {children}
      </div>
    </div>
  );
}
