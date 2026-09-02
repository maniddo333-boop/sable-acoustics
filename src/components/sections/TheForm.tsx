import { Eyebrow } from "../Eyebrow";
import { ScrollReveal } from "../ScrollReveal";
import { LazyBackgroundVideo } from "../LazyBackgroundVideo";
import { THE_FORM, FORM_FILM } from "../../data/content";

export function TheForm() {
  return (
    <section
      id="the-form"
      className="bg-graphite-950 px-6 py-24 sm:px-10 sm:py-32 lg:px-16"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-8">
        <LazyBackgroundVideo
          spec={FORM_FILM}
          className="aspect-[4/3] w-full rounded-[2rem] lg:col-span-3 lg:aspect-auto"
        />

        <div className="flex flex-col justify-center lg:col-span-2">
          <ScrollReveal>
            <Eyebrow>Design</Eyebrow>
            <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-ivory sm:text-5xl">
              {THE_FORM.title}
            </h2>
            <p className="mt-6 whitespace-pre-line text-sm leading-relaxed text-muted sm:text-base">
              {THE_FORM.body}
            </p>
          </ScrollReveal>

          <ul className="mt-12 space-y-6">
            {THE_FORM.features.map((feature, i) => (
              <li key={feature.label}>
                <ScrollReveal delayMs={i * 100}>
                  <div className="flex items-start gap-4 border-t border-hairline pt-5">
                    <span className="font-mono-data text-xs text-amber">
                      0{i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-ivory">
                        {feature.label}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-muted">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
