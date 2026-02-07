# Карта аналитических событий

Документ описывает все отслеживаемые события в приложении INTERIOR STUDIO.

## Архитектура

- **Файл**: `src/lib/analytics.ts`
- **Подход**: провайдер-независимый — одна точка интеграции для GA4, Яндекс.Метрики и любого другого провайдера
- **Подключение**: вызвать `setAnalyticsProvider(fn)` один раз при инициализации приложения

## Карта событий

| Событие            | Функция               | Где вызывается                          | Параметры                              |
| ------------------ | --------------------- | --------------------------------------- | -------------------------------------- |
| `cta_click`        | `trackCtaClick`       | Hero (primary/secondary CTA), CTASection на всех страницах | `element_id`, `label`                  |
| `form_submit`      | `trackFormSubmit`     | Контактная форма, форма заявки          | `element_id` (form ID), `label`        |
| `messenger_click`  | `trackMessengerClick` | Кнопки Telegram/WhatsApp в footer/contact | `element_id` (messenger name)          |
| `portfolio_open`   | `trackPortfolioOpen`  | ProjectCard — клик по карточке проекта  | `element_id` (slug), `label` (title)   |
| `page_view`        | `trackPageView`       | SPA-навигация (при необходимости)       | `page` (pathname)                      |

## Точки интеграции в компонентах

### `cta_click`
- `src/components/sections/hero.tsx` — кнопки "Обсудить проект" и "Смотреть работы"
- `src/components/sections/cta-section.tsx` — все CTA-блоки на всех страницах

### `portfolio_open`
- `src/components/shared/project-card.tsx` — клик по карточке проекта в галерее

### `form_submit`
- Будет добавлено при создании компонента контактной формы

### `messenger_click`
- Будет добавлено при реализации кнопок мессенджеров в footer/contact

### `page_view`
- Доступна функция `trackPageView()` для вызова при SPA-навигации, если стандартный page_view провайдера недостаточен

## Подключение GA4

```ts
// src/app/layout.tsx или providers.tsx
import { setAnalyticsProvider } from '@/lib/analytics';

setAnalyticsProvider((name, params) => {
  window.gtag?.('event', name, params);
});
```

## Подключение Яндекс.Метрики

```ts
setAnalyticsProvider((name, params) => {
  window.ym?.(COUNTER_ID, 'reachGoal', name, params);
});
```

## Dev-режим

В `development` все события логируются в консоль браузера с префиксом `[analytics]`.
