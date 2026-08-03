import type { ReactNode } from "react";
import { motion } from "framer-motion";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-sky-500">
      {/* Background Glow */}
      <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" />

      {/* Left Section */}
      <div className="hidden w-1/2 items-center justify-center lg:flex">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg text-white"
        >
          <h1 className="mb-6 text-5xl font-bold">
            AgriVision AI
          </h1>

          <p className="text-xl leading-9 text-blue-100">
            AI Powered Crop Analytics for PMFBY
          </p>

          <div className="mt-12">
            <img
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=900"
              alt="Agriculture"
              className="rounded-3xl shadow-2xl"
            />
          </div>
        </motion.div>
      </div>

      {/* Right Section */}
      <div className="flex flex-1 items-center justify-center p-8">
        {children}
      </div>
    </div>
  );
}