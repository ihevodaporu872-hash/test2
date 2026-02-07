import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Minimalist Penthouse',
    slug: 'minimalist-penthouse',
    category: 'residential',
    description:
      'A stunning penthouse transformation embracing clean lines, natural materials, and panoramic city views. Every element was carefully curated to create a serene sanctuary above the urban landscape.',
    coverImage: 'https://placehold.co/1200x800/2c2c2c/ffffff?text=Minimalist+Penthouse',
    images: [
      'https://placehold.co/1200x800/2c2c2c/ffffff?text=Penthouse+Living+Room',
      'https://placehold.co/1200x800/2c2c2c/ffffff?text=Penthouse+Kitchen',
      'https://placehold.co/1200x800/2c2c2c/ffffff?text=Penthouse+Bedroom',
      'https://placehold.co/1200x800/2c2c2c/ffffff?text=Penthouse+Terrace',
    ],
    beforeImage: 'https://placehold.co/1200x800/999999/ffffff?text=Before',
    afterImage: 'https://placehold.co/1200x800/2c2c2c/ffffff?text=After',
    location: 'Manhattan, New York',
    area: '3,200 sq ft',
    year: 2024,
    scope: ['Full Interior Design', 'Custom Furniture', 'Lighting Design', 'Art Curation'],
    featured: true,
  },
  {
    id: '2',
    title: 'Coastal Retreat Villa',
    slug: 'coastal-retreat-villa',
    category: 'residential',
    description:
      'A beachfront villa reimagined with organic textures, soft palettes, and floor-to-ceiling windows that blur the boundary between indoor comfort and coastal beauty.',
    coverImage: 'https://placehold.co/1200x800/d4c5a9/333333?text=Coastal+Retreat+Villa',
    images: [
      'https://placehold.co/1200x800/d4c5a9/333333?text=Villa+Living+Area',
      'https://placehold.co/1200x800/d4c5a9/333333?text=Villa+Master+Suite',
      'https://placehold.co/1200x800/d4c5a9/333333?text=Villa+Dining',
      'https://placehold.co/1200x800/d4c5a9/333333?text=Villa+Pool+Deck',
    ],
    location: 'Malibu, California',
    area: '4,500 sq ft',
    year: 2024,
    scope: ['Interior Architecture', 'Landscape Integration', 'Material Selection', 'Furniture Design'],
    featured: true,
  },
  {
    id: '3',
    title: 'Heritage Townhouse',
    slug: 'heritage-townhouse',
    category: 'residential',
    description:
      'A historic brownstone carefully restored to honor its original character while introducing contemporary comforts and a refined material palette.',
    coverImage: 'https://placehold.co/1200x800/8b7355/ffffff?text=Heritage+Townhouse',
    images: [
      'https://placehold.co/1200x800/8b7355/ffffff?text=Townhouse+Entry',
      'https://placehold.co/1200x800/8b7355/ffffff?text=Townhouse+Library',
      'https://placehold.co/1200x800/8b7355/ffffff?text=Townhouse+Kitchen',
      'https://placehold.co/1200x800/8b7355/ffffff?text=Townhouse+Garden',
    ],
    location: 'Brooklyn, New York',
    area: '2,800 sq ft',
    year: 2023,
    scope: ['Restoration', 'Interior Design', 'Custom Millwork', 'Heritage Consultation'],
    featured: false,
  },
  {
    id: '4',
    title: 'Artisan Coffee Roastery',
    slug: 'artisan-coffee-roastery',
    category: 'commercial',
    description:
      'An industrial-chic coffee roastery and tasting room designed to celebrate the craft of specialty coffee with raw materials, warm lighting, and communal gathering spaces.',
    coverImage: 'https://placehold.co/1200x800/4a3728/ffffff?text=Artisan+Coffee+Roastery',
    images: [
      'https://placehold.co/1200x800/4a3728/ffffff?text=Roastery+Main+Hall',
      'https://placehold.co/1200x800/4a3728/ffffff?text=Roastery+Bar',
      'https://placehold.co/1200x800/4a3728/ffffff?text=Roastery+Seating',
      'https://placehold.co/1200x800/4a3728/ffffff?text=Roastery+Detail',
    ],
    location: 'Portland, Oregon',
    area: '1,800 sq ft',
    year: 2024,
    scope: ['Commercial Interior', 'Brand Integration', 'Lighting Design', 'Custom Fixtures'],
    featured: true,
  },
  {
    id: '5',
    title: 'Boutique Hotel Lobby',
    slug: 'boutique-hotel-lobby',
    category: 'hospitality',
    description:
      'A boutique hotel lobby that serves as both a welcoming arrival experience and a vibrant social hub, blending Art Deco influences with contemporary luxury.',
    coverImage: 'https://placehold.co/1200x800/1a1a2e/ffffff?text=Boutique+Hotel+Lobby',
    images: [
      'https://placehold.co/1200x800/1a1a2e/ffffff?text=Hotel+Reception',
      'https://placehold.co/1200x800/1a1a2e/ffffff?text=Hotel+Lounge',
      'https://placehold.co/1200x800/1a1a2e/ffffff?text=Hotel+Bar',
      'https://placehold.co/1200x800/1a1a2e/ffffff?text=Hotel+Detail',
    ],
    location: 'Chicago, Illinois',
    area: '5,000 sq ft',
    year: 2023,
    scope: ['Hospitality Design', 'FF&E Specification', 'Art Direction', 'Wayfinding'],
    featured: false,
  },
  {
    id: '6',
    title: 'Creative Agency Headquarters',
    slug: 'creative-agency-headquarters',
    category: 'office',
    description:
      'A dynamic office environment designed to foster creativity and collaboration, featuring flexible workspaces, biophilic elements, and curated breakout zones.',
    coverImage: 'https://placehold.co/1200x800/2d4a3e/ffffff?text=Creative+Agency+HQ',
    images: [
      'https://placehold.co/1200x800/2d4a3e/ffffff?text=Office+Open+Plan',
      'https://placehold.co/1200x800/2d4a3e/ffffff?text=Office+Meeting+Room',
      'https://placehold.co/1200x800/2d4a3e/ffffff?text=Office+Breakout',
      'https://placehold.co/1200x800/2d4a3e/ffffff?text=Office+Kitchen',
    ],
    location: 'Austin, Texas',
    area: '8,000 sq ft',
    year: 2024,
    scope: ['Workplace Design', 'Space Planning', 'Acoustic Design', 'Biophilic Integration'],
    featured: false,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsByCategory(category: Project['category']): Project[] {
  return projects.filter((project) => project.category === category);
}
