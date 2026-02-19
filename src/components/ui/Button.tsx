import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "danger";
  glow?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Button({
  children,
  variant = "primary",
  glow = false,
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 active:scale-[0.97] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  const variants = {
    primary:
      "bg-purple-600 text-white hover:bg-purple-500 border border-purple-500/50",
    outline:
      "bg-transparent border border-purple-500/40 text-purple-400 hover:bg-purple-500/10 hover:border-purple-400",
    ghost:
      "bg-transparent text-gray-400 hover:text-white hover:bg-white/5",
    danger:
      "bg-red-600 text-white hover:bg-red-500 border border-red-500/50",
  };

  const glowClass = glow
    ? "shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]"
    : "";

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${glowClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
