import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Услуги | Interior Studio",
  description:
    "Полный спектр услуг дизайна интерьера: от консультации до реализации под ключ.",
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div>
          <h1>Услуги</h1>
        </div>
      </main>
      <Footer />
    </>
  );
}
