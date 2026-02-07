# Skill: Leads, Forms, Integrations

## Цель
Стабильный сбор заявок без спама и без “падающих” интеграций.

## Форма (минимальный набор)
- name
- contact (телефон/telegram)
- product_interest (концепт/полный проект/надзор/инвест/МОП/паркинг)
- area_m2 (optional)
- city (optional)
- message

## Валидация
- zod schema в `lib/schema/*`
- серверная валидация обязательна

## Отправка
- Server Actions или Route Handler
- Не блокировать UI: показывать успех/ошибку
- Логировать ошибки (console + опционально Sentry)

## Антиспам
- honeypot field
- rate limit (простая защита)
- минимальный debounce/disable button while sending

## Каналы доставки лида (выбрать 1-2)
- Email (Resend/SMTP)
- Telegram bot webhook
- Google Sheets / Airtable (опционально)

## DoD
- Форма работает в build/prod.
- Ошибки понятны пользователю.
- Интеграция не раскрывает секреты на клиенте.
