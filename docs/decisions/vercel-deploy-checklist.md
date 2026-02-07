# Чеклист деплоя на Vercel — INTERIOR STUDIO

## 1. Переменные окружения (Environment Variables)

В панели Vercel (Settings > Environment Variables) необходимо добавить:

| Переменная | Описание | Пример значения | Обязательна |
|---|---|---|---|
| `TELEGRAM_BOT_TOKEN` | Токен Telegram-бота для уведомлений о заявках | `123456:ABC-DEF...` | Да |
| `TELEGRAM_CHAT_ID` | ID чата/группы для получения уведомлений | `-100123456789` | Да |
| `NEXT_PUBLIC_SITE_URL` | Публичный URL сайта (без слеша в конце) | `https://interiorstudio.com` | Да |

**Важно:**
- Переменные с префиксом `NEXT_PUBLIC_` доступны на клиенте — не храните в них секреты.
- Установите переменные для всех окружений: Production, Preview, Development.
- `TELEGRAM_BOT_TOKEN` — секретная переменная, убедитесь, что она не попадает в клиентский бандл.

---

## 2. Настройки сборки (Build Settings)

| Параметр | Значение |
|---|---|
| Framework Preset | **Next.js** |
| Build Command | `npm run build` |
| Output Directory | `.next` (по умолчанию) |
| Install Command | `npm install` |
| Node.js Version | 18.x или 20.x (рекомендуется 20.x) |

---

## 3. Настройка домена

### Шаги:
1. Перейдите в **Settings > Domains** в проекте Vercel.
2. Добавьте ваш домен (например, `interiorstudio.com`).
3. Настройте DNS-записи у регистратора:
   - **A-запись:** `76.76.21.21` (IP Vercel)
   - **CNAME-запись:** `cname.vercel-dns.com` (для поддомена `www`)
4. Vercel автоматически выпустит SSL-сертификат (Let's Encrypt).
5. Настройте редирект `www` -> корневой домен (или наоборот) в панели Vercel.

### Проверка:
- После настройки DNS подождите до 48 часов для распространения.
- Проверьте статус домена в панели Vercel — должен быть зеленый индикатор.
- Убедитесь, что HTTPS работает корректно.

---

## 4. Рекомендуемые заголовки безопасности

Добавьте в `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      {
        // Кеширование статических ресурсов (изображения, шрифты)
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};
```

---

## 5. Редиректы

Если необходимо настроить редиректы (например, для B2B-маршрутов), добавьте в `next.config.ts`:

```typescript
async redirects() {
  return [
    // Пример: редирект со старого URL
    // {
    //   source: "/old-page",
    //   destination: "/new-page",
    //   permanent: true,
    // },
  ];
},
```

Текущие B2B-маршруты (`/b2b/*`) уже настроены через route group `(marketing)` и не требуют редиректов.

---

## 6. Мониторинг производительности

### Vercel Analytics (рекомендуется):
1. Включите **Speed Insights** в панели Vercel (Settings > Speed Insights).
2. Включите **Web Analytics** (Settings > Analytics).
3. Обе функции бесплатны на плане Hobby.

### Метрики для отслеживания:
- **LCP** (Largest Contentful Paint) — целевое значение < 2.5 сек.
- **FID** (First Input Delay) — целевое значение < 100 мс.
- **CLS** (Cumulative Layout Shift) — целевое значение < 0.1.
- **TTFB** (Time to First Byte) — целевое значение < 800 мс.

### Дополнительно:
- Настройте уведомления о деградации производительности.
- Проверяйте метрики после каждого крупного обновления.

---

## 7. Workflow для Preview-деплоев

### Автоматические Preview-деплои:
- Vercel автоматически создает Preview-деплой для каждого Pull Request.
- Каждый PR получает уникальный URL вида `project-git-branch-name.vercel.app`.
- Комментарий с ссылкой на Preview автоматически добавляется в PR.

### Рекомендуемый процесс:
1. Создайте ветку для новой функции: `git checkout -b feature/my-feature`.
2. Внесите изменения и создайте Pull Request.
3. Vercel автоматически соберет и задеплоит Preview.
4. Проверьте Preview на мобильных и десктопных устройствах.
5. После ревью и одобрения — мержите в `main`.
6. Vercel автоматически задеплоит в Production.

### Защита Production:
- Рекомендуется включить **Deployment Protection** для Production.
- Настройте **Branch Protection** в GitHub для ветки `main`.

---

## 8. Чеклист перед первым деплоем

- [ ] Все переменные окружения добавлены в Vercel
- [ ] Домен настроен и DNS-записи обновлены
- [ ] SSL-сертификат выпущен
- [ ] Сборка проходит без ошибок (`npm run build`)
- [ ] Заголовки безопасности настроены
- [ ] Analytics и Speed Insights включены
- [ ] Формы работают (Telegram-уведомления приходят)
- [ ] Все страницы отображаются корректно
- [ ] Мобильная версия проверена
- [ ] OG-изображения загружаются
- [ ] sitemap.xml и robots.txt доступны
- [ ] favicon и manifest настроены
