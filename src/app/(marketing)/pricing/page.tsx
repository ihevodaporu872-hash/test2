import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { PackagesGrid } from "@/components/sections/packages-grid";
import { FAQAccordion } from "@/components/sections/faq-accordion";
import { CTASection } from "@/components/sections/cta-section";
import { b2cPackages } from "../../../../content/packages/b2c";
import { faqItems } from "../../../../content/faq/index";
import {
  AreaChart,
  Layers,
  Clock,
  CreditCard,
  ArrowDownUp,
  Check,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Стоимость дизайна интерьера — пакеты от 45 000 руб.",
  description:
    "Прозрачные цены на дизайн интерьера: концепция от 45 000 руб., полный проект от 120 000 руб., полный цикл от 250 000 руб. Поэтапная оплата, фиксированные сроки.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Стоимость услуг | INTERIOR STUDIO",
    description:
      "Пакеты дизайн-услуг с прозрачным ценообразованием. От концепции до полного цикла под ключ.",
    images: ["/images/photo_4.jpg"],
  },
};

const pricingFaq = faqItems.filter((item) => item.category === "pricing");

const fullPackages = b2cPackages.map((pkg) => ({
  id: pkg.id,
  title: pkg.title,
  subtitle: pkg.subtitle,
  price: pkg.price,
  priceNote: pkg.priceNote,
  duration: pkg.duration,
  includes: pkg.includes,
  excludes: pkg.excludes,
  cta: pkg.cta,
  featured: pkg.featured,
  countsTowardFullProject: pkg.countsTowardFullProject,
}));

const costFactors = [
  {
    icon: AreaChart,
    title: "Площадь помещения",
    description:
      "Чем больше площадь, тем больше чертежей, визуализаций и спецификаций. Стоимость рассчитывается пропорционально.",
  },
  {
    icon: Layers,
    title: "Сложность проекта",
    description:
      "Нестандартные планировки, сложные конструктивные решения, перепланировки требуют больше инженерной проработки.",
  },
  {
    icon: Clock,
    title: "Сроки выполнения",
    description:
      "Ускоренные сроки возможны, но требуют выделения дополнительных ресурсов команды.",
  },
  {
    icon: ArrowDownUp,
    title: "Объем визуализаций",
    description:
      "Базовые пакеты включают визуализации ключевых зон. Дополнительные ракурсы — по запросу.",
  },
];

const paymentSteps = [
  {
    step: "Этап 1",
    title: "Предоплата 50%",
    description: "При подписании договора. Начинаем работу над планировочным решением и концепцией.",
  },
  {
    step: "Этап 2",
    title: "Оплата 50%",
    description: "По завершении проекта. Получаете полный комплект документации.",
  },
  {
    step: "Полный цикл",
    title: "Помесячная оплата",
    description: "Для пакета «Полный цикл» — ежемесячные платежи по этапам работ.",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Page Header */}
      <PageHeader
        title="Стоимость услуг"
        description="Прозрачное ценообразование — вы точно знаете, за что платите и что получаете"
        backgroundImage="/images/photo_4.jpg"
      />

      {/* Full Packages Grid */}
      <PackagesGrid
        title="Пакеты услуг"
        description="Каждый пакет — это четкий набор результатов с фиксированными сроками"
        packages={fullPackages}
        ctaHref="/contact"
      />

      {/* Comparison overview */}
      <Section className="bg-muted/30">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Сравнение пакетов
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Что входит в каждый пакет — наглядно и по существу
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 pr-4 font-semibold text-foreground">
                  Услуга
                </th>
                {b2cPackages.map((pkg) => (
                  <th
                    key={pkg.id}
                    className="text-center py-4 px-3 font-semibold text-foreground"
                  >
                    <span className="block">{pkg.title}</span>
                    <span className="text-xs font-normal text-muted-foreground">
                      {pkg.price}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                {
                  label: "Планировочное решение",
                  values: [true, true, false, true],
                },
                {
                  label: "Концепция стиля (мудборд)",
                  values: [true, true, false, true],
                },
                {
                  label: "Подбор материалов",
                  values: [true, true, false, true],
                },
                {
                  label: "3D-визуализации",
                  values: [false, true, false, true],
                },
                {
                  label: "Рабочие чертежи",
                  values: [false, true, false, true],
                },
                {
                  label: "Спецификации мебели",
                  values: [false, true, false, true],
                },
                {
                  label: "Схемы электрики",
                  values: [false, true, false, true],
                },
                {
                  label: "Авторский надзор",
                  values: [false, false, true, true],
                },
                {
                  label: "Комплектация и закупки",
                  values: [false, false, false, true],
                },
                {
                  label: "Стайлинг и расстановка",
                  values: [false, false, false, true],
                },
              ].map((row) => (
                <tr key={row.label} className="border-b border-border/50">
                  <td className="py-3 pr-4 text-muted-foreground">
                    {row.label}
                  </td>
                  {row.values.map((val, i) => (
                    <td key={i} className="text-center py-3 px-3">
                      {val ? (
                        <Check className="size-4 text-green-600 mx-auto" />
                      ) : (
                        <span className="text-muted-foreground/30">&mdash;</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Payment Info */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Порядок оплаты
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Работаем по договору. Оплата поэтапная — вы платите за результат
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {paymentSteps.map((item) => (
            <Card key={item.step} className="text-center">
              <CardHeader>
                <div className="inline-flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary mx-auto mb-2">
                  <CreditCard className="size-5" />
                </div>
                <span className="text-xs uppercase tracking-wider text-primary font-semibold">
                  {item.step}
                </span>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Cost Factors */}
      <Section className="bg-muted/30">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Что влияет на стоимость
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Финальная цена зависит от параметров вашего проекта
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {costFactors.map((factor) => {
            const Icon = factor.icon;
            return (
              <div key={factor.title} className="flex gap-4">
                <div className="shrink-0">
                  <div className="inline-flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {factor.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {factor.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* FAQ about pricing */}
      <FAQAccordion
        title="Вопросы о ценах"
        description="Всё, что нужно знать о стоимости и условиях оплаты"
        items={pricingFaq}
      />

      {/* CTA */}
      <CTASection
        title="Получить точный расчёт"
        description="Оставьте заявку — подготовим индивидуальное предложение с учётом площади и задач вашего проекта"
        buttonLabel="Получить расчёт"
        buttonHref="/contact"
        variant="dark"
      />
    </>
  );
}
