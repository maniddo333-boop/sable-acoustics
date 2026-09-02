import { Eyebrow } from "../Eyebrow";
import { useInView } from "../../hooks/useInView";
import { useCountUp } from "../../hooks/useCountUp";
import { PERFORMANCE } from "../../data/content";
import type { PerformanceStat } from "../../types";

function StatCell({ stat, active }: { stat: PerformanceStat; active: boolean }) {
  const value = useCountUp(stat.value, active, 1400, stat.decimals ?? 0);

  return (
    <div className="border-t border-hairline py-8 first:border-t-0 sm:border-t-0 sm:border-l sm:py-0 sm:pl-8 sm:first:border-l-0 sm:first:pl-0">
      <p className="text-[11px] uppercase tracking-[0.15em] text-muted">
        {stat.label}
      </p>
      <p className="mt-3 font-display text-4xl font-semibold text-ivory sm:text-5xl">
        {stat.prefix}
        {value}
        <span className="ml-1 text-lg text-amber sm:text-xl">{stat.suffix}</span>
      </p>
    </div>
  );
}

export function Performance() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);

  return (
    <section
      id="performance"
      className="bg-graphite-900 px-6 py-24 sm:px-10 sm:py-32 lg:px-16"
    >
      <Eyebrow>Performance</Eyebrow>
      <h2 className="mt-6 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ivory sm:text-5xl">
        {PERFORMANCE.title}
      </h2>

      <div
        ref={ref}
        className="mt-16 grid grid-cols-1 gap-y-10 sm:mt-24 sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-4"
      >
        {PERFORMANCE.stats.map((stat) => (
          <StatCell key={stat.label} stat={stat} active={inView} />
        ))}
      </div>
    </section>
  );
}
