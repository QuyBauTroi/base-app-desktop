import { motion } from "framer-motion";
import {
  Wifi,
  Cpu,
  Thermometer,
  Lightbulb,
  Power,
  Activity,
  TrendingUp,
  TrendingDown,
  MoreHorizontal
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui";

// Stat Card Component
interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "up" | "down";
  icon: React.ReactNode;
  color: string;
}

function StatCard({ title, value, change, changeType, icon, color }: StatCardProps) {
  return (
    <Card variant="outline" padding="md" className="relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-(--text-muted) mb-1">{title}</p>
          <p className="text-2xl font-bold text-(--text-main)">{value}</p>
          {change && (
            <div className={`flex items-center gap-1 mt-2 text-xs ${changeType === 'up' ? 'text-success' : 'text-red-500'}`}>
              {changeType === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span>{change}</span>
            </div>
          )}
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          {icon}
        </div>
      </div>
    </Card>
  );
}

// Device Card Component
interface DeviceCardProps {
  name: string;
  room: string;
  status: "online" | "offline";
  icon: React.ReactNode;
  isActive?: boolean;
}

function DeviceCard({ name, room, status, icon, isActive = false }: DeviceCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`p-4 rounded-xl border cursor-pointer transition-colors ${isActive
        ? 'bg-(--color-primary)/10 border-(--color-primary)/30'
        : 'bg-(--bg-base) border-(--divider) hover:border-(--color-primary)/30'
        }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive ? 'bg-(--color-primary) text-white' : 'bg-(--bg-layer-2) text-(--text-muted)'
          }`}>
          {icon}
        </div>
        <div className={`w-2 h-2 rounded-full ${status === 'online' ? 'bg-success' : 'bg-(--text-muted)'}`} />
      </div>
      <p className="font-medium text-sm text-(--text-main)">{name}</p>
      <p className="text-xs text-(--text-muted)">{room}</p>
    </motion.div>
  );
}

// Quick Action Button
interface QuickActionProps {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

function QuickAction({ label, icon, onClick }: QuickActionProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-4 rounded-xl bg-(--bg-base) border border-(--divider) hover:border-(--color-primary)/30 transition-colors cursor-pointer"
    >
      <div className="w-12 h-12 rounded-full bg-(--color-primary)/10 text-(--color-primary) flex items-center justify-center">
        {icon}
      </div>
      <span className="text-xs font-medium text-(--text-main)">{label}</span>
    </button>
  );
}

export function OverviewPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-(--text-main)">
            {t('dashboard.header.welcome')}
          </h1>
          <p className="text-(--text-muted) text-sm mt-1">
            Đây là tổng quan trạng thái hệ thống nhà thông minh của bạn
          </p>
        </div>
        <button className="p-2 rounded-lg hover:bg-(--bg-layer-2) transition-colors">
          <MoreHorizontal className="w-5 h-5 text-(--text-muted)" />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Thiết bị online"
          value="24"
          change="+2 mới"
          changeType="up"
          icon={<Wifi className="w-5 h-5 text-white" />}
          color="bg-(--color-primary)"
        />
        <StatCard
          title="Năng lượng"
          value="2.4 kWh"
          change="-12% so với hôm qua"
          changeType="down"
          icon={<Power className="w-5 h-5 text-white" />}
          color="bg-amber-500"
        />
        <StatCard
          title="Nhiệt độ TB"
          value="26°C"
          icon={<Thermometer className="w-5 h-5 text-white" />}
          color="bg-red-500"
        />
        <StatCard
          title="Đèn đang bật"
          value="8/15"
          icon={<Lightbulb className="w-5 h-5 text-white" />}
          color="bg-purple-500"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-semibold text-(--text-muted) uppercase tracking-wider mb-4">
          Thao tác nhanh
        </h2>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
          <QuickAction label="Tắt tất cả" icon={<Power className="w-5 h-5" />} />
          <QuickAction label="Chế độ ngủ" icon={<Cpu className="w-5 h-5" />} />
          <QuickAction label="Đèn sáng" icon={<Lightbulb className="w-5 h-5" />} />
          <QuickAction label="Điều hòa" icon={<Thermometer className="w-5 h-5" />} />
        </div>
      </div>

      {/* Devices Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-(--text-muted) uppercase tracking-wider">
            Thiết bị gần đây
          </h2>
          <button className="text-sm text-(--color-primary) hover:underline cursor-pointer">
            Xem tất cả
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          <DeviceCard name="Đèn phòng khách" room="Phòng khách" status="online" icon={<Lightbulb className="w-5 h-5" />} isActive />
          <DeviceCard name="Điều hòa" room="Phòng ngủ" status="online" icon={<Thermometer className="w-5 h-5" />} isActive />
          <DeviceCard name="Camera cửa" room="Sảnh" status="online" icon={<Activity className="w-5 h-5" />} />
          <DeviceCard name="Cảm biến cửa" room="Cửa chính" status="online" icon={<Cpu className="w-5 h-5" />} />
          <DeviceCard name="Đèn bếp" room="Bếp" status="offline" icon={<Lightbulb className="w-5 h-5" />} />
          <DeviceCard name="Quạt" room="Phòng khách" status="online" icon={<Power className="w-5 h-5" />} />
        </div>
      </div>

      {/* Activity Chart Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card variant="outline" padding="lg" className="lg:col-span-2">
          <h3 className="font-semibold text-sm text-(--text-muted) mb-4 uppercase tracking-wider">
            Biểu đồ tiêu thụ điện năng
          </h3>
          <div className="h-64 bg-(--bg-layer-2)/30 rounded-xl flex items-center justify-center">
            <p className="text-(--text-muted) text-sm">Chart sẽ được thêm sau</p>
          </div>
        </Card>

        <Card variant="outline" padding="lg">
          <h3 className="font-semibold text-sm text-(--text-muted) mb-4 uppercase tracking-wider">
            Hoạt động gần đây
          </h3>
          <div className="space-y-3">
            {[
              { icon: <Lightbulb className="w-4 h-4" />, text: "Đèn phòng khách bật", time: "2 phút trước" },
              { icon: <Thermometer className="w-4 h-4" />, text: "Điều hòa đặt 26°C", time: "15 phút trước" },
              { icon: <Power className="w-4 h-4" />, text: "Chế độ tiết kiệm bật", time: "1 giờ trước" },
              { icon: <Cpu className="w-4 h-4" />, text: "Cảm biến cửa kích hoạt", time: "2 giờ trước" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-(--bg-layer-2)/50">
                <div className="w-8 h-8 rounded-lg bg-(--color-primary)/10 text-(--color-primary) flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-(--text-main) truncate">{item.text}</p>
                  <p className="text-xs text-(--text-muted)">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
