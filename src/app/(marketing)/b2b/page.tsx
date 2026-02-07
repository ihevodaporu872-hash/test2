import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  TrendingUp,
  ShieldCheck,
  Users,
  AlertTriangle,
  Check,
  ArrowRight,
} from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { CTASection } from "@/components/sections/cta-section";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { b2bPackages } from "../../../../content/packages/b2b";

export const metadata: Metadata = {
  title: "Дизайн для бизнеса — МОП, паркинги, планировочный аудит",
  description:
    "B2B дизайн-решения для застройщиков и управляющих компаний: дизайн МОП, навигация паркинга, планировочный аудит. Повышаем стоимость объекта на 10-15%. Пилотный проект от 25 000 руб.",
  alternates: {
    canonical: "/b2b",
  },
  openGraph: {
    title: "Дизайн для бизнеса | INTERIOR STUDIO",
    description:
      "Дизайн-решения для застройщиков и управляющих компаний. МОП, паркинги, планировочный аудит.",
    images: ["/images/photo_8.jpg"],
  },
};

const problems = [
  {
    icon: AlertTriangle,
    title: "Устаревшие МОП",
    description:
      "Входные группы, лобби и коридоры выглядят как после ремонта 2005 года. Жители не чувствуют ценности.",
  },
  {
    icon: AlertTriangle,
    title: "Запутанный паркинг",
    description:
      "Темный, запутанный паркинг с плохой навигацией. Жалобы жильцов, аварии, ощущение небезопасности.",
  },
  {
    icon: AlertTriangle,
    title: "Неэффективные планировки",
    description:
      'Планировки квартир "из коробки" не продаются. Покупатели не видят потенциал, конкуренты уходят вперёд.',
  },
];

const results = [
  {
    icon: TrendingUp,
    title: "Рост стоимости объекта",
    description:
      "Современные МОП и паркинг повышают стоимость аренды и продажи на 10-15%.",
  },
  {
    icon: ShieldCheck,
    title: "Снижение жалоб",
    description:
      "Продуманная навигация и качественные материалы снижают количество обращений и инцидентов.",
  },
  {
    icon: Users,
    title: "Лояльность жителей",
    description:
      "Комфортные общие пространства формируют лояльность, снижают текучку арендаторов.",
  },
  {
    icon: Building2,
    title: "Конкурентное преимущество",
    description:
      "Выделяйтесь на рынке качеством общих пространств, а не только квадратными метрами.",
  },
];

const slugMap: Record<string, string> = {
  mop: "mop",
  parking: "parking",
  "planning-audit": "planning-audit",
};

export default function B2BPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", href: "/" },
          { name: "B2B", href: "/b2b" },
        ]}
      />
      {/* Page Header */}
      <PageHeader
        title="Дизайн для бизнеса"
        description="Повышаем стоимость вашего объекта через продуманный дизайн общих пространств"
        backgroundImage="/images/photo_8.jpg"
      />

      {/* Problem Section */}
      <Section>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            С чем сталкиваются застройщики и УК
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Типичные проблемы, которые снижают стоимость объекта и вызывают
            недовольство жителей
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {problems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="text-center">
                <div className="inline-flex items-center justify-center size-14 rounded-full bg-destructive/10 text-destructive mb-4">
                  <Icon className="size-6" />
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* B2B Packages */}
      <Section className="bg-muted/30">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            Наши B2B-решения
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Три продукта, закрывающих ключевые потребности застройщиков и
            управляющих компаний
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {b2bPackages.map((pkg) => (
            <Card
              key={pkg.id}
              className="h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <CardHeader>
                <CardTitle className="text-xl">{pkg.title}</CardTitle>
                <CardDescription>{pkg.subtitle}</CardDescription>
                <div className="pt-2">
                  <span className="text-2xl font-bold text-foreground">
                    {pkg.price}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Срок: {pkg.duration}
                </p>
              </CardHeader>

              <CardContent className="flex-1">
                <ul className="space-y-2">
                  {pkg.includes.slice(0, 4).map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="size-4 text-green-600 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                  {pkg.includes.length > 4 && (
                    <li className="text-sm text-muted-foreground/60 pl-6">
                      + ещё {pkg.includes.length - 4} пунктов
                    </li>
                  )}
                </ul>
                {pkg.pilotAvailable && (
                  <Badge
                    variant="secondary"
                    className="mt-4 text-xs"
                  >
                    Пилот: {pkg.pilotPrice}
                  </Badge>
                )}
              </CardContent>

              <CardFooter className="flex flex-col gap-2">
                <Button asChild className="w-full">
                  <Link href={`/contact?type=b2b&product=${pkg.id}`}>
                    {pkg.cta}
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="sm" className="w-full">
                  <Link href={`/b2b/${slugMap[pkg.id] || pkg.id}`}>
                    Подробнее <ArrowRight className="size-4 ml-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Section>

      {/* Pilot Offer */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="default" className="mb-4">
            Пилотная программа
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
            Попробуйте без рисков
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Для каждого продукта доступна пилотная версия с сокращённым объёмом и
            бюджетом. Вы оцениваете качество работы на небольшом участке, прежде
            чем масштабировать на весь объект. Если результат устраивает --
            стоимость пилота засчитывается в полный проект.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {b2bPackages
              .filter((pkg) => pkg.pilotAvailable)
              .map((pkg) => (
                <div
                  key={pkg.id}
                  className="p-4 rounded-lg border border-border bg-background"
                >
                  <p className="font-semibold text-foreground">{pkg.title}</p>
                  <p className="text-primary font-bold text-lg mt-1">
                    {pkg.pilotPrice}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {pkg.pilotDuration}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </Section>

      {/* Results */}
      <Section className="bg-muted/30">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            Что получают наши клиенты
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Измеримые результаты, которые влияют на бизнес-показатели объекта
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {results.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex gap-4">
                <div className="shrink-0">
                  <div className="inline-flex items-center justify-center size-12 rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-1">
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

      {/* CTA */}
      <CTASection
        title="Запросить коммерческое предложение"
        description="Оставьте заявку — подготовим КП с учётом специфики вашего объекта"
        buttonLabel="Запросить КП"
        buttonHref="/contact?type=b2b"
        variant="dark"
      />
    </>
  );
}
