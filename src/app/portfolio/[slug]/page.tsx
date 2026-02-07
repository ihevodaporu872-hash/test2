import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project | Interior Studio',
  description: 'Discover the story behind this interior design project.',
};

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  return (
    <div>
      <h1>Project: {slug}</h1>
    </div>
  );
}
