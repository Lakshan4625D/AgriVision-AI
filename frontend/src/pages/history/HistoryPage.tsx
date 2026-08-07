import { useEffect, useMemo, useState } from "react";

import HistoryFilters from "../../components/history/HistoryFilters";
import HistoryTable from "../../components/history/HistoryTable";
import HistorySkeleton from "../../components/history/HistorySkeleton";

import { getHistory } from "../../api/history";

import { useAuthStore } from "../../store/authStore";
import { useHistoryStore } from "../../store/historyStore";

export default function HistoryPage() {
  const { user } = useAuthStore();

  const {
    history,
    loading,
    setHistory,
    setLoading,
  } = useHistoryStore();

  const [search, setSearch] = useState("");

  const [severity, setSeverity] = useState("");

  const [sort, setSort] = useState("newest");

  useEffect(() => {
    if (!user) return;

    const fetchHistory = async () => {
      try {
        setLoading(true);

        const data = await getHistory(user.id);

        setHistory(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user, setHistory, setLoading]);

  const filteredHistory = useMemo(() => {
    let data = [...history];

    // Search
    if (search.trim()) {
      const query = search.toLowerCase();

      data = data.filter(
        (item) =>
          item.crop_type.toLowerCase().includes(query) ||
          item.stage.toLowerCase().includes(query) ||
          item.stress_class.toLowerCase().includes(query)
      );
    }

    // Severity Filter
    if (severity) {
      data = data.filter(
        (item) =>
          item.severity_label.toLowerCase() === severity.toLowerCase()
      );
    }

    // Sorting
    data.sort((a, b) => {
      const first = new Date(a.created_at).getTime();
      const second = new Date(b.created_at).getTime();

      return sort === "newest"
        ? second - first
        : first - second;
    });

    return data;
  }, [history, search, severity, sort]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Analysis History
        </h1>

        <p className="mt-2 text-slate-500">
          View all previous crop analyses.
        </p>
      </div>

      <HistoryFilters
        search={search}
        setSearch={setSearch}
        severity={severity}
        setSeverity={setSeverity}
        sort={sort}
        setSort={setSort}
      />

      {loading ? (
        <HistorySkeleton />
      ) : (
        <HistoryTable history={filteredHistory} />
      )}
    </div>
  );
}