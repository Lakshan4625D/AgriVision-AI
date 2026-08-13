import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

export default function PreferencesSection() {
  const [notifications, setNotifications] = useState(() => {
    return (
      localStorage.getItem(
        "notifications_enabled"
      ) !== "false"
    );
  });

  useEffect(() => {
    localStorage.setItem(
      "notifications_enabled",
      String(notifications)
    );
  }, [notifications]);

  return (
    <div className="rounded-2xl border bg-white shadow-sm">

      <div className="border-b px-6 py-5">
        <h2 className="text-lg font-semibold text-slate-800">
          Preferences
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Manage your application preferences.
        </p>
      </div>

      <div className="p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
              <Bell size={20} />
            </div>

            <div>
              <p className="font-medium text-slate-800">
                Notifications
              </p>

              <p className="text-sm text-slate-500">
                Receive notifications about crop analysis results.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setNotifications((value) => !value)
            }
            aria-label="Toggle notifications"
            className={`relative h-7 w-12 rounded-full transition ${
              notifications
                ? "bg-blue-600"
                : "bg-slate-300"
            }`}
          >

            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                notifications
                  ? "left-6"
                  : "left-1"
              }`}
            />

          </button>

        </div>

        <div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
          Notification preferences are stored locally on this device.
        </div>

      </div>
    </div>
  );
}