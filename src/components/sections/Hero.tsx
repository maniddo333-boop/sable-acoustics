import { useRef, useState } from "react";
import { BRAND, HERO_COPY, HERO_FILM } from "../../data/content";
import { useScrollVideoScrub } from "../../hooks/useScrollVideoScrub";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useVideoAssetCheck } from "../../hooks/useVideoAssetCheck";
import { VideoPlaceholder } from "../VideoPlaceholder";
import { ReducedMotionHero } from "../ReducedMotionHero";
import { Button } from "../Button";

function stageOpacity(
  p: number,
  fadeInStart: number,
  fadeInEnd: number,
  fadeOutStart: number,
  fadeOutEnd: number
): number {
  if (p < fadeInStart) return 0;
  if (p < fadeInEnd) return (p - fadeInStart) / (fadeInEnd - fadeInStart);
  if (p < fadeOutStart) return 1;
  if (p < fadeOutEnd)
    return 1 - (p - fadeOutStart) / (fadeOutEnd - fadeOutStart);
  return 0;
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  const assetStatus = useVideoAssetCheck(HERO_FILM.src, !reducedMotion);
  const { errored: stallErrored, progress } = useScrollVideoScrub(
    containerRef,
    videoRef,
    { disabled: reducedMotion || assetStatus !== "ok" }
  );
  const [frameReady, setFrameReady] = useState(false);
  const errored = assetStatus === "missing" || stallErrored;

  const stage1Opacity = stageOpacity(progress, 0, 0.05, 0.25, 0.3);
  const stage2Opacity = stageOpacity(progress, 0.35, 0.4, 0.6, 0.65);
  const brandOpacity = stageOpacity(progress, 0.75, 0.83, 1, 1);
  const ctaOpacity = stageOpacity(progress, 0.87, 0.95, 1, 1);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-[300vh] sm:h-[400vh] lg:h-[500vh]"
      aria-label="히어로 — 엔진 내부에서 완성된 시스템까지"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-graphite-950">
        {reducedMotion ? (
          <ReducedMotionHero />
        ) : (
          <>
            {assetStatus === "ok" && (
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ opacity: frameReady ? 1 : 0 }}
                poster={HERO_FILM.poster}
                muted
                playsInline
                preload="auto"
                onLoadedData={() => setFrameReady(true)}
                aria-hidden="true"
              >
                <source src={HERO_FILM.src} type="video/mp4" />
              </video>
            )}

            {errored && (
              <VideoPlaceholder spec={HERO_FILM} className="absolute inset-0" />
            )}

            {!frameReady && !errored && (
              <div className="absolute bottom-6 left-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted font-mono-data">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber" />
                Loading Film
              </div>
            )}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite-950/70 via-transparent to-graphite-950/20" />
          </>
        )}

        {/* Stage 1 copy */}
        {!reducedMotion && (
          <p
            className="absolute bottom-16 left-6 text-sm tracking-wide text-ivory sm:left-10"
            style={{ opacity: stage1Opacity }}
          >
            {HERO_COPY.stage1}
          </p>
        )}

        {/* Stage 2 copy */}
        {!reducedMotion && (
          <p
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-display text-2xl tracking-wide text-ivory sm:text-3xl"
            style={{ opacity: stage2Opacity }}
          >
            {HERO_COPY.stage2}
          </p>
        )}

        {/* Final brand reveal + CTAs */}
        <div
          className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-6 px-6 text-center sm:bottom-14"
          style={{ opacity: reducedMotion ? 1 : brandOpacity }}
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber">
              {BRAND.name}
            </p>
            <h1 className="mt-3 font-display text-lg italic text-ivory sm:text-xl">
              &ldquo;{BRAND.tagline}&rdquo;
            </h1>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted">
              {HERO_COPY.productLabel}
            </p>
            <p className="font-display text-4xl font-semibold tracking-tight text-ivory sm:text-6xl">
              {BRAND.flagship}
            </p>
          </div>

          <div
            className="flex flex-col gap-3 sm:flex-row"
            style={{
              opacity: reducedMotion ? 1 : ctaOpacity,
              pointerEvents: reducedMotion || ctaOpacity > 0.5 ? "auto" : "none",
            }}
            aria-hidden={!reducedMotion && ctaOpacity <= 0.5}
          >
            {(() => {
              const ctaHidden = !reducedMotion && ctaOpacity <= 0.5;
              return (
                <>
                  <Button variant="primary" tabIndex={ctaHidden ? -1 : undefined}>
                    {HERO_COPY.ctaPrimary}
                  </Button>
                  <Button variant="ghost" tabIndex={ctaHidden ? -1 : undefined}>
                    {HERO_COPY.ctaSecondary}
                  </Button>
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
}
