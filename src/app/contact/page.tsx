import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Контакты — обсудите ваш проект с дизайнером",
  description:
    "Свяжитесь с INTERIOR STUDIO для обсуждения вашего проекта. Первая консультация бесплатно. Ответим в течение 24 часов. Москва и вся Россия.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Контакты | INTERIOR STUDIO",
    description:
      "Обсудите ваш проект дизайна интерьера. Первая консультация бесплатно.",
  },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", href: "/" },
          { name: "Контакты", href: "/contact" },
        ]}
      />
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
