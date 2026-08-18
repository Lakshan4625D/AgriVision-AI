import {
  Settings,
  UserRound,
} from "lucide-react";

import { useAuthStore } from "../../store/authStore";

import ProfileSection from "../../components/settings/ProfileSection";
import AccountSection from "../../components/settings/AccountSection";
import PreferencesSection from "../../components/settings/PreferencesSection";
import SecuritySection from "../../components/settings/SecuritySection";

export default function SettingsPage() {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
        <UserRound
          size={40}
          className="mx-auto text-slate-300"
        />

        <h2 className="mt-4 text-xl font-semibold text-slate-800">
          Account information unavailable
        </h2>

        <p className="mt-2 text-slate-500">
          Please log in again to access your settings.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>
        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <Settings size={23} />
          </div>

          <h1 className="text-3xl font-bold text-slate-800">
            Settings
          </h1>

        </div>

        <p className="mt-2 text-slate-500">
          Manage your AgriVision AI account and preferences.
        </p>
      </div>

      {/* Settings Sections */}

      <div className="space-y-8">

        {/* Profile */}

        <ProfileSection user={user} />

        {/* Account */}

        <AccountSection user={user} />

        {/* Preferences */}

        <PreferencesSection />

        {/* Security */}

        <SecuritySection />

      </div>

    </div>
  );
}