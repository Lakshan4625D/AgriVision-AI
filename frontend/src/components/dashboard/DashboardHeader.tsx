interface Props {
  name: string;
}

export default function DashboardHeader({ name }: Props) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 p-8 text-white">

      <div>

        <h1 className="text-3xl font-bold">
          Welcome back, {name} 👋
        </h1>

        <p className="mt-2 text-blue-100">
          {today}
        </p>

      </div>

      <div className="hidden lg:block">

        <div className="rounded-xl bg-white/20 px-5 py-3 backdrop-blur">
          AgriVision AI Dashboard
        </div>

      </div>

    </div>
  );
}