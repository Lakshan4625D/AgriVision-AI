import {
  Mail,
  MessageCircle,
} from "lucide-react";

export default function ContactSupport() {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="flex items-start gap-4">

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
          <MessageCircle size={22} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Need more help?
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            If you cannot find the answer you need, contact the
            AgriVision AI support team.
          </p>
        </div>

      </div>

      <div className="mt-5 flex items-center gap-3 rounded-xl bg-slate-50 p-4">

        <Mail
          size={20}
          className="text-blue-600"
        />

        <div>
          <p className="text-sm font-medium text-slate-700">
            Email Support
          </p>

          <p className="text-sm text-slate-500">
            support@agrivision.ai
          </p>
        </div>

      </div>

    </div>
  );
}