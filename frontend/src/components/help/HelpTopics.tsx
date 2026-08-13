import {
  ScanLine,
  History,
  FileText,
  BarChart3,
  UserRound,
  Settings,
} from "lucide-react";

const topics = [
  {
    title: "Crop Analysis",
    description:
      "Learn how to upload crop images and perform AI-powered analysis.",
    icon: ScanLine,
  },
  {
    title: "Analysis History",
    description:
      "View and filter your previous crop analysis results.",
    icon: History,
  },
  {
    title: "Reports",
    description:
      "Generate and review crop analysis reports.",
    icon: FileText,
  },
  {
    title: "Analytics",
    description:
      "Understand crop health, severity and analysis statistics.",
    icon: BarChart3,
  },
  {
    title: "Account",
    description:
      "Manage your profile and account information.",
    icon: UserRound,
  },
  {
    title: "Settings",
    description:
      "Manage your AgriVision AI preferences and security settings.",
    icon: Settings,
  },
];

export default function HelpTopics() {
  return (
    <div>

      <h2 className="text-xl font-semibold text-slate-800">
        Help Topics
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Explore guides for the main features of AgriVision AI.
      </p>

      <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

        {topics.map((topic) => {
          const Icon = topic.icon;

          return (
            <button
              key={topic.title}
              type="button"
              className="rounded-2xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
            >

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <Icon size={22} />
              </div>

              <h3 className="mt-4 font-semibold text-slate-800">
                {topic.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {topic.description}
              </p>

            </button>
          );
        })}

      </div>

    </div>
  );
}