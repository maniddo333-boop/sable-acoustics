import { useEffect, useState } from "react";

export type AssetCheckStatus = "checking" | "ok" | "missing";

const cache = new Map<string, AssetCheckStatus>();

/**
 * Verifies a video URL actually resolves to video content before any
 * <video> element is ever pointed at it. This matters because a dev server
 * (or a misconfigured static host/CDN) can answer a missing path with a
 * 200 OK HTML fallback instead of a real 404 — handing that to a <video>
 * tag asks the browser to decode HTML as video, which can hang the media
 * pipeline entirely rather than failing cleanly. Checking content-type
 * up front means we only ever mount <video> against a real video asset.
 */
export function useVideoAssetCheck(
  url: string,
  enabled = true
): AssetCheckStatus {
  const [status, setStatus] = useState<AssetCheckStatus>(
    () => cache.get(url) ?? "checking"
  );

  useEffect(() => {
    if (!enabled) return;

    const cached = cache.get(url);
    if (cached) {
      setStatus(cached);
      return;
    }

    let cancelled = false;

    fetch(url, { headers: { Range: "bytes=0-64" } })
      .then((res) => {
        const contentType = res.headers.get("content-type") ?? "";
        const ok = res.ok && contentType.startsWith("video/");
        const result: AssetCheckStatus = ok ? "ok" : "missing";
        cache.set(url, result);
        if (!cancelled) setStatus(result);
      })
      .catch(() => {
        cache.set(url, "missing");
        if (!cancelled) setStatus("missing");
      });

    return () => {
      cancelled = true;
    };
  }, [url, enabled]);

  return status;
}
