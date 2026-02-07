# Skill: Testing & CI

## Цель
Не ломать сайт при росте функционала и быстро ловить ошибки.

## Минимум
- `npm run lint`
- `npm run build` без ошибок

## Опционально (рекомендуется)
- Playwright e2e:
  - open home
  - open portfolio item
  - submit contact form (mock)
- CI pipeline (GitHub Actions):
  - install
  - lint
  - build
  - (optional) test

## DoD
- Любой PR проходит CI.
- Критические сценарии покрыты хотя бы smoke-тестами.
