interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <span
      className={`inline-block rounded-full border border-hairline px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-amber font-mono-data ${className}`}
    >
      {children}
    </span>
  );
}
