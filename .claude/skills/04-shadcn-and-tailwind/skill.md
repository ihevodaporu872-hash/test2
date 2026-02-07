# Skill: shadcn/ui + Tailwind Implementation

## Цель
Использовать shadcn/ui как основу интерфейса и Tailwind как слой кастомизации, не изобретая велосипед.

## Когда использовать MCP shadcn
- Любые UI primitives: Button, Card, Sheet, Dialog, Tabs, Accordion, Form, Input, Select, Badge, Toast.
- Нужны актуальные пропсы/паттерны.
- Нужен правильный composition (Form + zod + RHF).

## Правила
- UI primitives только из shadcn (если уже приняты).
- Кастомные компоненты строятся из primitives.
- Стили: через tokens/variables, избегай хардкода цветов.

## Полезные компоненты для проекта
- Navigation: `Sheet` (mobile menu)
- FAQ: `Accordion`
- Галерея кейсов: `Dialog` + carousel/scroll area
- Пакеты: `Card`, `Badge`
- Формы: `Form`, `Input`, `Textarea`, `Select`

## Tailwind hygiene
- Не писать “простыни” классов: группировать, выносить повторяющееся.
- Использовать `cn()` утилиту.
- Стараться держать одинаковые паттерны отступов и типографики.

## DoD
- Компоненты соответствуют shadcn паттернам.
- Минимум кастомного велосипеда.
- Код читается и легко поддерживается.
