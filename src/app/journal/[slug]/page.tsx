import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Статья | Interior Studio",
  description: "Читайте статью из журнала Interior Studio.",
};

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div>
          <h1>Статья: {slug}</h1>
        </div>
      </main>
      <Footer />
    </>
  );
}
