import type { InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  className,
  ...props
}: InputProps) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition-all",
        "focus:border-blue-600 focus:ring-2 focus:ring-blue-200",
        className
      )}
    />
  );
}