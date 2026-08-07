import { useEffect } from "react";
import {
  Activity,
  Leaf,
  ShieldAlert,
  Target,
} from "lucide-react";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import AIInsights from "../../components/dashboard/AIInsights";
import Notifications from "../../components/dashboard/Notifications";

import StatCard from "../../components/dashboard/StatCard";
import RecentAnalysisTable from "../../components/dashboard/RecentAnalysisTable";
import QuickActions from "../../components/dashboard/QuickActions";
import DashboardSkeleton from "../../components/dashboard/DashboardSkeleton";

import { getDashboard } from "../../api/dashboard";

import { useDashboardStore } from "../../store/dashboardStore";
import { useAuthStore } from "../../store/authStore";

export default function DashboardPage() {
  const { user } = useAuthStore();

  const {
    dashboard,
    loading,
    setDashboard,
    setLoading,
  } = useDashboardStore();

  useEffect(() => {
    if (!user) return;

    const fetchDashboard = async () => {
      try {
        setLoading(true);

        const data = await getDashboard(user.id);

        setDashboard(data);
      } catch (error) {
        console.error("Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [user, setDashboard, setLoading]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (!dashboard) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-700">
          No Dashboard Data
        </h2>

        <p className="mt-3 text-slate-500">
          Analyze your first crop to see statistics.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <DashboardHeader
        name={user?.full_name ?? "User"}
      />

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Analyses"
          value={dashboard.total_analysis}
          icon={<Activity size={26} />}
          color="bg-blue-600"
        />

        <StatCard
          title="Healthy Crops"
          value={dashboard.healthy}
          icon={<Leaf size={26} />}
          color="bg-green-600"
        />

        <StatCard
          title="Diseased Crops"
          value={dashboard.diseased}
          icon={<ShieldAlert size={26} />}
          color="bg-red-600"
        />

        <StatCard
          title="Average Confidence"
          value={`${dashboard.avg_confidence}%`}
          icon={<Target size={26} />}
          color="bg-purple-600"
        />

      </div>

      {/* AI Insights & Notifications */}

      <div className="grid gap-8 xl:grid-cols-3">

        <div className="xl:col-span-2">
          <AIInsights />
        </div>

        <Notifications />

      </div>

      {/* Recent Analysis + Quick Actions */}

      <div className="grid gap-8 xl:grid-cols-3">

        <div className="xl:col-span-2">
          <RecentAnalysisTable
            analyses={dashboard.recent_analysis}
          />
        </div>

        <QuickActions />

      </div>

    </div>
  );
}