import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { ProjectsGallery } from "@/components/sections/projects-gallery";
import { CTASection } from "@/components/sections/cta-section";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Портфолио — реализованные проекты дизайна интерьера",
  description:
    "Портфолио дизайн-студии INTERIOR STUDIO: квартиры, загородные дома, коммерческие и общественные пространства. Каждый проект — от 80 листов рабочей документации до авторского надзора.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Портфолио | INTERIOR STUDIO",
    description:
      "Жилые, коммерческие и общественные пространства. Смотрите наши лучшие реализованные проекты.",
    images: ["/images/photo_5.jpg"],
  },
};

export default function PortfolioPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", href: "/" },
          { name: "Портфолио", href: "/portfolio" },
        ]}
      />
      <Header />
      <main id="main-content" className="min-h-screen">
        {/* Page Header */}
        <PageHeader
          title="Наши проекты"
          description="Каждый проект — это история, рассказанная через пространство, материалы и свет"
          backgroundImage="/images/photo_5.jpg"
        />

        {/* Projects Gallery */}
        <ProjectsGallery
          title="Портфолио"
          description="Жилые, коммерческие и общественные пространства, спроектированные нашей командой"
          projects={projects}
        />

        {/* CTA */}
        <CTASection
          title="Обсудить ваш проект"
          description="Расскажите о вашем пространстве — мы предложим решение, которое работает"
          buttonLabel="Связаться с нами"
          buttonHref="/contact"
          variant="dark"
        />
      </main>
      <Footer />
    </>
  );
}
