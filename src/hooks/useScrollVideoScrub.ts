import { useEffect, useRef, useState, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "./useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface Options {
  /** Called on every scroll-driven progress update (0..1). */
  onProgress?: (progress: number) => void;
  /** Disables scrubbing entirely (used for prefers-reduced-motion). */
  disabled?: boolean;
}

interface Result {
  /** True once the video's metadata (duration) has loaded. */
  metadataReady: boolean;
  /** True if the video element failed to load a source (no asset yet). */
  errored: boolean;
  /** Current scroll progress through the pinned container, 0..1. */
  progress: number;
}

const SETTLE_EPSILON = 0.004;
const DAMPING = 0.18;

/**
 * Maps scroll progress through `containerRef` (a tall, e.g. 500vh wrapper)
 * onto `videoRef`'s currentTime. The container's inner content is expected
 * to be `position: sticky; top: 0; height: 100vh` via CSS — this hook only
 * measures scroll progress and drives playback, it does not pin anything
 * itself, keeping the mechanism simple and framework-agnostic.
 *
 * The rAF loop is self-stopping: it runs only while currentTime is still
 * catching up to the scroll-driven target, and goes fully idle once it
 * settles, restarting on the next scroll-driven update rather than ticking
 * forever in the background.
 */
export function useScrollVideoScrub(
  containerRef: RefObject<HTMLElement>,
  videoRef: RefObject<HTMLVideoElement>,
  options: Options = {}
): Result {
  const { onProgress, disabled = false } = options;
  const reducedMotion = useReducedMotion();
  const [metadataReady, setMetadataReady] = useState(false);
  const [errored, setErrored] = useState(false);
  const [progress, setProgress] = useState(0);

  const targetProgress = useRef(0);
  const rafId = useRef<number | null>(null);

  const startLoopIfNeeded = useRef(() => {
    if (rafId.current !== null) return;
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;

    const tick = () => {
      const v = videoRef.current;
      if (!v) {
        rafId.current = null;
        return;
      }
      const targetTime = targetProgress.current * v.duration;
      const delta = targetTime - v.currentTime;
      if (Math.abs(delta) > SETTLE_EPSILON) {
        v.currentTime += delta * DAMPING;
        rafId.current = requestAnimationFrame(tick);
      } else {
        rafId.current = null;
      }
    };
    rafId.current = requestAnimationFrame(tick);
  }).current;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoaded = () => {
      video.pause();
      setMetadataReady(true);
      setErrored(false);
      startLoopIfNeeded();
    };
    const handleError = () => setErrored(true);

    video.addEventListener("loadedmetadata", handleLoaded);
    video.addEventListener("error", handleError);

    // A missing asset doesn't always raise a proper `error` event — e.g. a
    // dev server or CDN that answers a missing path with a 200 HTML
    // fallback instead of a real 404 leaves the video stuck in
    // NETWORK_NO_SOURCE with no error ever firing. A stall timeout catches
    // that case so the placeholder still shows instead of a frozen loader.
    const stallTimeout = window.setTimeout(() => {
      if (video.readyState === 0) setErrored(true);
    }, 4000);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoaded);
      video.removeEventListener("error", handleError);
      window.clearTimeout(stallTimeout);
    };
  }, [videoRef, startLoopIfNeeded]);

  useEffect(() => {
    if (disabled || reducedMotion) return;
    const container = containerRef.current;
    if (!container) return;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        targetProgress.current = self.progress;
        setProgress(self.progress);
        onProgress?.(self.progress);
        startLoopIfNeeded();
      },
    });

    return () => {
      trigger.kill();
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, [containerRef, disabled, reducedMotion, onProgress, startLoopIfNeeded]);

  return { metadataReady, errored, progress };
}
