# Skill: Project Architecture (Next.js App Router)

## Цель
Держать проект масштабируемым, быстрым и понятным: контент отделён от UI, страницы — композиция секций, UI primitives — через shadcn.

## Принципы
- Server Components by default.
- Client Components только если: состояние, обработчики, анимации на клиенте, формы с интерактивом.
- Данные/контент — через `content/` (mdx/json/ts). Не хардкодить тексты внутри JSX, кроме временного scaffolding.

## Рекомендуемая структура
- `app/(marketing)/...` для маркетинговых страниц.
- `components/sections/*` — секции страниц.
- `components/shared/*` — хедер, футер, CTA, контейнеры.
- `components/ui/*` — только shadcn компоненты (не кастомизировать без нужды).
- `lib/*` — утилиты, константы, seo, zod schemas.
- `content/*` — источники истины для проектов/пакетов/FAQ.

## Паттерны
### Page composition
Страница = набор секций:
- `Hero`
- `USPStrip`
- `PackagesGrid`
- `ProjectsGallery`
- `ProcessTimeline`
- `FAQAccordion`
- `LeadForm`

### Data contracts
Определяй типы:
- `Project`
- `Package`
- `FAQItem`
- `Testimonial`

Данные валидируй через zod (если данные внешние/динамичные).

## DoD архитектуры
- Новая фича не ломает существующие маршруты.
- Компоненты переиспользуемы.
- Нет дублирования данных/копирайта в 3 местах.
