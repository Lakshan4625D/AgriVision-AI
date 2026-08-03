import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

import Logo from "../common/Logo";
import { navigation } from "../../constants/navigation";

import { useSidebarStore } from "../../store/sidebarStore";
import { useAuthStore } from "../../store/authStore";

export default function Sidebar() {
  const navigate = useNavigate();

  const { isOpen } = useSidebarStore();

  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
                      : "text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                <Icon size={20} />

                {isOpen && <span>{item.title}</span>}
              </NavLink>
            );
          })}
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-4 rounded-xl px-4 py-3 text-red-600 transition hover:bg-red-50"
        >
          <LogOut size={20} />

          {isOpen && <span>Logout</span>}
        </button>
      </nav>
    </aside>
  );
}