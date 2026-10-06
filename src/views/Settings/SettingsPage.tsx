import { useState} from 'react';
import { useTranslation } from 'react-i18next';
import {
  Bell, Shield, Key, Smartphone, HelpCircle,
  LogOut, Moon, Sun, Laptop, Globe, Palette, Type, Maximize,
} from 'lucide-react';
import { useThemeStore } from '@/stores/useThemeStore';
import { toast, LogoutModal } from '@/components/ui';
import { ListItem } from './components/ListItem';
import { Section } from './components/Section';
import { ThemeModal } from './components/ThemeModal';
import { FontModal } from './components/FontModal';
import { ScaleModal } from './components/ScaleModal';
import { LanguageModal } from './components/LanguageModal';
import { ColorModal } from './components/ColorModal';
import { ProfileModal } from './components/ProfileModal';
import { PRESET_COLORS } from '@/config';

export function SettingsPage() {
  const { t, i18n } = useTranslation();
  const {
    theme, setTheme,
    fontMode, setFontMode,
    scaleMode, setScaleMode,
    updateColors, config,
  } = useThemeStore();

  // Modal states
  const [themeOpen, setThemeOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [fontOpen, setFontOpen] = useState(false);
  const [scaleOpen, setScaleOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleFeatureClick = (featureKey: string) => {
    toast.info(t('dashboard.settings.feature_coming_soon', { feature: t(featureKey) }));
  };

  const handleLogout = () => {
    toast.success(t('dashboard.settings.logout_success'));
    setLogoutOpen(false);
  };

  const getThemeLabel = () => {
    if (theme === 'dark') return t('dashboard.settings.theme_dark');
    if (theme === 'light') return t('dashboard.settings.theme_light');
    return t('dashboard.settings.theme_system');
  };

  const getThemeIcon = () => {
    if (theme === 'dark') return <Moon className="w-full h-full" />;
    if (theme === 'light') return <Sun className="w-full h-full" />;
    return <Laptop className="w-full h-full" />;
  };

  return (
    <>
      <div className="max-w-md mx-auto space-y-8 py-4 pb-20">
        {/* Profile */}
        <Section>
          <button
            onClick={() => setProfileOpen(true)}
            className="w-full flex items-center gap-4 p-4 hover:bg-(--color-primary)/5 transition-colors cursor-pointer"
          >
            <div className="w-14 h-14 rounded-full bg-linear-to-br from-(--color-primary) to-emerald-400 flex items-center justify-center text-white text-xl font-bold shadow-md">
              A
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-(--text-main)">Admin</p>
              <p className="text-sm text-(--text-muted)">admin@desktopbase.com</p>
            </div>
            <svg className="w-5 h-5 text-(--text-muted)/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </Section>

        {/* Theme & Display */}
        <Section title={t('dashboard.settings.section_display')}>
          <ListItem icon={getThemeIcon()} label={t('dashboard.settings.theme')} value={getThemeLabel()} onClick={() => setThemeOpen(true)} />
          <ListItem
            icon={<Palette className="w-full h-full" />}
            label={t('dashboard.settings.primary_color')}
            value={PRESET_COLORS.find(c => c.value === config.colors.primary)?.name || t('dashboard.settings.custom')}
            onClick={() => setColorOpen(true)}
          />
          <ListItem
            icon={<Type className="w-full h-full" />}
            label={t('dashboard.settings.font')}
            value={
              fontMode === 'inter' ? 'Inter' :
                fontMode === 'lora' ? 'Lora' :
                  fontMode === 'jetbrains-mono' ? 'JetBrains Mono' :
                    t('dashboard.settings.theme_system')
            }
            onClick={() => setFontOpen(true)}
          />
          <ListItem
            icon={<Maximize className="w-full h-full" />}
            label={t('dashboard.settings.scale')}
            value={scaleMode === 'normal' ? '100%' : scaleMode === 'large' ? '115%' : '130%'}
            onClick={() => setScaleOpen(true)}
          />
          <ListItem
            icon={<Globe className="w-full h-full" />}
            label={t('dashboard.settings.language')}
            value={i18n.language === 'vn' ? 'Tiếng Việt' : 'English'}
            onClick={() => setLangOpen(true)}
            isLast
          />
        </Section>

        {/* Account */}
        <Section title={t('dashboard.settings.section_account')}>
          <ListItem icon={<Key className="w-full h-full" />} label={t('dashboard.settings.change_password')} onClick={() => handleFeatureClick('dashboard.settings.change_password')} />
          <ListItem icon={<Shield className="w-full h-full" />} label={t('dashboard.settings.security')} value={t('common.on')} onClick={() => handleFeatureClick('dashboard.settings.security')} />
          <ListItem icon={<Smartphone className="w-full h-full" />} label={t('dashboard.settings.linked_devices')} value="2" isLast onClick={() => handleFeatureClick('dashboard.settings.linked_devices')} />
        </Section>

        {/* Other */}
        <Section>
          <ListItem icon={<Bell className="w-full h-full" />} label={t('dashboard.sidebar.notifications')} onClick={() => handleFeatureClick('dashboard.sidebar.notifications')} />
          <ListItem icon={<HelpCircle className="w-full h-full" />} label={t('dashboard.settings.help')} onClick={() => handleFeatureClick('dashboard.settings.help')} />
        </Section>

        {/* Logout */}
        <Section>
          <ListItem icon={<LogOut className="w-full h-full" />} label={t('dashboard.settings.logout')} danger isLast onClick={() => setLogoutOpen(true)} />
        </Section>
      </div>

      {/* Modals */}
      <ThemeModal open={themeOpen} onClose={() => setThemeOpen(false)} theme={theme} onSelect={setTheme} />
      <FontModal open={fontOpen} onClose={() => setFontOpen(false)} fontMode={fontMode} onSelect={setFontMode} />
      <ScaleModal open={scaleOpen} onClose={() => setScaleOpen(false)} scaleMode={scaleMode} onSelect={setScaleMode} />
      <LanguageModal open={langOpen} onClose={() => setLangOpen(false)} language={i18n.language} onSelect={(lang) => i18n.changeLanguage(lang)} />
      <ColorModal open={colorOpen} onClose={() => setColorOpen(false)} currentColor={config.colors.primary} colors={PRESET_COLORS} onSelect={updateColors} />
      <LogoutModal open={logoutOpen} onClose={() => setLogoutOpen(false)} onConfirm={handleLogout} />
      <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />
    </>
  );
}
