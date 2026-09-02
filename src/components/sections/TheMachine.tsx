import { Eyebrow } from "../Eyebrow";
import { ScrollReveal } from "../ScrollReveal";
import { THE_MACHINE } from "../../data/content";

export function TheMachine() {
  return (
    <section
      id="the-machine"
      className="bg-graphite-950 px-6 py-24 sm:px-10 sm:py-32 lg:px-16"
    >
      <ScrollReveal>
        <Eyebrow>Engineering</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-display text-3xl font-semibold tracking-tight text-ivory sm:text-5xl">
          {THE_MACHINE.title}
        </h2>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
          {THE_MACHINE.subtitle}
        </p>
      </ScrollReveal>

      <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-[2rem] border border-hairline bg-hairline sm:mt-24 lg:grid-cols-3">
        {THE_MACHINE.items.map((item, i) => (
          <ScrollReveal key={item.name} delayMs={i * 120}>
            <div className="flex h-full flex-col justify-between bg-graphite-900 p-8 sm:p-10">
              <div>
                <p className="font-mono-data text-xs uppercase tracking-[0.2em] text-amber">
                  0{i + 1}
                </p>
                <h3 className="mt-4 font-display text-4xl font-semibold text-ivory sm:text-5xl">
                  {item.name}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>

              <dl className="mt-10 space-y-3 border-t border-hairline pt-6">
                {item.specs.map((spec) => (
                  <div key={spec.label} className="flex items-baseline justify-between gap-4">
                    <dt className="text-[11px] uppercase tracking-[0.15em] text-muted">
                      {spec.label}
                    </dt>
                    <dd className="text-right font-mono-data text-xs text-ivory">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
