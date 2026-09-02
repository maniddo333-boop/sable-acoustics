import type { VideoSpec } from "../types";

interface VideoPlaceholderProps {
  spec: VideoSpec;
  className?: string;
}

/**
 * Shown in place of a scene film whenever the expected asset hasn't been
 * generated/dropped in yet. Never pretend a video exists — state exactly
 * what spec and file path is expected so it's a drop-in replacement later.
 */
export function VideoPlaceholder({ spec, className = "" }: VideoPlaceholderProps) {
  return (
    <div
      className={`relative flex h-full w-full flex-col items-center justify-center gap-4 border border-dashed border-hairline bg-graphite-800 px-8 text-center ${className}`}
      role="img"
      aria-label={`영상 자산 준비 중: ${spec.spec}`}
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
        className="text-muted"
      >
        <rect x="4" y="9" width="32" height="22" rx="2" stroke="currentColor" strokeWidth="1.2" />
        <path d="M16 15L25 20L16 25V15Z" fill="currentColor" />
      </svg>
      <p className="max-w-md text-xs leading-relaxed text-muted font-mono-data">
        {spec.spec}
      </p>
      <p className="font-mono-data text-[11px] text-amber/70">
        expected: {spec.src}
      </p>
    </div>
  );
}
