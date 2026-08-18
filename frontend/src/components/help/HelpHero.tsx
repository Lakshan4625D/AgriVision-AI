import {
  CircleHelp,
  Search,
} from "lucide-react";

export default function HelpHero() {
  return (
    <div className="rounded-2xl bg-blue-600 p-8 text-white shadow-sm">

      <div className="flex items-start gap-4">

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15">
          <CircleHelp size={26} />
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            How can we help?
          </h2>

          <p className="mt-2 text-blue-100">
            Find answers and guidance for using AgriVision AI.
          </p>
        </div>

      </div>

      <div className="relative mt-6">

        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search for help..."
          className="w-full rounded-xl border-0 bg-white py-3 pl-12 pr-4 text-slate-800 outline-none ring-0 placeholder:text-slate-400"
        />

      </div>

    </div>
  );
}