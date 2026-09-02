import { Nav } from "./components/Nav";
import { Hero } from "./components/sections/Hero";
import { TheMachine } from "./components/sections/TheMachine";
import { Performance } from "./components/sections/Performance";
import { TheForm } from "./components/sections/TheForm";
import { TheSource } from "./components/sections/TheSource";
import { ExperienceSable } from "./components/sections/ExperienceSable";
import { Footer } from "./components/sections/Footer";
import { useSentinelPassed } from "./hooks/useSentinelPassed";

export default function App() {
  const { ref: heroEndRef, passed: pastHero } = useSentinelPassed<HTMLDivElement>();

  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      <Nav opaque={pastHero} />
      <main>
        <Hero />
        <div ref={heroEndRef} />
        <TheMachine />
        <Performance />
        <TheForm />
        <TheSource />
        <ExperienceSable />
      </main>
      <Footer />
    </>
  );
}
