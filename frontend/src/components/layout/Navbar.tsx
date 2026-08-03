import {
  Bell,
  Menu,
  Search,
} from "lucide-react";

import { useSidebarStore } from "../../store/sidebarStore";

export default function Navbar() {
  const { toggleSidebar } = useSidebarStore();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">

      <div className="flex items-center gap-4">

        <button
          onClick={toggleSidebar}
          className="rounded-lg p-2 hover:bg-slate-100"
        >
          <Menu size={22} />
        </button>

        <div className="relative hidden md:block">

          <Search
            size={18}
            className="absolute left-3 top-3 text-slate-400"
          />

          <input
            placeholder="Search..."
            className="w-72 rounded-lg border py-2 pl-10 pr-4 outline-none"
          />

        </div>

      </div>

      <div className="flex items-center gap-6">

        <button className="rounded-lg p-2 hover:bg-slate-100">
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">

            A

          </div>

          <div className="hidden md:block">

            <h4 className="font-semibold">
              Administrator
            </h4>

            <p className="text-sm text-slate-500">
              admin@agrivision.ai
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}