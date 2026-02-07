import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'INTERIOR STUDIO',
    short_name: 'Interior',
    description: 'Premium interior design studio creating bespoke living spaces',
    start_url: '/',
    display: 'standalone',
    background_color: '#F5F0EB',
    theme_color: '#C09683',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
