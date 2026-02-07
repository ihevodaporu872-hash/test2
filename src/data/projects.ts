import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Пентхаус в стиле минимализм',
    slug: 'minimalist-penthouse',
    category: 'residential',
    description:
      'Просторный пентхаус с панорамными окнами, где каждая деталь продумана для создания ощущения абсолютного покоя. Натуральные материалы, чистые линии и тщательно подобранное освещение формируют пространство, в котором хочется жить.',
    coverImage: '/images/photo_5.jpg',
    images: [
      '/images/photo_5.jpg',
      '/images/photo_6.jpg',
      '/images/photo_7.jpg',
      '/images/photo_8.jpg',
    ],
    beforeImage: '/images/photo_9.jpg',
    afterImage: '/images/photo_5.jpg',
    location: 'Москва, Пресненский район',
    area: '297 м²',
    year: 2024,
    scope: ['Полный дизайн-проект', 'Авторский надзор', 'Световой дизайн', 'Подбор мебели'],
    featured: true,
  },
  {
    id: '2',
    title: 'Загородный дом у озера',
    slug: 'lakeside-retreat',
    category: 'residential',
    description:
      'Загородная резиденция, где интерьер продолжает пейзаж за окном. Органические текстуры, мягкая палитра и панорамное остекление стирают границу между домом и природой.',
    coverImage: '/images/photo_6.jpg',
    images: [
      '/images/photo_6.jpg',
      '/images/photo_7.jpg',
      '/images/photo_8.jpg',
      '/images/photo_9.jpg',
    ],
    location: 'Московская область, Истринский район',
    area: '420 м²',
    year: 2024,
    scope: ['Интерьерная архитектура', 'Ландшафтная интеграция', 'Подбор материалов', 'Мебель на заказ'],
    featured: true,
  },
  {
    id: '3',
    title: 'Квартира в историческом доме',
    slug: 'heritage-apartment',
    category: 'residential',
    description:
      'Бережная реставрация квартиры в доме начала XX века с сохранением исторического характера и введением современного комфорта. Лепнина, паркет и высокие потолки дополнены актуальными решениями.',
    coverImage: '/images/photo_7.jpg',
    images: [
      '/images/photo_7.jpg',
      '/images/photo_8.jpg',
      '/images/photo_9.jpg',
      '/images/photo_10.jpg',
    ],
    location: 'Санкт-Петербург, Петроградская сторона',
    area: '260 м²',
    year: 2023,
    scope: ['Реставрация', 'Дизайн интерьера', 'Столярные изделия на заказ', 'Историческая экспертиза'],
    featured: false,
  },
  {
    id: '4',
    title: 'Кофейня-обжарочная',
    slug: 'artisan-coffee-roastery',
    category: 'commercial',
    description:
      'Индустриально-уютное пространство для обжарки и дегустации спешиалти-кофе. Сырые материалы, тёплый свет и общие столы создают атмосферу крафтовой мастерской.',
    coverImage: '/images/photo_8.jpg',
    images: [
      '/images/photo_8.jpg',
      '/images/photo_9.jpg',
      '/images/photo_10.jpg',
      '/images/photo_5.jpg',
    ],
    location: 'Москва, Патриаршие пруды',
    area: '170 м²',
    year: 2024,
    scope: ['Коммерческий интерьер', 'Интеграция бренда', 'Световой дизайн', 'Мебель на заказ'],
    featured: true,
  },
  {
    id: '5',
    title: 'Лобби бутик-отеля',
    slug: 'boutique-hotel-lobby',
    category: 'hospitality',
    description:
      'Лобби бутик-отеля, которое одновременно встречает гостей и служит живым общественным пространством. Отсылки к ар-деко в современной интерпретации создают ощущение сдержанной роскоши.',
    coverImage: '/images/photo_9.jpg',
    images: [
      '/images/photo_9.jpg',
      '/images/photo_10.jpg',
      '/images/photo_5.jpg',
      '/images/photo_6.jpg',
    ],
    location: 'Москва, Тверской район',
    area: '460 м²',
    year: 2023,
    scope: ['Дизайн гостиничных пространств', 'FF&E спецификация', 'Арт-подбор', 'Навигация'],
    featured: false,
  },
  {
    id: '6',
    title: 'Офис креативного агентства',
    slug: 'creative-agency-hq',
    category: 'office',
    description:
      'Динамичная офисная среда, спроектированная для поддержки творчества и командной работы. Гибкие рабочие зоны, биофильные элементы и продуманные зоны отдыха.',
    coverImage: '/images/photo_10.jpg',
    images: [
      '/images/photo_10.jpg',
      '/images/photo_5.jpg',
      '/images/photo_6.jpg',
      '/images/photo_7.jpg',
    ],
    location: 'Москва, Красная Роза',
    area: '740 м²',
    year: 2024,
    scope: ['Дизайн рабочих пространств', 'Планировка', 'Акустический дизайн', 'Биофильная интеграция'],
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

export const projectCategories = [
  { value: 'all', label: 'Все проекты' },
  { value: 'residential', label: 'Жилые' },
  { value: 'commercial', label: 'Коммерческие' },
  { value: 'hospitality', label: 'Гостиничные' },
  { value: 'office', label: 'Офисные' },
] as const;
