import { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'INTERIOR STUDIO',
  description: 'Студия дизайна интерьера в Москве. Проектируем пространства с инженерной точностью — от планировки до последнего выключателя.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://interiorstudio.com',
  ogImage: '/og-image.jpg',
  links: {
    instagram: 'https://instagram.com/interiorstudio',
    pinterest: 'https://pinterest.com/interiorstudio',
    linkedin: 'https://linkedin.com/company/interiorstudio',
  },
};
