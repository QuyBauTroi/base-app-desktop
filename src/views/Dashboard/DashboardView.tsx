import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/layouts";

export function DashboardView() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract active tab from URL path
  // /dashboard/devices => "devices"
  // /dashboard => "overview" (default)
  const getActiveTab = () => {
    const path = location.pathname.replace('/dashboard/', '').replace('/dashboard', '');
    return path || 'overview';
  };

  const handleTabChange = (tab: string) => {
    navigate(`/dashboard/${tab}`);
  };

  return (
    <DashboardLayout activeTab={getActiveTab()} onTabChange={handleTabChange}>
      <Outlet />
    </DashboardLayout>
  );
}


