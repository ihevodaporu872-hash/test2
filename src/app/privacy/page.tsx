import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Политика конфиденциальности | Interior Studio",
  description:
    "Политика конфиденциальности Interior Studio. Узнайте, как мы обрабатываем и защищаем ваши данные.",
};

export default function PrivacyPage() {
  return (
    <>
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
