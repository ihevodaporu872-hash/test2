import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Проект | Interior Studio",
  description: "Подробности дизайн-проекта интерьера.",
};

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div>
          <h1>Проект: {slug}</h1>
        </div>
      </main>
      <Footer />
    </>
  );
}
