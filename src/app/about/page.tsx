import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "О студии — команда и философия дизайна",
  description:
    "Познакомьтесь с командой INTERIOR STUDIO. Проектируем интерьеры с инженерной точностью в Москве. Наш подход: стиль подчинён функции, каждая розетка продумана под ваш быт.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "О студии | INTERIOR STUDIO",
    description:
      "Команда и философия дизайна. Проектируем интерьеры с инженерной точностью.",
  },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", href: "/" },
          { name: "О нас", href: "/about" },
        ]}
      />
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
