# SmartQ — AI-Powered Virtual Queue Management System

SmartQ is a unified, multi-tenant virtual queue management ecosystem designed to reduce physical waiting times across hospitals, clinics, banks, and government offices.

## 🌟 Key Features

- 📱 **Remote Queue Joining**: Users can select services and join queues remotely from anywhere.
- 🤖 **AI Wait-Time Prediction**: Real-time waiting time estimation powered by machine learning algorithms considering historic service times, active counters, and arrival rates.
- 📍 **Live Position Tracking**: Real-time queue position updates via WebSockets and Firebase Cloud Messaging (FCM).
- 🧑‍💼 **Staff Dashboard**: Web interface for institution staff to call, serve, verify, and manage incoming tokens.
- 📊 **Admin & MIS Console**: Management analytics for footfall prediction, staffing recommendations, peak hour analysis, and operational insights.
- 💬 **AI Assistant Integration**: Context-aware chatbot supporting queue discovery, status checking, and automated booking support.

---

## 🏗 System Architecture

```text
                                SMARTQ ECOSYSTEM
                                       │
                      ┌────────────────┼────────────────┐
                      │                │                │
                MOBILE APP (Flutter) STAFF WEB (React) ADMIN WEB (React)
                      │                │                │
                      └────────────────┼────────────────┘
                                       │
                             FASTAPI BACKEND
                                       │
                            ┌──────────┴──────────┐
                            │                     │
                     Queue Engine          AI / RAG / Chatbot
                       (Redis)             (scikit-learn & LangGraph)
                            │                     │
                            └──────────┬──────────┘
                                       │
                            PostgreSQL + pgvector
```

---

## 🎨 Design System & Palette

- **Primary Deep Blue**: `#123B66`
- **Secondary Teal**: `#159A9C`
- **Light Accent**: `#E8F4FA`
- **Background**: `#F8FAFC`
- **Dark Text**: `#0F2742`

---

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for Web frontend)
- Python 3.11+ (for Backend & AI services)
- Flutter SDK 3.x (for Mobile app)

### Development Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Start Infrastructure & Backend Services:
   ```bash
   docker-compose up -d
   ```

3. Run Backend Migrations:
   ```bash
   make migrate
   ```

4. Launch Web Dashboard:
   ```bash
   cd web && npm install && npm run dev
   ```

5. Launch Mobile App:
   ```bash
   cd mobile && flutter run
   ```

---

## 📂 Repository Structure

- `mobile/`: Flutter mobile client app for end-users.
- `web/`: React + Vite application for Staff & Admin dashboards.
- `backend/`: FastAPI core service managing queues, state machine, and REST/WS APIs.
- `ai/`: Scikit-learn prediction model & LangGraph AI agents.
- `chatbot/`: Multi-channel conversational AI service.
- `docs/`: Comprehensive architecture, design, and API specs.
- `infra/`: Docker, AWS, and deployment configurations.
