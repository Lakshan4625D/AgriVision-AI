import { Search, SlidersHorizontal } from "lucide-react";

interface UserFiltersProps {
  search: string;
  role: string;
  onSearchChange: (value: string) => void;
  onRoleChange: (value: string) => void;
}

export default function UserFilters({
  search,
  role,
  onSearchChange,
  onRoleChange,
}: UserFiltersProps) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">

      <div className="grid gap-4 md:grid-cols-[1fr_220px]">

        {/* Search */}

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
            placeholder="Search users by name or email..."
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

        </div>

        {/* Role */}

        <div className="relative">

          <SlidersHorizontal
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <select
            value={role}
            onChange={(e) =>
              onRoleChange(e.target.value)
            }
            className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >

            <option value="all">
              All Roles
            </option>

            <option value="admin">
              Admin
            </option>

            <option value="inspector">
              Inspector
            </option>

            <option value="farmer">
              Farmer
            </option>

          </select>

        </div>

      </div>

    </div>
  );
}