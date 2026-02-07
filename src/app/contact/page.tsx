import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Контакты | Interior Studio",
  description:
    "Свяжитесь с Interior Studio для обсуждения вашего проекта интерьера.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div>
          <h1>Контакты</h1>
        </div>
      </main>
      <Footer />
    </>
  );
}
