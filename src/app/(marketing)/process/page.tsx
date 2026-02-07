import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { FAQAccordion } from "@/components/sections/faq-accordion";
import { CTASection } from "@/components/sections/cta-section";
import { faqItems } from "../../../../content/faq/index";
import { AlertCircle, Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Как мы работаем | Interior Studio",
  description:
    "Прозрачный процесс работы: от первой встречи до готового интерьера. Этапы, сроки и что вы получаете на каждом шаге.",
};

const processFaq = faqItems.filter((item) => item.category === "process");

const processSteps = [
  {
    number: 1,
    title: "Знакомство и бриф",
    description:
      "Встречаемся на объекте или онлайн. Обсуждаем ваши пожелания, образ жизни, бюджет и сроки. Проводим замеры помещения. Составляем техническое задание — основу будущего проекта.",
    duration: "1-2 дня",
  },
  {
    number: 2,
    title: "Концепция и планировка",
    description:
      "Разрабатываем 2-3 варианта планировочных решений. Создаем мудборд и концепцию стиля. Подбираем палитру материалов и цветов. Согласовываем направление с вами.",
    duration: "2-3 недели",
  },
  {
    number: 3,
    title: "Дизайн-проект",
    description:
      "Создаем фотореалистичные 3D-визуализации ключевых зон. Разрабатываем полный комплект рабочих чертежей: планы, развёртки, схемы электрики, освещения, сантехники. Составляем ведомости материалов и спецификации мебели.",
    duration: "4-6 недель",
  },
  {
    number: 4,
    title: "Согласование и правки",
    description:
      "Презентуем проект целиком. Обсуждаем каждую деталь. Вносим корректировки в рамках включённых раундов правок. Финализируем все документы и передаём вам полный комплект.",
    duration: "1-2 недели",
  },
  {
    number: 5,
    title: "Авторский надзор",
    description:
      "Регулярные выезды на объект (2-4 в месяц). Контролируем соответствие работ чертежам. Оперативно решаем вопросы с подрядчиками. Фиксируем этапы фотоотчётами. Добиваемся результата, совпадающего с проектом.",
    duration: "Весь период ремонта",
  },
];

const boundaries = [
  {
    title: "Что входит в раунд правок",
    items: [
      "Изменение расстановки мебели в рамках утверждённой планировки",
      "Корректировка цветов и материалов",
      "Уточнение размещения электроточек",
      "Замена отдельных позиций в спецификации",
    ],
  },
  {
    title: "Что считается дополнительной работой",
    items: [
      "Полная смена концепции стиля после утверждения",
      "Изменение планировочного решения на этапе чертежей",
      "Проектирование дополнительных помещений",
      "Правки сверх включённых раундов",
    ],
  },
];

export default function ProcessPage() {
  return (
    <>
      {/* Page Header */}
      <PageHeader
        title="Как мы работаем"
        description="Прозрачный процесс с понятными этапами — вы всегда знаете, что происходит и что будет дальше"
        backgroundImage="/images/photo_6.jpg"
      />

      {/* Process Timeline */}
      <ProcessTimeline
        title="Этапы работы"
        description="От первой встречи до готового интерьера — каждый этап имеет чёткий результат и сроки"
        steps={processSteps}
      />

      {/* Boundaries Section */}
      <Section className="bg-muted/30">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Правки и доработки
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Чтобы процесс был прозрачным, мы заранее определяем, что входит в
            проект, а что выходит за его рамки
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {boundaries.map((section) => (
            <Card key={section.title}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  {section.title.includes("входит") ? (
                    <Check className="size-5 text-green-600" />
                  ) : (
                    <AlertCircle className="size-5 text-amber-500" />
                  )}
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="mt-1.5 size-1.5 rounded-full bg-muted-foreground/40 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="max-w-4xl mx-auto mt-8">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground leading-relaxed text-center">
                <strong className="text-foreground">Важно:</strong> все
                дополнительные работы согласовываются заранее и оцениваются
                отдельно. Мы никогда не выставляем счета без предварительного
                обсуждения. Прозрачность — основа наших отношений с клиентами.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* FAQ about process */}
      <FAQAccordion
        title="Вопросы о процессе"
        description="Как проходит работа, какие сроки и что ожидать на каждом этапе"
        items={processFaq}
      />

      {/* CTA */}
      <CTASection
        title="Начать проект"
        description="Первый шаг — это разговор. Расскажите о вашем пространстве, и мы предложим оптимальный план действий."
        buttonLabel="Начать проект"
        buttonHref="/contact"
        variant="dark"
      />
    </>
  );
}
