import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { LeadForm } from "@/components/sections/lead-form";
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
      <main id="main-content" className="min-h-screen">
        <PageHeader
          title="Контакты"
          description="Обсудите ваш проект с дизайнером. Первая консультация бесплатно."
        />
        <LeadForm
          title="Обсудить проект"
          description="Оставьте заявку — мы свяжемся с вами в течение рабочего дня"
          sourcePage="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
