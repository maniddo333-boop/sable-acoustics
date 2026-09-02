import { useState } from "react";
import { Eyebrow } from "../Eyebrow";
import { ScrollReveal } from "../ScrollReveal";
import { LazyBackgroundVideo } from "../LazyBackgroundVideo";
import { THE_SOURCE, SOURCE_FILM } from "../../data/content";

export function TheSource() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="the-source" className="relative">
      <LazyBackgroundVideo spec={SOURCE_FILM} className="h-[70vh] w-full sm:h-[85vh]" />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite-950 via-graphite-950/40 to-transparent" />

      <div className="relative z-10 -mt-24 px-6 pb-24 sm:-mt-32 sm:px-10 sm:pb-32 lg:px-16">
        <ScrollReveal>
          <Eyebrow>Source</Eyebrow>
          <h2 className="mt-6 whitespace-pre-line font-display text-3xl font-semibold tracking-tight text-ivory sm:text-5xl">
            {THE_SOURCE.title}
          </h2>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
            {THE_SOURCE.body}
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[1.5rem] border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {THE_SOURCE.materials.map((material, i) => {
            const isActive = activeIndex === i;
            return (
              <button
                key={material.label}
                onClick={() => setActiveIndex(isActive ? null : i)}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex((cur) => (cur === i ? null : cur))}
                className="group flex min-h-[9rem] flex-col justify-between bg-graphite-900 p-6 text-left transition-colors duration-300 hover:bg-graphite-800"
                aria-expanded={isActive}
              >
                <p className="text-sm font-medium text-ivory">{material.label}</p>
                <p
                  className={`mt-3 text-xs leading-relaxed text-amber-soft transition-all duration-500 ease-weighted ${
                    isActive
                      ? "translate-y-0 opacity-100"
                      : "translate-y-2 opacity-0"
                  }`}
                >
                  {material.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
