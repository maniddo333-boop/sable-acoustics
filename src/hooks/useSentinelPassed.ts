import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * True once a sentinel element (e.g. one placed right after the hero) has
 * scrolled into view, false again if the user scrolls back above it.
 * Used to toggle the nav from transparent-over-video to opaque.
 */
export function useSentinelPassed<T extends HTMLElement>(): {
  ref: RefObject<T>;
  passed: boolean;
} {
  const ref = useRef<T>(null);
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setPassed(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, passed };
}
