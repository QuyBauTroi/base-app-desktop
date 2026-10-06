import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { Modal, Button, toast, NavItem } from "@/components/ui";
import { Bell, Menu, X, LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  SIDEBAR_ITEMS,
} from "@/config/sidebarItems";
import { useAuthStore } from "@/stores/useAuthStore";

interface DashboardLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function DashboardLayout({ children, activeTab, onTabChange }: DashboardLayoutProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    setLogoutOpen(false);
    logout();
    toast.success(t('dashboard.settings.logout_success'));
    navigate('/login');
  };

  const handleTabChange = (tab: string) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
  };


  return (
    <div className="flex h-screen w-full bg-(--bg-layer-1) text-(--text-main)">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-[240px] flex-col border-r border-(--divider) bg-(--bg-base)/80 backdrop-blur-xl">
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 h-14 border-b border-(--divider)">
          <div className="w-9 h-9 text-(--color-primary)">
          </div>
          <span className="font-bold text-lg">App Desktop Base</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {SIDEBAR_ITEMS.map((item) => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={t(item.labelKey)}
              active={activeTab === item.id}
              onClick={() => onTabChange(item.id)}
            />
          ))}
        </nav>

        {/* User section */}
        <div className="p-3 border-t border-(--divider)">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-(--bg-layer-2) cursor-pointer transition-colors">
            <div className="w-9 h-9 rounded-full bg-linear-to-tr from-(--color-primary) to-emerald-400" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Admin</p>
              <p className="text-xs text-(--text-muted) truncate">admin@desktopbase.com</p>
            </div>
            <button onClick={() => setLogoutOpen(true)} className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer">
              <LogOut className="w-4 h-4 text-(--text-muted) hover:text-red-500" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="md:hidden fixed left-0 top-0 bottom-0 w-[280px] bg-(--bg-base) z-50 flex flex-col shadow-xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 h-16 border-b border-(--divider)">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 text-(--color-primary)">
                  </div>
                  <span className="font-bold text-lg">App Desktop Base</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-(--bg-layer-2) cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {SIDEBAR_ITEMS.map((item) => (
                  <NavItem
                    key={item.id}
                    icon={item.icon}
                    label={t(item.labelKey)}
                    active={activeTab === item.id}
                    onClick={() => handleTabChange(item.id)}
                  />
                ))}
              </nav>

              {/* User section */}
              <div className="p-3 border-t border-(--divider)">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-(--bg-layer-2) cursor-pointer transition-colors">
                  <div className="w-9 h-9 rounded-full bg-linear-to-tr from-(--color-primary) to-emerald-400" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">Admin</p>
                    <p className="text-xs text-(--text-muted) truncate">admin@desktopbase.com</p>
                  </div>
                  <button onClick={() => { setLogoutOpen(true); setMobileMenuOpen(false); }} className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer">
                    <LogOut className="w-4 h-4 text-(--text-muted) hover:text-red-500" />
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-14 border-b border-(--divider) bg-(--bg-base)/80 backdrop-blur-xl flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-(--bg-layer-2) cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Title / Breadcrumb */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-(--text-main)">
              {t(`dashboard.sidebar.${activeTab}`)}
            </span>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-lg hover:bg-(--bg-layer-2) transition-colors cursor-pointer">
              <Bell className="w-5 h-5 text-(--text-muted)" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="md:hidden w-8 h-8 rounded-full bg-linear-to-tr from-(--color-primary) to-emerald-400" />
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-(--bg-layer-1)">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal open={logoutOpen} onClose={() => setLogoutOpen(false)} size="sm" showCloseButton={false}>
        <div className="text-center py-2">
          <div className="w-14 h-14 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-(--text-main) mb-2">{t('dashboard.settings.logout')}</h3>
          <p className="text-(--text-muted) text-sm mb-6">{t('dashboard.settings.logout_confirm')}</p>
          <div className="flex gap-3">
            <Button variant="ghost" className="flex-1" onClick={() => setLogoutOpen(false)}>{t('common.cancel')}</Button>
            <Button variant="danger" className="flex-1" onClick={handleLogout}>{t('dashboard.settings.logout')}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
