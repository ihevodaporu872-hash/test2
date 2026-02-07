import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
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
      <main id="main-content" className="min-h-screen">
        <PageHeader
          title="О студии"
          description="Создаём интерьеры, которые работают. Инженерный подход к каждому проекту."
          backgroundImage="/images/photo_3.jpg"
        />
        <section className="py-20 md:py-32">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8">
              Наша философия
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Мы проектируем интерьеры с инженерной точностью. Каждый размер выверен, каждая розетка на своем месте. Стиль подчинён функции, а не наоборот.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Наш результат — не альбом картинок, а полноценный инструмент для строителей. Именно поэтому реализация совпадает с проектом на 95%+.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
