import { useState } from "react";
import { useInView } from "../hooks/useInView";
import { useVideoAssetCheck } from "../hooks/useVideoAssetCheck";
import { VideoPlaceholder } from "./VideoPlaceholder";
import type { VideoSpec } from "../types";

interface LazyBackgroundVideoProps {
  spec: VideoSpec;
  className?: string;
}

/**
 * A muted, looping ambient background clip (not scroll-scrubbed — that
 * mechanism is reserved for the hero). Only mounts the <video>/<source>
 * once the section is near the viewport AND the asset has been verified
 * to actually be video content (see useVideoAssetCheck) — a <video>
 * pointed at a missing/mistyped asset paints solid black instead of
 * showing the poster, and can even stall the browser's media pipeline.
 */
export function LazyBackgroundVideo({ spec, className = "" }: LazyBackgroundVideoProps) {
  const { ref, inView } = useInView<HTMLDivElement>(0.01);
  const assetStatus = useVideoAssetCheck(spec.src, inView);
  const [posterErrored, setPosterErrored] = useState(false);
  const [frameReady, setFrameReady] = useState(false);

  const missing = assetStatus === "missing";

  return (
    <div ref={ref} className={`relative overflow-hidden bg-graphite-900 ${className}`}>
      {missing ? (
        <VideoPlaceholder spec={spec} className="absolute inset-0" />
      ) : (
        !posterErrored && (
          <img
            src={spec.poster}
            alt=""
            aria-hidden="true"
            onError={() => setPosterErrored(true)}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: frameReady ? 0 : 1 }}
          />
        )
      )}

      {assetStatus === "ok" && (
        <video
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
          style={{ opacity: frameReady ? 1 : 0 }}
          poster={spec.poster}
          muted
          loop
          autoPlay
          playsInline
          preload="auto"
          onLoadedData={() => setFrameReady(true)}
          aria-hidden="true"
        >
          <source src={spec.src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
