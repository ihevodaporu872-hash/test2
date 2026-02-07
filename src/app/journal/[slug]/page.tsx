import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Article | Interior Studio',
  description: 'Read this article from the Interior Studio journal.',
};

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  return (
    <div>
      <h1>Article: {slug}</h1>
    </div>
  );
}
