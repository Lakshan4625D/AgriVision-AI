import type { ReactNode } from "react";
import { motion } from "framer-motion";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#F8FBFF]">
      {/* Background Blobs */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-100 opacity-70 blur-3xl" />

      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-sky-100 opacity-70 blur-3xl" />

      {/* Left Section */}
      <div className="hidden w-1/2 items-center justify-center px-16 lg:flex">
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-xl"
        >
          <h1 className="mb-6 text-5xl font-bold text-blue-700">
            AgriVision AI
          </h1>

          <p className="text-xl leading-9 text-slate-600">
            AI Powered Crop Analytics for PMFBY
          </p>

          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=900"
            alt="Agriculture"
            className="mt-12 rounded-3xl shadow-xl"
          />
        </motion.div>
      </div>

      {/* Right Section */}
      <div className="flex flex-1 items-center justify-center p-8">
        {children}
      </div>
    </div>
  );
}