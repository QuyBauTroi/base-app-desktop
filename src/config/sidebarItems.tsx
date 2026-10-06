import { ReactNode } from 'react';
import {
  Home, Settings,
} from 'lucide-react';

export interface SidebarItemDef {
  id: string;
  icon: ReactNode;
  labelKey: string;
}

export const SIDEBAR_ITEMS: SidebarItemDef[] = [
  { id: 'overview',     icon: <Home className="w-5 h-5" />,       labelKey: 'dashboard.sidebar.overview' },

  { id: 'settings', icon: <Settings className="w-5 h-5" />, labelKey: 'dashboard.sidebar.settings' },
];
