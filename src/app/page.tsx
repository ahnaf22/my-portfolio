import { Shell } from "@/components/Shell";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Band } from "@/components/Band";
import { About } from "@/components/About";
import { Work } from "@/components/Work";
import { Experience } from "@/components/Experience";
import { Stack } from "@/components/Stack";
import { Terminal } from "@/components/Terminal";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <Shell>
      <Nav />
      <main>
        <Hero />
        <Band />
        <About />
        <Work />
        <Experience />
        <Stack />
        <Terminal />
      </main>
      <Contact />
    </Shell>
  );
}
