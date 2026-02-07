import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description:
    "Политика конфиденциальности INTERIOR STUDIO. Узнайте, как мы обрабатываем и защищаем ваши персональные данные в соответствии с 152-ФЗ.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", href: "/" },
          { name: "Политика конфиденциальности", href: "/privacy" },
        ]}
      />
      <Header />
      <main className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <h1 className="font-heading text-4xl font-bold mb-8">
            Политика конфиденциальности
          </h1>
          <p className="text-muted-foreground">
            Страница в разработке.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
