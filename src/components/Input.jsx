import React from "react";
import { AlertCircle } from "lucide-react";

export const cn = (...classes) => classes.filter(Boolean).join(" ");

const Input = ({ error, ...props }) => (
  <div className="space-y-1">
    <input
      className={cn(
        "w-full px-4 py-3 rounded-md border bg-gray-50 text-gray-900 text-sm transition-colors placeholder:text-gray-400",
        error
          ? "border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500"
          : "border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500",
        "focus:outline-none focus:bg-white"
      )}
      {...props}
    />
    {error && (
      <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
        <AlertCircle className="h-3 w-3" />
        {error}
      </p>
    )}
  </div>
);

export default Input;
