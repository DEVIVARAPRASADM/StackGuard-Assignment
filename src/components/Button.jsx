import React from "react";
import { cn } from "./Input";

const Button = ({ children, variant = "primary", className, ...props }) => {
  const base = "w-full py-3 px-4 rounded-md font-medium text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-purple-700 text-white hover:bg-purple-800 shadow-sm",
    secondary: "bg-gray-800 text-white hover:bg-gray-900",
  };
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
