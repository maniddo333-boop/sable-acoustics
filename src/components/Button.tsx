import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
}

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "group inline-flex items-center gap-3 rounded-full pl-6 pr-2 py-2 text-sm font-medium transition-all duration-500 ease-weighted active:scale-[0.98]";
  const variants: Record<string, string> = {
    primary: "bg-ivory text-graphite-950 hover:bg-amber-soft",
    ghost:
      "border border-hairline text-ivory hover:border-amber/60 hover:text-amber-soft",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      <span>{children}</span>
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10 transition-transform duration-500 ease-weighted group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2 12L12 2M12 2H4M12 2V10"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}
