import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CTASection } from "@/components/sections/cta-section";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
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
      title: "Проект не найден",
    };
  }

  const shortDescription = project.description.length > 160
    ? project.description.substring(0, 157) + "..."
    : project.description;

  return {
    title: `${project.title} — ${project.area}, ${project.location}`,
    description: shortDescription,
    alternates: {
      canonical: `/portfolio/${slug}`,
    },
    openGraph: {
      title: `${project.title} | INTERIOR STUDIO`,
      description: shortDescription,
      images: [
        {
          url: project.coverImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
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
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", href: "/" },
          { name: "Портфолио", href: "/portfolio" },
          { name: project.title, href: `/portfolio/${slug}` },
        ]}
      />
      <Header />
      <main id="main-content" className="min-h-screen">
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
