# ByteAscend - EdTech Learning & Coding Platform

ByteAscend is a comprehensive, production-grade EdTech platform built for programming education, Data Structures & Algorithms (DSA) tracking, and tech interview preparation. It is designed with a modern, highly scalable microservices architecture to handle heavy traffic and concurrent code execution seamlessly.

---

## 🚀 Tech Stack

### Frontend
*   **Framework**: Next.js 14 (App Router)
*   **Language**: TypeScript
*   **Styling**: TailwindCSS

### Backend (Microservices)
*   **Framework**: Spring Boot 3.x
*   **API Gateway**: Spring Cloud Gateway
*   **Database**: PostgreSQL
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
2.  **`user-service`**: Manages Identity & Access Management (IAM), Authentication, RBAC (Free, Basic, Plus, Pro), Gamification (Streaks/Scores), and Monetization/Subscriptions.
3.  **`lms-service`**: The Learning Management System. Serves courses, modules, video lessons (via YouTube embeds), and tracks user video watch progress. Also houses the Community features (Interview Experiences, Mock Tests).
4.  **`dsa-service`**: Manages the DSA problem repository, categorized tracking (Solved/Attempted/Bookmarked), test cases, and user code submissions.
5.  **`execution-service`**: Interfaces with the Judge0 Docker environment to execute untrusted user code safely. Checks Redis for daily execution and AI token limits based on the user's subscription tier.

---

## ✨ Core Features

*   **Role-Based Access Control (RBAC)**: Differentiates content and execution limits across Free, Basic, Plus, and Pro users.
*   **Video LMS & Theory**: Structured course catalog with video tracking and rich-text theory articles.
*   **DSA Practice Sheets**: Categorized coding problems with visual completion bars.
*   **In-Browser IDE**: Interactive code editor supporting multi-language syntax highlighting.
*   **Isolated Code Execution**: Secure code compilation and execution using Judge0.
*   **Gamification**: Real-time stats, streak counters, and score progression.
*   **Community Hub**: Interview experiences, system design breakdowns, and timed mock tests.

---

## 🛠️ Getting Started (Local Development)

### Prerequisites
*   [Docker Desktop](https://www.docker.com/products/docker-desktop)
*   [Java 21+](https://adoptium.net/)
*   [Maven](https://maven.apache.org/)
*   [Node.js 18+](https://nodejs.org/)

### 1. Spin up the Infrastructure
To start the required databases (PostgreSQL, Redis) and the Judge0 Sandbox, run the following from the root directory:
```bash
docker-compose up -d
```
> **Note**: The first time you run this, Docker will download massive images for Judge0 (which contain compilers for dozens of languages). This may take 10-20 minutes depending on your internet connection. Subsequent startups will be instant.

### 2. Start the Backend Microservices
Ensure the Docker containers are healthy. The database schema migrations (Flyway) will automatically run when you start the services.

Open a terminal in the `backend/` directory:
```bash
cd backend
mvn clean install
# You will need to run the Main class for each microservice 
# (e.g., API Gateway, User Service, LMS Service, etc.) via your IDE or terminal.
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
