import { useState } from "react";
import { BRAND, NAV_SECTIONS } from "../data/content";
import { useActiveSection } from "../hooks/useActiveSection";
import { useReducedMotion } from "../hooks/useReducedMotion";
import type { SectionId } from "../types";

interface NavProps {
  opaque: boolean;
}

export function Nav({ opaque }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection(NAV_SECTIONS.map((s) => s.id));
  const reducedMotion = useReducedMotion();

  const goTo = (id: SectionId) => {
    setMenuOpen(false);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-30 flex justify-center px-4 pt-4 sm:pt-6">
        <nav
          className={`flex w-full max-w-4xl items-center justify-between rounded-full px-4 py-2.5 transition-colors duration-500 ease-weighted sm:px-6 ${
            opaque
              ? "border border-hairline bg-graphite-950/80 backdrop-blur-xl"
              : "border border-transparent bg-transparent"
          }`}
        >
          <button
            onClick={() => goTo("hero" as SectionId)}
            className="font-display text-sm font-semibold tracking-[0.15em] text-ivory"
          >
            {BRAND.name}
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_SECTIONS.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => goTo(section.id)}
                  className="relative px-3.5 py-2 text-xs uppercase tracking-[0.12em] text-muted transition-colors duration-300 hover:text-ivory"
                >
                  {section.label}
                  <span
                    className={`absolute inset-x-3.5 -bottom-0.5 h-px bg-amber transition-opacity duration-300 ${
                      activeSection === section.id ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => goTo("experience")}
            className="hidden rounded-full bg-ivory px-4 py-1.5 text-xs font-medium text-graphite-950 transition-colors duration-300 hover:bg-amber-soft md:inline-block"
          >
            청음 예약
          </button>

          <button
            aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="relative h-8 w-8 md:hidden"
          >
            <span
              className={`absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 bg-ivory transition-transform duration-400 ease-weighted ${
                menuOpen ? "rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 bg-ivory transition-transform duration-400 ease-weighted ${
                menuOpen ? "-rotate-45" : "translate-y-1.5"
              }`}
            />
          </button>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-20 flex flex-col items-center justify-center gap-8 bg-graphite-950/95 backdrop-blur-2xl transition-opacity duration-500 ease-weighted md:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        {NAV_SECTIONS.map((section, i) => (
          <button
            key={section.id}
            onClick={() => goTo(section.id)}
            className="font-display text-2xl tracking-wide text-ivory transition-all duration-500 ease-weighted"
            style={{
              transitionDelay: menuOpen ? `${100 + i * 60}ms` : "0ms",
              transform: menuOpen ? "translateY(0)" : "translateY(24px)",
              opacity: menuOpen ? 1 : 0,
            }}
          >
            {section.label}
          </button>
        ))}
        <button
          onClick={() => goTo("experience")}
          className="mt-4 rounded-full bg-ivory px-6 py-2.5 text-sm font-medium text-graphite-950"
        >
          청음 예약
        </button>
      </div>
    </>
  );
}
