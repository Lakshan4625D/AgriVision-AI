import { useEffect, useMemo } from "react";

import {
  Activity,
  Leaf,
  ShieldAlert,
  Target,
} from "lucide-react";

import AnalyticsCard from "../../components/analytics/AnalyticsCard";
import DiseaseChart from "../../components/analytics/DiseaseChart";
import StageChart from "../../components/analytics/StageChart";
import SeverityChart from "../../components/analytics/SeverityChart";
import TrendChart from "../../components/analytics/TrendChart";
import AnalyticsSkeleton from "../../components/analytics/AnalyticsSkeleton";

import { getAnalytics } from "../../api/analytics";

import { useAnalyticsStore } from "../../store/analyticsStore";
import { useAuthStore } from "../../store/authStore";

export default function AnalyticsPage() {
  const { user } = useAuthStore();

  const {
    data,
    loading,
    setData,
    setLoading,
  } = useAnalyticsStore();

  useEffect(() => {
    if (!user) return;

    const fetchAnalytics = async () => {
      try {
        setLoading(true);

        const response = await getAnalytics(user.id);

        setData(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [user, setData, setLoading]);

  const diseaseData = useMemo(() => {
    const map = new Map<string, number>();

    data.forEach((item) => {
      map.set(
        item.stress_class,
        (map.get(item.stress_class) || 0) + 1
      );
    });

    return [...map.entries()].map(([name, value]) => ({
      name,
      value,
    }));
  }, [data]);

  const stageData = useMemo(() => {
    const map = new Map<string, number>();

    data.forEach((item) => {
      map.set(
        item.stage,
        (map.get(item.stage) || 0) + 1
      );
    });

    return [...map.entries()].map(([name, value]) => ({
      name,
      value,
    }));
  }, [data]);

  const severityData = useMemo(() => {
    const map = new Map<string, number>();

    data.forEach((item) => {
      map.set(
        item.severity_label,
        (map.get(item.severity_label) || 0) + 1
      );
    });

    return [...map.entries()].map(([name, value]) => ({
      name,
      value,
    }));
  }, [data]);

  const trendData = useMemo(() => {
    const map = new Map<string, number>();

    data.forEach((item) => {
      const day = new Date(
        item.created_at
      ).toLocaleDateString();

      map.set(day, (map.get(day) || 0) + 1);
    });

    return [...map.entries()].map(([name, value]) => ({
      name,
      value,
    }));
  }, [data]);

  const healthy = data.filter(
    (item) =>
      item.stress_class.toLowerCase() === "healthy"
  ).length;

  const averageConfidence =
    data.length === 0
      ? 0
      : (
          data.reduce(
            (sum, item) =>
              sum + item.stress_confidence,
            0
          ) / data.length
        ).toFixed(1);

  if (loading) {
    return <AnalyticsSkeleton />;
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Analytics
        </h1>

        <p className="mt-2 text-slate-500">
          AI-powered insights from crop analyses.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <AnalyticsCard
          title="Total Analyses"
          value={data.length}
          icon={<Activity size={24} />}
          color="bg-blue-600"
        />

        <AnalyticsCard
          title="Healthy Crops"
          value={healthy}
          icon={<Leaf size={24} />}
          color="bg-green-600"
        />

        <AnalyticsCard
          title="Disease Types"
          value={diseaseData.length}
          icon={<ShieldAlert size={24} />}
          color="bg-red-600"
        />

        <AnalyticsCard
          title="Average Confidence"
          value={`${averageConfidence}%`}
          icon={<Target size={24} />}
          color="bg-purple-600"
        />

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        <TrendChart
          data={trendData}
        />

        <DiseaseChart
          data={diseaseData}
        />

        <StageChart
          data={stageData}
        />

        <SeverityChart
          data={severityData}
        />

      </div>

    </div>
  );
}