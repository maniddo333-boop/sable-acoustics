import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Animates 0 -> target once `active` becomes true. Respects
 * prefers-reduced-motion by jumping straight to the final value.
 */
export function useCountUp(
  target: number,
  active: boolean,
  durationMs = 1400,
  decimals = 0
): number {
  const [value, setValue] = useState(0);
  const reducedMotion = useReducedMotion();
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;

    if (reducedMotion) {
      setValue(target);
      return;
    }

    const start = performance.now();
    const from = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / durationMs, 1);
      // weighted ease-out — no linear ticking
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(from + (target - from) * eased);
      if (t < 1) {
        rafId.current = requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };

    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [active, target, durationMs, reducedMotion]);

  return Number(value.toFixed(decimals));
}
