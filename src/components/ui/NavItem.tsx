import { motion } from "framer-motion";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

export const NavItem = ({ icon, label, active, onClick }: NavItemProps) => (
  <div className="relative w-full">
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${active ? 'bg-(--color-primary)/10 text-(--color-primary)' : 'text-(--text-muted) hover:bg-(--bg-layer-2) hover:text-(--text-main)'}`}
    >
      {icon}
      <span>{label}</span>
    </motion.button>
    {active && (
      <motion.div
        layoutId="sidebar-active"
        className="absolute right-0 top-0 bottom-0 my-auto w-1 h-5 bg-(--color-primary) rounded-l-full pointer-events-none"
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    )}
  </div>
);
