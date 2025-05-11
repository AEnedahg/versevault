import Hero from "@/_components/Hero";
import SectionFour from "@/_components/SectionFour";
import SectionThree from "@/_components/SectionThree";
import SectionTwo from "@/_components/SectionTwo";

export default function Home() {
  return (
    <main className="mx-auto max-w-[1440px]">
      <Hero />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      
    </main>
  );
}
