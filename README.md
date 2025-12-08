# 📡 AIGen Open API Gateway

> Gateway trung tâm của AIGen Platform: xác thực, rate-limit, validate, route đến các microservices (Users, Chatbot, ...), tổng hợp dữ liệu và phục vụ API docs.

[![Node.js](https://img.shields.io/badge/Node.js-22.x-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Fastify](https://img.shields.io/badge/Fastify-4.x-black.svg)](https://www.fastify.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📋 Mục lục
- [Giới thiệu](#-giới-thiệu)
- [Tính năng](#-tính-năng)
- [Kiến trúc hệ thống](#-kiến-trúc-hệ-thống)
- [Công nghệ sử dụng](#️-công-nghệ-sử-dụng)
- [Yêu cầu hệ thống](#-yêu-cầu-hệ-thống)
- [Cài đặt](#-cài-đặt)
- [Chạy ứng dụng](#-chạy-ứng-dụng)
- [Docker](#-docker)
- [Cấu hình môi trường](#-cấu-hình-môi-trường)
- [Scripts](#-scripts)
- [Đóng góp](#-đóng-góp)
- [License](#-license)
- [Team & Support](#-team--support)

---

## 🎯 Giới thiệu
Open API Gateway là cửa ngõ duy nhất nhận request từ bên ngoài, sau đó:
- Xác thực (JWT/API Key), giới hạn tốc độ, CORS.
- Validate payload và chuẩn hóa lỗi.
- Route theo path đến microservices (Users, Chatbot, ...).
- Tổng hợp dữ liệu (BFF-lite) cho một số endpoint.
- Phục vụ OpenAPI/Swagger docs.

---

## ✨ Tính năng
- ✅ Reverse proxy theo path: /v1/users/*, /v1/auth/*, /v1/chatbots/*, ...
- ✅ Auth: JWT bearer, API Key (tùy chọn).
- ✅ Rate limit, CORS, Request ID, Logging (Pino).
- ✅ Schema validation (Ajv) và chuẩn hóa response lỗi.
- ✅ Retry, timeout, circuit breaker (configurable).
- ✅ Redis caching (tùy endpoint).
- ✅ Swagger UI + OpenAPI JSON.

---

## 🏗️ Kiến trúc hệ thống
```
┌────────────────────────────────────────────────────────────┐
│                    OPEN API GATEWAY (Fastify)              │
│  Auth  │ RateLimit │ Validation │ Routing │ Aggregation    │
└────────┴───────────┴────────────┴─────────┴────────────────┘
         ↓                   ↓                     ↓
  ┌────────────┐      ┌──────────┐          ┌──────────┐
  │  Users Svc │      │ Chatbot  │   ...    │  Others  │
  └────────────┘      └──────────┘          └──────────┘
         ↓
  Redis / RabbitMQ / PostgreSQL (phục vụ cache, audit, RPC)
```

---

## 🛠️ Công nghệ sử dụng
- Runtime: Node.js 22, TypeScript 5.x, Fastify 4.x
- Plugins: @fastify/jwt, @fastify/rate-limit, @fastify/cors, @fastify/swagger, Ajv
- Data/Infra: Redis, PostgreSQL, RabbitMQ, MongoDB (tùy chọn)
- Logging: Pino (+ pretty trong dev)

---

## 🖥️ Yêu cầu hệ thống
- Node.js: >= 22.x
- npm
- Redis/RabbitMQ/PostgreSQL: tùy nhu cầu, có thể tắt nếu không dùng
- Docker/Compose: khuyến nghị cho local

---

## 📦 Cài đặt
```bash
git clone <repo-open-api>
cd open-api
cp .env.example .env   # hoặc tự tạo theo mục Cấu hình môi trường
npm install
```

---

## 🚀 Chạy ứng dụng
- Development (hot reload):
```bash
npm run start:dev
```

- Production:
```bash
npm run build
npm run start
```

Ứng dụng mặc định tại: http://localhost:8080 (PORT có thể thay đổi)

---

## 🐳 Docker
```bash
docker-compose up -d --build
```
Hoặc build/run tay:
```bash
docker build -t aigen-open-api:latest .
docker run --rm -p 8080:8080 --env-file .env aigen-open-api:latest
```

---

## ⚙️ Cấu hình môi trường
Các biến phổ biến (ví dụ):
```env
# Server
PORT=8080
HOST=0.0.0.0
LOG_LEVEL=info
ENABLE_SWAGGER=true
CORS_ORIGIN=*

# Auth
JWT_SECRET=supersecret
API_KEY_ENABLED=false
API_KEYS=key1,key2

# Rate limit
RATE_LIMIT_MAX=100
RATE_LIMIT_TIME_WINDOW=1 minute

# Timeouts/Retry
REQUEST_TIMEOUT_MS=10000
UPSTREAM_RETRY=2

# Upstream services (ví dụ)
USERS_SERVICE_URL=http://localhost:3001
CHATBOT_SERVICE_URL=http://localhost:3002

# Infra (tùy chọn)
REDIS_URL=redis://localhost:6379
RABBITMQ_URL=amqp://guest:guest@localhost:5672
POSTGRES_URL=postgres://postgres:postgres@localhost:5432/aigen_open_api
```

Gợi ý routing mặc định (có thể cấu hình qua env/config):
- /v1/auth/* → USERS_SERVICE_URL
- /v1/users/* → USERS_SERVICE_URL
- /v1/chatbots/* → CHATBOT_SERVICE_URL

---

## 📜 Scripts
| Command               | Mô tả                          |
| --------------------- | ------------------------------ |
| `npm run start`       | Chạy production                |
| `npm run start:dev`   | Chạy dev với hot reload        |
| `npm run build`       | Build TypeScript               |

---

## 🤝 Đóng góp
1) Tạo branch: feature/your-feature  
2) Commit convention: feat|fix|chore|docs|refactor|perf|test  
3) Mở PR kèm mô tả/ngữ cảnh và cách test.

---

## 📄 License
MIT — xem file LICENSE.

---

## 👥 Team & Support
- Issues: mở ticket với logs và steps để reproduce
- Swagger: http://localhost:8080/docs (nếu bật)
