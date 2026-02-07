import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CTASection } from "@/components/sections/cta-section";
import { projects, getProjectBySlug } from "@/data/projects";
import { ProjectDetailContent } from "./project-detail-content";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Проект не найден | Interior Studio",
    };
  }

  return {
    title: `${project.title} | Interior Studio`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Interior Studio`,
      description: project.description,
      images: [project.coverImage],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <ProjectDetailContent project={project} />

        {/* CTA */}
        <CTASection
          title="Хочу так же"
          description="Расскажите о вашем проекте — мы подготовим индивидуальное предложение"
          buttonLabel="Обсудить проект"
          buttonHref="/contact"
          variant="dark"
        />
      </main>
      <Footer />
    </>
  );
}
