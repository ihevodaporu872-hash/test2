import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { USPStrip } from "@/components/sections/usp-strip";
import { ProjectsGallery } from "@/components/sections/projects-gallery";
import { PackagesGrid } from "@/components/sections/packages-grid";
import { ProcessPreview } from "@/components/sections/process-preview";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";
import { FAQAccordion } from "@/components/sections/faq-accordion";
import { CTASection } from "@/components/sections/cta-section";
import { featuredProjects } from "@/data/projects";
import { testimonials } from "@/data/testimonials";
import { b2cPackages } from "../../content/packages/b2c";
import { faqItems } from "../../content/faq/index";

export const metadata: Metadata = {
  title: "Дизайн интерьера в Москве — студия INTERIOR STUDIO",
  description:
    "Студия дизайна интерьера в Москве. От планировки до последнего выключателя — полный комплект рабочей документации (80-150 листов), по которой строители строят без вопросов.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Дизайн интерьера в Москве — студия INTERIOR STUDIO",
    description:
      "Проектируем интерьеры с инженерной точностью. 5 этапов, 3 контрольные точки, 0 сюрпризов.",
    images: ["/images/photo_main.jpg"],
  },
};

const uspItems = [
  {
    icon: "shield",
    title: "Полный комплект чертежей",
    description:
      "Рабочая документация, по которой строители строят без вопросов",
  },
  {
    icon: "award",
    title: "Инженерная точность",
    description: "Каждый размер выверен, каждая розетка на своем месте",
  },
  {
    icon: "sparkles",
    title: "3D до начала ремонта",
    description: "Увидите результат еще до первого удара молотком",
  },
  {
    icon: "users",
    title: "Авторский надзор",
    description: "Контролируем, чтобы результат совпал с проектом на 95%+",
  },
  {
    icon: "clock",
    title: "Понятные сроки",
    description: "Фиксируем дедлайны в договоре и придерживаемся их",
  },
];

const packagesForHomepage = b2cPackages.map((pkg) => ({
  id: pkg.id,
  title: pkg.title,
  subtitle: pkg.subtitle,
  price: pkg.price,
  priceNote: pkg.priceNote,
  duration: pkg.duration,
  includes: pkg.includes.slice(0, 4),
  excludes: [],
  cta: pkg.cta,
  featured: pkg.featured,
  countsTowardFullProject: pkg.countsTowardFullProject,
}));

const topFaqs = faqItems.slice(0, 5);

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* 1. Hero */}
        <Hero
          title="Проектируем интерьеры с инженерной точностью"
          subtitle="От планировки до последнего выключателя — полный комплект рабочей документации, по которой строители строят без вопросов"
          backgroundImage="/images/photo_main.jpg"
          primaryCta={{ label: "Обсудить проект", href: "/contact" }}
          secondaryCta={{ label: "Смотреть работы", href: "/portfolio" }}
          trustHints={[
            "5 этапов",
            "3 контрольные точки",
            "0 сюрпризов",
          ]}
        />

        {/* 2. USP Strip */}
        <USPStrip items={uspItems} />

        {/* 3. Featured Projects Gallery */}
        <ProjectsGallery
          title="Избранные проекты"
          description="Каждый проект — это история о пространстве, людях и деталях"
          projects={featuredProjects}
        />

        {/* 4. Packages Overview */}
        <PackagesGrid
          title="Пакеты услуг"
          description="Выберите подходящий формат работы — от легкого первого шага до полного цикла под ключ"
          packages={packagesForHomepage}
          ctaHref="/pricing"
          className="bg-muted/30"
        />

        {/* 5. Process Preview */}
        <ProcessPreview />

        {/* 6. Testimonials Carousel */}
        <TestimonialsCarousel
          title="Отзывы клиентов"
          description="Что говорят те, кто уже доверил нам свое пространство"
          testimonials={testimonials}
          className="bg-muted/30"
        />

        {/* 7. FAQ Preview */}
        <FAQAccordion
          title="Частые вопросы"
          description="Ответы на самые популярные вопросы о наших услугах"
          items={topFaqs}
        />

        {/* 8. CTA Section */}
        <CTASection
          title="Готовы начать проект?"
          description="Расскажите о вашем пространстве, и мы предложим оптимальный формат работы. Первая консультация — бесплатно."
          buttonLabel="Обсудить проект"
          buttonHref="/contact"
          variant="dark"
        />
      </main>
      <Footer />
    </>
  );
}
