# ByteAscend - EdTech Learning & Coding Platform

ByteAscend is a comprehensive, production-grade EdTech platform built for programming education, Data Structures & Algorithms (DSA) tracking, and tech interview preparation. It is designed with a modern, highly scalable microservices architecture to handle heavy traffic and concurrent code execution seamlessly.

---

## 🚀 Tech Stack

### Frontend
*   **Framework**: Next.js 14 (App Router)
*   **Language**: TypeScript
*   **Styling**: TailwindCSS, Framer Motion (for 3D and glassmorphism effects)
*   **State Management**: Zustand

### Backend (Microservices)
*   **Framework**: Spring Boot 3.x
*   **API Gateway**: Spring Cloud Gateway
*   **Database**: PostgreSQL
*   **Message Broker**: RabbitMQ (Event-driven architecture)
*   **ORM / Data Access**: Spring Data JPA (Hibernate)
*   **Migrations**: Flyway
*   **Caching & Rate Limiting**: Redis

### Infrastructure & Code Execution
*   **Execution Engine**: Judge0 (Docker Sandbox) for compiling and running C++, Java, and Python.
*   **Containerization**: Docker & Docker Compose

---

## 🏗️ Architecture Breakdown

The backend is split into independently scalable microservices:

1.  **`api-gateway`**: Acts as the front door, handling routing and Redis-based rate limiting.
2.  **`user-service`**: Manages Identity & Access Management (IAM), Authentication, RBAC (Free, Basic, Plus, Pro), Gamification (Streaks/Scores, Badges), and Monetization/Subscriptions.
3.  **`lms-service`**: The Learning Management System. Serves courses, modules, video lessons, and tracks user video watch progress. Also houses Community features.
4.  **`dsa-service`**: Manages the DSA problem repository, categorized tracking (Solved/Attempted/Bookmarked), POTD logic, and user code submissions.
5.  **`execution-service`**: Interfaces with the Judge0 Docker environment to execute untrusted user code safely. Checks Redis for limits.

---

## ✨ Core Features & Recent Updates

### 1. 📊 Real-Time Progress Verification
*   **DSA Practice Sheets**: Categorized coding problems (e.g., Arrays, Strings, DP) with interactive visual completion bars and progress rings.
*   **Persistent State**: Toggling a problem to "Done" or "Bookmarked" instantly updates the backend PostgreSQL database and syncs your progress rings across the platform in real-time.

### 2. 👤 Immersive 3D User Profiles
*   **Glassmorphism Design**: A stunning, premium profile dashboard built with Framer Motion, featuring 3D hover effects, dynamic gradients, and smooth entry animations.
*   **Profile Customization**: Users can easily edit their bio, nickname, and connect social links (GitHub, LinkedIn, Twitter, Personal Website).

### 3. 🏆 Event-Driven Badges Engine
*   **RabbitMQ Integration**: The platform utilizes an asynchronous message broker (RabbitMQ). When you solve a problem in the `dsa-service`, a `ProblemSolvedEvent` is broadcasted.
*   **Automated Rewards**: The `user-service` consumes these events in the background to seamlessly increment your global score, update streaks, and evaluate if you've unlocked new achievements.
*   **Visual Badges**: Earned badges (like "First Blood" or "Array Master") are prominently displayed on your 3D profile with beautiful, high-resolution icons.

### 4. 📅 Daily Challenge System (POTD)
*   **Problem of the Day**: A deterministic daily challenge selected from the curriculum. 
*   **Bonus Points**: Solving the POTD grants a massive score multiplier (+50 bonus points) to incentivize daily platform engagement.
*   **Dashboard Widget**: A prominent, beautifully styled POTD banner greets users on the main dashboard, providing a one-click gateway to the practice IDE.

### 5. 💻 In-Browser IDE & Isolated Execution
*   **Interactive Code Editor**: Syntax highlighting, multi-language support, and customizable themes.
*   **Secure Execution**: Isolated, secure code compilation and execution using the Judge0 sandbox engine.

---

## 🛠️ Getting Started (Local Development)

### Prerequisites
*   [Docker Desktop](https://www.docker.com/products/docker-desktop)
*   [Java 21+](https://adoptium.net/)
*   [Maven](https://maven.apache.org/)
*   [Node.js 18+](https://nodejs.org/)

### 1. Spin up the Infrastructure
To start the required databases (PostgreSQL, Redis), the RabbitMQ message broker, and the Judge0 Sandbox, run the following from the root directory:
```bash
docker-compose up -d
```
> **Note**: The first time you run this, Docker will download massive images for Judge0. This may take 10-20 minutes. Subsequent startups will be instant.

### 2. Start the Backend Microservices
Ensure the Docker containers are healthy. The database schema migrations (Flyway) will automatically run when you start the services.

Open a terminal in the `backend/` directory:
```bash
cd backend
mvn clean install
# You will need to run the Main class for each microservice 
# (e.g., API Gateway, User Service, LMS Service, DSA Service) via your IDE or terminal.
```

### 3. Start the Frontend
Open a terminal in the `frontend/` directory:
```bash
cd frontend
npm install
npm run dev
```
The application will be accessible at `http://localhost:3000`.

---

## 🗄️ Database Schema & Migrations

Database tables are localized to their respective microservices to maintain clean domain boundaries, but they share a single PostgreSQL instance (`byteascend_db`) for ease of development. 

Migrations are located in `src/main/resources/db/migration` inside each service (e.g., `user-service`, `lms-service`, `dsa-service`) and are executed automatically via Flyway on service startup.
