import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { FAQAccordion } from "@/components/sections/faq-accordion";
import { CTASection } from "@/components/sections/cta-section";
import { FAQJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { faqItems } from "../../../content/faq/index";

export const metadata: Metadata = {
  title: "Частые вопросы — цены, сроки, процесс работы",
  description:
    "Ответы на популярные вопросы о дизайне интерьера: стоимость от 45 000 руб., сроки 2-10 недель, поэтапная оплата, 2-3 раунда правок включены. Всё прозрачно и без сюрпризов.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "FAQ | INTERIOR STUDIO",
    description:
      "Часто задаваемые вопросы о дизайне интерьера: цены, сроки, процесс и правки.",
  },
};

export default function FaqPage() {
  return (
    <>
      <FAQJsonLd items={faqItems} />
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", href: "/" },
          { name: "FAQ", href: "/faq" },
        ]}
      />
      <Header />
      <main id="main-content" className="min-h-screen">
        <PageHeader
          title="Частые вопросы"
          description="Ответы на популярные вопросы о дизайне интерьера, ценах, сроках и процессе работы"
        />
        <FAQAccordion
          title="Все вопросы"
          items={faqItems}
        />
        <CTASection
          title="Не нашли ответ?"
          description="Свяжитесь с нами — ответим на любой вопрос о дизайне интерьера"
          buttonLabel="Задать вопрос"
          buttonHref="/contact"
          variant="dark"
        />
      </main>
      <Footer />
    </>
  );
}
