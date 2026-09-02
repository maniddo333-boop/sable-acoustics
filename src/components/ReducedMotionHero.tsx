import { useEffect, useState } from "react";
import { REDUCED_MOTION_STILLS } from "../data/content";

const INTERVAL_MS = 4500;

/**
 * The prefers-reduced-motion alternative to the scroll-scrubbed hero film:
 * three representative stills (driver -> enclosure -> full car) crossfading
 * on a timer instead of being tied to scroll position or fast motion.
 */
export function ReducedMotionHero() {
  const [index, setIndex] = useState(0);
  const [errored, setErrored] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % REDUCED_MOTION_STILLS.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden bg-graphite-900">
      {REDUCED_MOTION_STILLS.map((still, i) =>
        errored[i] ? null : (
          <img
            key={still.src}
            src={still.src}
            alt={still.alt}
            onError={() => setErrored((prev) => ({ ...prev, [i]: true }))}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms]"
            style={{ opacity: index === i ? 1 : 0 }}
          />
        )
      )}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
        {REDUCED_MOTION_STILLS.map((still, i) => (
          <span
            key={still.src}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              index === i ? "bg-amber" : "bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
