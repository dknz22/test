Node.js 18+

# сервер
cd server
npm install
cp .env.example .env
npx prisma migrate dev
npm run dev

# клиент
cd client
npm install
cp .env.example .env
npm run dev