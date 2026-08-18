import { useState } from "react";

import {
  ChevronDown,
} from "lucide-react";

const faqs = [
  {
    question: "How do I analyze a crop?",
    answer:
      "Open Crop Analysis, upload a clear image of your crop, provide the latitude and longitude of the farmland, and select Analyze Crop.",
  },
  {
    question: "What information does the AI provide?",
    answer:
      "AgriVision AI analyzes the crop image and provides crop type, crop stage, stress classification, confidence values, and severity information.",
  },
  {
    question: "Why did my image receive poor quality?",
    answer:
      "Images that are unclear, poorly lit, heavily obstructed, or unsuitable for crop analysis may be rejected. Retake the image clearly inside your farmland.",
  },
  {
    question: "Where can I see previous analyses?",
    answer:
      "Open the History page from the navigation menu to view your previous crop analyses and use the available filters.",
  },
  {
    question: "Can I generate reports?",
    answer:
      "Yes. The Reports section provides access to your crop analysis report information.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>

      <h2 className="text-xl font-semibold text-slate-800">
        Frequently Asked Questions
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Quick answers to common questions.
      </p>

      <div className="mt-5 space-y-3">

        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={faq.question}
              className="overflow-hidden rounded-2xl border bg-white shadow-sm"
            >

              <button
                type="button"
                onClick={() =>
                  setOpenIndex(isOpen ? null : index)
                }
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >

                <span className="font-medium text-slate-800">
                  {faq.question}
                </span>

                <ChevronDown
                  size={20}
                  className={`shrink-0 text-slate-400 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />

              </button>

              {isOpen && (
                <div className="border-t px-5 py-4 text-sm leading-6 text-slate-500">
                  {faq.answer}
                </div>
              )}

            </div>
          );
        })}

      </div>

    </div>
  );
}