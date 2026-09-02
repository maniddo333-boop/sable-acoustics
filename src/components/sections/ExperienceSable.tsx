import { useState } from "react";
import { Button } from "../Button";
import { ScrollReveal } from "../ScrollReveal";
import { ReservationForm } from "../ReservationForm";
import { EXPERIENCE } from "../../data/content";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export function ExperienceSable() {
  const [formOpen, setFormOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="experience"
      className="bg-graphite-950 px-6 py-24 text-center sm:px-10 sm:py-40"
    >
      <ScrollReveal className="mx-auto max-w-2xl">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ivory sm:text-5xl">
          {EXPERIENCE.headline}
        </h2>
        <div className="mt-10 flex justify-center">
          <Button
            variant="primary"
            onClick={() => setFormOpen((v) => !v)}
            aria-expanded={formOpen}
          >
            {EXPERIENCE.cta}
          </Button>
        </div>
      </ScrollReveal>

      <div
        className={`mx-auto mt-12 grid max-w-xl text-left transition-[grid-template-rows,opacity] ${
          reducedMotion ? "" : "duration-700 ease-weighted"
        } ${formOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <ReservationForm />
        </div>
      </div>
    </section>
  );
}
