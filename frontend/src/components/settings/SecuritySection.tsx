import {
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

export default function SecuritySection() {
  return (
    <div className="rounded-2xl border bg-white shadow-sm">

      <div className="border-b px-6 py-5">
        <h2 className="text-lg font-semibold text-slate-800">
          Security
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Security information for your account.
        </p>
      </div>

      <div className="space-y-4 p-6">

        <div className="flex items-start gap-4 rounded-xl bg-slate-50 p-4">

          <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
            <LockKeyhole size={20} />
          </div>

          <div>
            <h3 className="font-medium text-slate-800">
              Password
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Your account is protected by your registered password.
            </p>

            <p className="mt-2 text-xs text-amber-600">
              Password management will be available once the
              backend password-update endpoint is implemented.
            </p>
          </div>

        </div>

        <div className="flex items-start gap-4 rounded-xl bg-green-50 p-4">

          <div className="rounded-lg bg-green-100 p-2 text-green-600">
            <ShieldCheck size={20} />
          </div>

          <div>
            <h3 className="font-medium text-slate-800">
              Account Security
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Your session is authenticated through the
              AgriVision AI application.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}