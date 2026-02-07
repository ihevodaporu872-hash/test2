import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { ServiceCard } from "@/components/shared/service-card";
import { FAQAccordion } from "@/components/sections/faq-accordion";
import { CTASection } from "@/components/sections/cta-section";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { services } from "@/data/services";
import { faqItems } from "../../../content/faq/index";
import { Button } from "@/components/ui/button";
import {
  Check,
  FileText,
  Palette,
  Lightbulb,
  Ruler,
  Sofa,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Услуги дизайна интерьера — от концепции до авторского надзора",
  description:
    "Полный спектр услуг дизайна интерьера в Москве: планировочные решения, 3D-визуализации, рабочие чертежи, авторский надзор. Проектируем для жизни, а не для инстаграма.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Услуги дизайна интерьера | INTERIOR STUDIO",
    description:
      "От концепции и планировки до полного цикла под ключ с авторским надзором.",
    images: ["/images/photo_2.jpg"],
  },
};

const servicesFaq = faqItems.filter(
  (item) => item.category === "scope" || item.category === "general"
).slice(0, 5);

const whatsIncluded = [
  {
    icon: Ruler,
    title: "Планировочные решения",
    description: "2-3 варианта расстановки мебели и зонирования пространства",
  },
  {
    icon: Palette,
    title: "Концепция стиля",
    description: "Мудборд, цветовая палитра, подбор материалов и фактур",
  },
  {
    icon: Lightbulb,
    title: "3D-визуализации",
    description: "Фотореалистичные рендеры ключевых зон вашего интерьера",
  },
  {
    icon: FileText,
    title: "Рабочие чертежи",
    description:
      "Полный комплект документации: от развёрток стен до схем электрики",
  },
  {
    icon: Sofa,
    title: "Спецификации",
    description:
      "Ведомости мебели, отделочных материалов и оборудования с артикулами",
  },
  {
    icon: Zap,
    title: "Авторский надзор",
    description:
      "Контроль реализации на объекте, чтобы результат совпал с проектом",
  },
];

export default function ServicesPage() {
  return (
    <>
      <ServiceJsonLd
        services={[
          { name: "Дизайн жилых интерьеров", description: "Полный дизайн-проект квартиры или дома: планировка, 3D-визуализация, рабочие чертежи, спецификации материалов и мебели." },
          { name: "Дизайн коммерческих пространств", description: "Интерьеры для ресторанов, магазинов, отелей и офисов с учётом бренда и бизнес-задач." },
          { name: "Дизайн-консультация", description: "Экспертная оценка, стилевое направление, рекомендации по планировке и материалам." },
          { name: "Авторский надзор", description: "Контроль реализации проекта на строительной площадке. Совпадение с визуализацией 95%+." },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", href: "/" },
          { name: "Услуги", href: "/services" },
        ]}
      />
      <Header />
      <main className="min-h-screen">
        {/* Page Header */}
        <PageHeader
          title="Наши услуги"
          description="Проектируем интерьеры для жизни — с инженерной точностью и вниманием к каждой детали"
          backgroundImage="/images/photo_2.jpg"
        />

        {/* Services Grid */}
        <Section id="services-grid">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Направления работы
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              От частных квартир до коммерческих пространств — подходим к каждому
              проекту с одинаковой тщательностью
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </Section>

        {/* What's Included */}
        <Section className="bg-muted/30">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Что вы получаете
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Каждый проект — это не просто картинка, а полноценный комплект
              документов для реализации
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {whatsIncluded.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex gap-4">
                  <div className="shrink-0">
                    <div className="inline-flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* "We don't..." Section */}
        <Section>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                Наш подход
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-foreground">
                  Мы проектируем для жизни
                </h3>
                <ul className="space-y-3">
                  {[
                    "Каждая розетка продумана под ваш быт",
                    "Материалы подбираем под реальные условия эксплуатации",
                    "Чертежи настолько детальны, что строители строят без вопросов",
                    "Стиль подчинен функции, а не наоборот",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="size-4 text-green-600 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-foreground">
                  Мы не рисуем картинки ради картинок
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Красивый рендер без рабочих чертежей — это иллюзия. Мы не
                  делаем проекты &laquo;для инстаграма&raquo;, которые невозможно
                  построить. Каждая визуализация подкреплена техническими
                  решениями — конструктив, электрика, вентиляция, сантехника.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Наш результат — не альбом картинок, а полноценный инструмент
                  для строителей. Именно поэтому реализация совпадает с проектом.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* FAQ about services */}
        <FAQAccordion
          title="Вопросы об услугах"
          description="Что входит в проект, а что нет — разбираемся в деталях"
          items={servicesFaq}
          className="bg-muted/30"
        />

        {/* CTA */}
        <CTASection
          title="Узнать стоимость"
          description="Посмотрите наши пакеты с прозрачными ценами и понятными условиями"
          buttonLabel="Смотреть пакеты"
          buttonHref="/pricing"
          variant="dark"
        />
      </main>
      <Footer />
    </>
  );
}
