import {
  CircleHelp,
} from "lucide-react";

import HelpHero from "../../components/help/HelpHero";
import HelpTopics from "../../components/help/HelpTopics";
import FAQSection from "../../components/help/FAQSection";
import ContactSupport from "../../components/help/ContactSupport";

export default function HelpPage() {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div>

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <CircleHelp size={23} />
          </div>

          <h1 className="text-3xl font-bold text-slate-800">
            Help & Support
          </h1>

        </div>

        <p className="mt-2 text-slate-500">
          Find answers and learn how to use AgriVision AI.
        </p>

      </div>

      {/* Search */}

      <HelpHero />

      {/* Help Topics */}

      <HelpTopics />

      {/* FAQ */}

      <FAQSection />

      {/* Support */}

      <ContactSupport />

    </div>
  );
}