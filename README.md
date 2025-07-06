# 📡 Open API Service

Đây là gateway chính của hệ thống Aigen Platform, dùng để nhận và phân phối các request từ bên ngoài vào các microservices nội bộ.

## 🛠️ Công nghệ

- Node.js 22
- TypeScript
- Fastify
- PostgreSQL
- RabbitMQ
- MongoDB
- Redis

## 🚀 Cách chạy

### 🐳 Dùng Docker (recommend)

```bash
docker-compose up -d --build
```

### 📄 Tạo file `.env`

```bash
cp .env.example .env
```

### ⚙️ Chạy local
```bash
npm install
npm run start:dev
```

### 📜 Scripts thường dùng

| Lệnh                | Mô tả                      |
| ------------------- | -------------------------- |
| `npm run start`     | Chạy bản production        |
| `npm run start:dev` | Chạy bản dev có hot reload |
| `npm run build`     | Biên dịch code TypeScript  |
