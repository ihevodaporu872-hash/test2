import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Пользовательское соглашение | Interior Studio",
  description:
    "Пользовательское соглашение Interior Studio. Условия использования сайта и услуг.",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <h1 className="font-heading text-4xl font-bold mb-8">
            Пользовательское соглашение
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
