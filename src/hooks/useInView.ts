import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Fires once when the element first crosses the given threshold, then
 * disconnects. Backed by IntersectionObserver — never a scroll listener.
 */
export function useInView<T extends HTMLElement>(
  threshold = 0.4
): { ref: RefObject<T>; inView: boolean } {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, threshold]);

  return { ref, inView };
}
