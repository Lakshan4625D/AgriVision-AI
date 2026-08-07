import { useEffect, useMemo, useState } from "react";
import {
  FileText,
  Calendar,
  Download,
} from "lucide-react";

import ReportCard from "../../components/reports/ReportCard";
import ReportFilters from "../../components/reports/ReportFilters";
import ReportsTable from "../../components/reports/ReportsTable";
import ReportsSkeleton from "../../components/reports/ReportsSkeleton";

import { getReports } from "../../api/reports";

import { useAuthStore } from "../../store/authStore";
import { useReportsStore } from "../../store/reportsStore";

export default function ReportsPage() {
  const { user } = useAuthStore();

  const {
    reports,
    loading,
    setReports,
    setLoading,
  } = useReportsStore();

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!user) return;

    const fetchReports = async () => {
      try {
        setLoading(true);

        const data = await getReports(user.id);

        setReports(data);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [user, setReports, setLoading]);

  const filteredReports = useMemo(() => {
    if (!search) return reports;

    const value = search.toLowerCase();

    return reports.filter(
      (report) =>
        report.crop_type.toLowerCase().includes(value) ||
        report.stage.toLowerCase().includes(value) ||
        report.stress_class.toLowerCase().includes(value)
    );
  }, [reports, search]);

  const thisMonth = reports.filter((report) => {
    const date = new Date(report.created_at);
    const now = new Date();

    return (
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  });

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold text-slate-800">
          Reports
        </h1>

        <p className="mt-2 text-slate-500">
          Download and review your crop analysis reports.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-3">

        <ReportCard
          title="Total Reports"
          value={reports.length}
          icon={<FileText size={24} />}
          color="bg-blue-600"
        />

        <ReportCard
          title="This Month"
          value={thisMonth.length}
          icon={<Calendar size={24} />}
          color="bg-green-600"
        />

        <ReportCard
          title="Downloads"
          value={reports.length}
          icon={<Download size={24} />}
          color="bg-purple-600"
        />

      </div>

      <ReportFilters
        search={search}
        setSearch={setSearch}
      />

      {loading ? (
        <ReportsSkeleton />
      ) : (
        <ReportsTable
          reports={filteredReports}
        />
      )}

    </div>
  );
}