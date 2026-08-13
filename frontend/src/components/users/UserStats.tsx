import {
  Users,
  UserCheck,
  ShieldCheck,
  UserPlus,
} from "lucide-react";

interface UserStatsProps {
  total: number;
  active: number;
  admins: number;
  recent: number;
}

export default function UserStats({
  total,
  active,
  admins,
  recent,
}: UserStatsProps) {
  const stats = [
    {
      title: "Total Users",
      value: total,
      icon: Users,
      iconClass: "bg-blue-100 text-blue-600",
    },
    {
      title: "Active Users",
      value: active,
      icon: UserCheck,
      iconClass: "bg-green-100 text-green-600",
    },
    {
      title: "Administrators",
      value: admins,
      icon: ShieldCheck,
      iconClass: "bg-purple-100 text-purple-600",
    },
    {
      title: "Recent Users",
      value: recent,
      icon: UserPlus,
      iconClass: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-800">
                  {stat.value}
                </p>
              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconClass}`}
              >
                <Icon size={23} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}