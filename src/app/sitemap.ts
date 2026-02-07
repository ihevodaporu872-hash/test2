import { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { siteConfig } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

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
    { url: `${baseUrl}/pricing`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/process`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/about`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/contact`, priority: 0.7, changeFrequency: 'yearly' as const },
    { url: `${baseUrl}/faq`, priority: 0.5, changeFrequency: 'yearly' as const },
    { url: `${baseUrl}/journal`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/b2b`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/b2b/mop`, priority: 0.6, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/b2b/parking`, priority: 0.6, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/b2b/planning-audit`, priority: 0.6, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/privacy`, priority: 0.3, changeFrequency: 'yearly' as const },
    { url: `${baseUrl}/terms`, priority: 0.3, changeFrequency: 'yearly' as const },
  ].map((page) => ({ ...page, lastModified: new Date() }));

  return [...staticPages, ...projectUrls];
}
