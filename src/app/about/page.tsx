import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "О нас | Interior Studio",
  description:
    "Познакомьтесь с командой Interior Studio и узнайте о нашей философии дизайна.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div>
          <h1>О нас</h1>
        </div>
      </main>
      <Footer />
    </>
  );
}
