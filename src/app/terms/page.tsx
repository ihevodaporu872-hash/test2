import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Пользовательское соглашение",
  description:
    "Пользовательское соглашение INTERIOR STUDIO. Условия использования сайта и предоставления услуг дизайна интерьера.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", href: "/" },
          { name: "Пользовательское соглашение", href: "/terms" },
        ]}
      />
      <Header />
      <main id="main-content" className="min-h-screen">
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
