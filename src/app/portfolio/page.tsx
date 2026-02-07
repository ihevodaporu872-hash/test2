import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Портфолио | Interior Studio",
  description:
    "Наши лучшие проекты дизайна интерьера: жилые, коммерческие и общественные пространства.",
};

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div>
          <h1>Портфолио</h1>
        </div>
      </main>
      <Footer />
    </>
  );
}
