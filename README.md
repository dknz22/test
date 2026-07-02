# Проект

Клиент на Vue 3 + Vite, сервер на Express + Prisma (SQLite).

## Требования

- Node.js 18+
- npm

## Запуск сервера

```bash
cd server
npm install
cp .env.example .env
npx prisma migrate dev
npm run dev
```

## Запуск клиента

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

## Переменные окружения

Сервер (`server/.env`):

| Переменная | Назначение | По умолчанию |
|---|---|---|
| `DATABASE_URL` | Строка подключения SQLite | `file:./dev.db` |
| `PORT` | Порт API | `4000` |
| `JWT_ACCESS_SECRET` | Секрет для access-токена | — |
| `JWT_REFRESH_SECRET` | Секрет для refresh-токена | — |
| `ACCESS_TOKEN_TTL` | Время жизни access-токена | `15m` |
| `REFRESH_TOKEN_TTL` | Время жизни refresh-токена | `7d` |
| `CLIENT_ORIGIN` | Разрешённый origin для CORS | `http://localhost:5173` |

Клиент (`client/.env`):

| Переменная | Назначение | По умолчанию |
|---|---|---|
| `VITE_API_URL` | Адрес API | `http://localhost:4000` |
