# MerchUA

SEO-friendly сайт вакансій для Львова на `Next.js App Router + Prisma + SQLite`, який приймає структуровані вакансії з `n8n` через API routes, віддає SSR/ISR сторінки і генерує `JobPosting` JSON-LD для Google Jobs.

## Що реалізовано

- Prisma-модель `Vacancy` з унікальним `tgMessageId` на рівні БД.
- `POST /api/vacancies` з авторизацією через `X-API-Key`, валідацією `zod` і безпечним `duplicate` response для n8n.
- `PATCH /api/vacancies/[id]` для окремого оновлення `blueskyUri`.
- Публічний листинг вакансій з пагінацією, категоріями, ISR і анімацією появи карток.
- Детальна сторінка вакансії з `generateMetadata`, OpenGraph і `JobPosting` JSON-LD.
- Динамічні `sitemap.xml` і `robots.txt`.
- Продакшн-конфіг для `PM2` без Docker.

## Формат опису вакансії

Поле `description` зберігається в БД як **Markdown**. Це безпечніше за сирий HTML для ingest-потоку з LLM і зручно для подальшого рендерингу. На сторінці вакансії Markdown рендериться server-side у базові блоки (абзаци, заголовки, списки), а в JSON-LD передається очищений plain text.

## Змінні середовища

Скопіюйте `.env.example` у `.env` і заповніть:

```bash
DATABASE_URL="file:./dev.db"
INGEST_API_KEY="replace-with-a-secure-random-key"
NEXT_PUBLIC_SITE_URL="https://your-domain.example"
```

- `DATABASE_URL`: шлях до SQLite файлу.
- `INGEST_API_KEY`: секрет для ingest API.
- `NEXT_PUBLIC_SITE_URL`: публічний base URL сайту, використовується для canonical URL, sitemap та API відповіді з `url`.

## Локальний запуск

```bash
npm install
npx prisma migrate dev --name init
npm run build
npm run start
```

Сайт підніметься за замовчуванням на `http://localhost:3000`.

## Продакшн-деплой на VM через PM2

```bash
npm install
npx prisma migrate deploy
npm run build
pm2 start ecosystem.config.js
```

Після запуску корисно виконати:

```bash
pm2 save
pm2 logs merchua
```

## Інтеграція з n8n

У `HTTP Request` ноді задайте:

- Method: `POST`
- URL: `https://your-domain.example/api/vacancies`
- Header: `X-API-Key: <INGEST_API_KEY>`
- Content-Type: `application/json`

Приклад body:

```json
{
  "title": "Middle Frontend Developer",
  "description": "## Обов'язки\n- Розробка інтерфейсів\n- Робота з Next.js",
  "company": "Acme Studio",
  "location": "Львів",
  "salaryMin": 45000,
  "salaryMax": 65000,
  "salaryCurrency": "UAH",
  "employmentType": "full-time",
  "category": "IT",
  "sourceChannel": "@lviv_jobs_feed",
  "tgMessageId": "tg-123456789",
  "expiresAt": "2026-08-01T23:59:59.000Z"
}
```

Можливі відповіді:

- `201 { "status": "created", "id": "...", "slug": "...", "url": "..." }`
- `200 { "status": "duplicate", "id": "...", "slug": "..." }`
- `401 { "error": "Unauthorized" }`

Після публікації в Bluesky можна окремо викликати:

```bash
curl -X PATCH https://your-domain.example/api/vacancies/<ID> \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-ingest-key" \
  -d '{"blueskyUri":"at://did:plc:example/app.bsky.feed.post/123"}'
```

## SEO примітки

- Кожна сторінка вакансії віддає `JobPosting` JSON-LD.
- `app/sitemap.ts` підтягує всі активні вакансії з БД.
- ISR інтервал: `300` секунд.
- Для валідації schema markup перевірте сторінку у [Rich Results Test](https://search.google.com/test/rich-results).

## Готовність до публікації

Перед заливкою на VM переконайтесь, що:

1. `.env` містить продакшн `NEXT_PUBLIC_SITE_URL` і сильний `INGEST_API_KEY`.
2. На сервері є Node.js, npm, PM2 та права запису до папки з `SQLite` файлом.
3. Ви виконали `npx prisma migrate deploy` перед `pm2 start`.
