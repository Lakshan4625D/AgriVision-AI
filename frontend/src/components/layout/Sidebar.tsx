import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";

import Logo from "../common/Logo";
import { navigation } from "../../constants/navigation";
import { useSidebarStore } from "../../store/sidebarStore";

export default function Sidebar() {
  const { isOpen } = useSidebarStore();

  return (
    <aside
      className={`border-r bg-white transition-all duration-300 ${
        isOpen ? "w-72" : "w-20"
      }`}
    >
      <div className="border-b p-5">
        <Logo />
      </div>

      <nav className="flex h-[calc(100vh-90px)] flex-col justify-between p-3">

        <div>

          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `mb-2 flex items-center gap-4 rounded-xl px-4 py-3 transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-slate-100"
                  }`
                }
              >
                <Icon size={20} />

                {isOpen && (
                  <span>{item.title}</span>
                )}
              </NavLink>
            );
          })}

        </div>

        <button
          className="flex items-center gap-4 rounded-xl px-4 py-3 text-red-600 hover:bg-red-50"
        >
          <LogOut size={20} />

          {isOpen && "Logout"}
        </button>

      </nav>
    </aside>
  );
}