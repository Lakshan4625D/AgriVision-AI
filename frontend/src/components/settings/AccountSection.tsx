import {
  CheckCircle2,
  UserRound,
} from "lucide-react";

import type { User } from "../../store/authStore";

interface AccountSectionProps {
  user: User;
}

export default function AccountSection({
  user,
}: AccountSectionProps) {
  return (
    <div className="rounded-2xl border bg-white shadow-sm">

      <div className="border-b px-6 py-5">
        <h2 className="text-lg font-semibold text-slate-800">
          Account Information
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Basic information about your AgriVision AI account.
        </p>
      </div>

      <div className="space-y-4 p-6">

        <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">

          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
              <UserRound size={18} />
            </div>

            <div>
              <p className="text-sm font-medium text-slate-700">
                User ID
              </p>

              <p className="text-xs text-slate-500">
                Unique account identifier
              </p>
            </div>

          </div>

          <span className="font-semibold text-slate-800">
            #{user.id}
          </span>

        </div>

        <div className="flex items-center justify-between rounded-xl bg-green-50 p-4">

          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-green-100 p-2 text-green-600">
              <CheckCircle2 size={18} />
            </div>

            <div>
              <p className="text-sm font-medium text-slate-700">
                Account Status
              </p>

              <p className="text-xs text-slate-500">
                Your account is currently active
              </p>
            </div>

          </div>

          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            Active
          </span>

        </div>

      </div>
    </div>
  );
}