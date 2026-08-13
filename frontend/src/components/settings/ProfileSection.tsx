import {
  Mail,
  Shield,
  UserRound,
} from "lucide-react";

import type { User } from "../../store/authStore";

interface ProfileSectionProps {
  user: User;
}

export default function ProfileSection({
  user,
}: ProfileSectionProps) {
  const roleName =
    user.role_id === 4
      ? "Farmer"
      : user.role_id === 3
        ? "Inspector"
        : user.role_id === 2
          ? "Administrator"
          : "User";

  return (
    <div className="rounded-2xl border bg-white shadow-sm">

      <div className="border-b px-6 py-5">
        <h2 className="text-lg font-semibold text-slate-800">
          Profile Information
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Your AgriVision AI account information.
        </p>
      </div>

      <div className="space-y-5 p-6">

        {/* Avatar */}

        <div className="flex items-center gap-4">

          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
            {user.full_name
              .charAt(0)
              .toUpperCase()}
          </div>

          <div>
            <h3 className="font-semibold text-slate-800">
              {user.full_name}
            </h3>

            <p className="text-sm text-slate-500">
              {roleName}
            </p>
          </div>

        </div>

        {/* Name */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Full Name
          </label>

          <div className="flex items-center gap-3 rounded-xl border bg-slate-50 px-4 py-3">

            <UserRound
              size={18}
              className="text-slate-400"
            />

            <span className="text-sm text-slate-700">
              {user.full_name}
            </span>

          </div>
        </div>

        {/* Email */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Email Address
          </label>

          <div className="flex items-center gap-3 rounded-xl border bg-slate-50 px-4 py-3">

            <Mail
              size={18}
              className="text-slate-400"
            />

            <span className="text-sm text-slate-700">
              {user.email}
            </span>

          </div>
        </div>

        {/* Role */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Account Role
          </label>

          <div className="flex items-center gap-3 rounded-xl border bg-slate-50 px-4 py-3">

            <Shield
              size={18}
              className="text-slate-400"
            />

            <span className="text-sm text-slate-700">
              {roleName}
            </span>

          </div>
        </div>

      </div>
    </div>
  );
}