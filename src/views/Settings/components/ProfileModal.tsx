import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pencil, Mail, Phone, MapPin, Building2, Calendar } from 'lucide-react';
import { Modal, Button, Input } from '@/components/ui';

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
}

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
  company: string;
  joinDate: string;
}

const DEFAULT_PROFILE: ProfileData = {
  name: 'Admin',
  email: 'admin@desktopbase.com',
  phone: '+84 123 456 789',
  address: 'Hà Nội, Việt Nam',
  company: 'Desktop Base',
  joinDate: '01/2024',
};

export function ProfileModal({ open, onClose }: ProfileModalProps) {
  const { t } = useTranslation();
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE);
  const [draft, setDraft] = useState<ProfileData>(DEFAULT_PROFILE);

  const handleEdit = () => {
    setDraft({ ...profile });
    setEditing(true);
  };

  const handleSave = () => {
    setProfile({ ...draft });
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft({ ...profile });
    setEditing(false);
  };

  const handleClose = () => {
    setEditing(false);
    onClose();
  };

  const updateDraft = (key: keyof ProfileData, value: string) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const infoRows: { key: keyof ProfileData; icon: React.ReactNode; labelKey: string }[] = [
    { key: 'email', icon: <Mail className="w-4 h-4" />, labelKey: 'dashboard.profile.email' },
    { key: 'phone', icon: <Phone className="w-4 h-4" />, labelKey: 'dashboard.profile.phone' },
    { key: 'address', icon: <MapPin className="w-4 h-4" />, labelKey: 'dashboard.profile.address' },
    { key: 'company', icon: <Building2 className="w-4 h-4" />, labelKey: 'dashboard.profile.company' },
    { key: 'joinDate', icon: <Calendar className="w-4 h-4" />, labelKey: 'dashboard.profile.join_date' },
  ];

  return (
    <Modal open={open} onClose={handleClose} size="sm" title={t('dashboard.profile.title')}>
      {/* Avatar + Name */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 rounded-full bg-linear-to-br from-(--color-primary) to-emerald-400 flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-3">
          {(editing ? draft.name : profile.name).charAt(0).toUpperCase()}
        </div>
        {editing ? (
          <Input
            value={draft.name}
            onChange={(e) => updateDraft('name', e.target.value)}
            className="max-w-[200px] text-center"
            size="sm"
          />
        ) : (
          <>
            <h3 className="text-lg font-bold text-(--text-main)">{profile.name}</h3>
            <p className="text-sm text-(--text-muted)">{t('dashboard.profile.role_admin')}</p>
          </>
        )}
      </div>

      {/* Info rows */}
      <div className="space-y-1">
        {infoRows.map(({ key, icon, labelKey }) => (
          <div
            key={key}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-(--bg-layer-2)/50"
          >
            <div className="text-(--text-muted)/60">{icon}</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-(--text-muted) mb-0.5">{t(labelKey)}</p>
              {editing && key !== 'joinDate' ? (
                <input
                  value={draft[key]}
                  onChange={(e) => updateDraft(key, e.target.value)}
                  className="w-full text-sm font-medium text-(--text-main) bg-transparent border-b border-(--divider) focus:border-(--color-primary) focus:outline-none pb-0.5 transition-colors"
                />
              ) : (
                <p className="text-sm font-medium text-(--text-main) truncate">{profile[key]}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="mt-5">
        {editing ? (
          <div className="flex gap-3">
            <Button variant="ghost" className="flex-1" onClick={handleCancel}>{t('common.cancel')}</Button>
            <Button variant="primary" className="flex-1" onClick={handleSave}>{t('common.save')}</Button>
          </div>
        ) : (
          <Button variant="ghost" className="w-full" onClick={handleEdit} icon={<Pencil className="w-4 h-4" />}>
            {t('common.edit')}
          </Button>
        )}
      </div>
    </Modal>
  );
}
