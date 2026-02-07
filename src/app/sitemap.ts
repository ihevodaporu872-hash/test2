import { MetadataRoute } from 'next';
import { projects } from '@/data/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://interiorstudio.com';

  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const staticPages = [
    { url: baseUrl, priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/portfolio`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/services`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/about`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/journal`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/contact`, priority: 0.7, changeFrequency: 'yearly' as const },
    { url: `${baseUrl}/faq`, priority: 0.5, changeFrequency: 'yearly' as const },
  ].map((page) => ({ ...page, lastModified: new Date() }));

  return [...staticPages, ...projectUrls];
}
