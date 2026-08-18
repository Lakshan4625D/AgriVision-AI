import {
  Mail,
  Phone,
  Shield,
  UserRound,
} from "lucide-react";

import type { UserWithRole } from "../../types/users";

interface UserTableProps {
  users: UserWithRole[];
}

export default function UserTable({
  users,
}: UserTableProps) {
  if (users.length === 0) {
    return (
      <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
        <UserRound
          size={40}
          className="mx-auto text-slate-300"
        />

        <h3 className="mt-4 text-lg font-semibold text-slate-800">
          No users found
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Try changing your search or role filter.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

      {/* Desktop table */}

      <div className="hidden overflow-x-auto md:block">

        <table className="w-full">

          <thead className="border-b bg-slate-50">
            <tr className="text-left text-sm text-slate-500">

              <th className="px-6 py-4 font-medium">
                User
              </th>

              <th className="px-6 py-4 font-medium">
                Contact
              </th>

              <th className="px-6 py-4 font-medium">
                Role
              </th>

              <th className="px-6 py-4 font-medium">
                Joined
              </th>

              <th className="px-6 py-4 font-medium">
                Status
              </th>

            </tr>
          </thead>

          <tbody className="divide-y">

            {users.map((user) => (
              <tr
                key={user.id}
                className="transition hover:bg-slate-50"
              >

                {/* User */}

                <td className="px-6 py-5">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                      {user.full_name
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>
                      <p className="font-semibold text-slate-800">
                        {user.full_name}
                      </p>

                      <p className="text-xs text-slate-400">
                        ID #{user.id}
                      </p>
                    </div>

                  </div>

                </td>

                {/* Contact */}

                <td className="px-6 py-5">

                  <div className="space-y-1 text-sm">

                    <div className="flex items-center gap-2 text-slate-600">
                      <Mail size={14} />
                      {user.email}
                    </div>

                    {user.phone && (
                      <div className="flex items-center gap-2 text-slate-400">
                        <Phone size={14} />
                        {user.phone}
                      </div>
                    )}

                  </div>

                </td>

                {/* Role */}

                <td className="px-6 py-5">

                  <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700">

                    <Shield size={14} />

                    {user.role?.name ?? "Unassigned"}

                  </div>

                </td>

                {/* Joined */}

                <td className="px-6 py-5 text-sm text-slate-500">

                  {user.created_at
                    ? new Date(
                        user.created_at
                      ).toLocaleDateString()
                    : "—"}

                </td>

                {/* Status */}

                <td className="px-6 py-5">

                  <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700">

                    <span className="h-2 w-2 rounded-full bg-green-500" />

                    Active

                  </span>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile cards */}

      <div className="divide-y md:hidden">

        {users.map((user) => (
          <div
            key={user.id}
            className="p-5"
          >

            <div className="flex items-start justify-between gap-4">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                  {user.full_name
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div>
                  <p className="font-semibold text-slate-800">
                    {user.full_name}
                  </p>

                  <p className="text-xs text-slate-400">
                    ID #{user.id}
                  </p>
                </div>

              </div>

              <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                Active
              </span>

            </div>

            <div className="mt-4 space-y-2 text-sm">

              <div className="flex items-center gap-2 text-slate-600">
                <Mail size={14} />
                {user.email}
              </div>

              {user.phone && (
                <div className="flex items-center gap-2 text-slate-600">
                  <Phone size={14} />
                  {user.phone}
                </div>
              )}

              <div className="flex items-center gap-2 text-slate-600">
                <Shield size={14} />
                {user.role?.name ?? "Unassigned"}
              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}