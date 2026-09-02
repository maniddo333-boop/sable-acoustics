import type { ReactNode } from "react";
import { useInView } from "../hooks/useInView";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface ScrollRevealProps {
  children: ReactNode;
  delayMs?: number;
  className?: string;
}

/**
 * Heavy fade-up entrance, triggered once via IntersectionObserver.
 * Skips the transform/blur animation entirely under prefers-reduced-motion
 * (content still appears, just without motion). Always renders a <div> —
 * wrap the call site in <li> etc. when different semantics are needed.
 */
export function ScrollReveal({
  children,
  delayMs = 0,
  className = "",
}: ScrollRevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-[900ms] ease-weighted will-change-transform ${
        inView
          ? "translate-y-0 opacity-100 blur-0"
          : "translate-y-16 opacity-0 blur-md"
      } ${className}`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}
