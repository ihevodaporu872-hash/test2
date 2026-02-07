import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { ProjectsGallery } from "@/components/sections/projects-gallery";
import { CTASection } from "@/components/sections/cta-section";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Наши проекты | Interior Studio",
  description:
    "Портфолио дизайн-студии: жилые, коммерческие и общественные пространства. Смотрите наши лучшие реализованные проекты дизайна интерьера.",
  openGraph: {
    title: "Портфолио | Interior Studio",
    description:
      "Смотрите наши лучшие реализованные проекты дизайна интерьера.",
    images: ["/images/photo_5.jpg"],
  },
};

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
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
