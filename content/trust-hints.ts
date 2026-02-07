export interface TrustHint {
  id: string;
  text: string;
  category: 'deadlines' | 'revisions' | 'deliverables' | 'process' | 'payment' | 'experience';
}

export const trustHints: TrustHint[] = [
  // Сроки (deadlines)
  {
    id: 'deadline-contract',
    text: 'Сроки зафиксированы в договоре',
    category: 'deadlines',
  },
  {
    id: 'deadline-track',
    text: 'Ни одного сорванного дедлайна за 12 лет',
    category: 'deadlines',
  },

  // Правки (revisions)
  {
    id: 'revisions-included',
    text: '2 раунда правок включены',
    category: 'revisions',
  },
  {
    id: 'revisions-full',
    text: '3 раунда правок на каждом этапе в полном проекте',
    category: 'revisions',
  },

  // Результат (deliverables)
  {
    id: 'deliverables-drawings',
    text: 'Чертежи для строителей — 80-150 листов',
    category: 'deliverables',
  },
  {
    id: 'deliverables-specs',
    text: 'Спецификации с артикулами и ценами',
    category: 'deliverables',
  },
  {
    id: 'deliverables-3d',
    text: '3D до начала ремонта — увидите результат заранее',
    category: 'deliverables',
  },

  // Процесс (process)
  {
    id: 'process-stages',
    text: '5 этапов, 3 контрольные точки, 0 сюрпризов',
    category: 'process',
  },
  {
    id: 'process-supervision',
    text: 'Авторский надзор — совпадение с проектом 95%+',
    category: 'process',
  },
  {
    id: 'process-transparent',
    text: 'Прозрачный процесс: вы всегда знаете, что происходит',
    category: 'process',
  },

  // Оплата (payment)
  {
    id: 'payment-staged',
    text: 'Поэтапная оплата — платите за результат',
    category: 'payment',
  },
  {
    id: 'payment-contract',
    text: 'Работаем по договору с юридическим лицом',
    category: 'payment',
  },
  {
    id: 'payment-credit',
    text: 'Стоимость концепции засчитывается в полный проект',
    category: 'payment',
  },

  // Опыт (experience)
  {
    id: 'experience-years',
    text: '12 лет опыта в дизайне интерьеров',
    category: 'experience',
  },
  {
    id: 'experience-remote',
    text: 'Работаем по всей России — очно и удалённо',
    category: 'experience',
  },
];

/** Получить подсказки по категории */
export function getTrustHintsByCategory(category: TrustHint['category']): TrustHint[] {
  return trustHints.filter((hint) => hint.category === category);
}

/** Получить N случайных подсказок */
export function getRandomTrustHints(count: number): TrustHint[] {
  const shuffled = [...trustHints].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
