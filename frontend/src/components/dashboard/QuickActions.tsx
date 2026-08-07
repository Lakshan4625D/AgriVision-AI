import { Link } from "react-router-dom";

import Button from "../ui/Button";

export default function QuickActions() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="mb-5 text-lg font-semibold">
        Quick Actions
      </h2>

      <div className="space-y-4">

        <Link to="/analysis">
          <Button>
            Analyze Crop
          </Button>
        </Link>

        <Link to="/history">
          <Button variant="secondary">
            View History
          </Button>
        </Link>

        <Link to="/reports">
          <Button variant="secondary">
            Reports
          </Button>
        </Link>

      </div>

    </div>
  );
}