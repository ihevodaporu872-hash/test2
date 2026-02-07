import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
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
      <main className="min-h-screen">
        <div>
          <h1>FAQ</h1>
        </div>
      </main>
      <Footer />
    </>
  );
}
