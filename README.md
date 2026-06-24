# CodeBattle 🚀

A real-time competitive coding platform where users can create or join battle rooms, solve coding problems, and compete against other players in live coding contests.

## Features

### 🎯 Real-Time Coding Battles

* Create and join battle rooms
* Multiplayer coding competitions
* Live standings and score tracking
* Real-time battle status updates using Socket.IO

### 💻 Online Code Editor

* Monaco Editor integration
* Multiple programming language support
* Run code against test cases
* Submit solutions for evaluation

### 🏆 Competitive Programming

* Topic-based problem selection
* Difficulty levels (Easy, Medium, Hard)
* Automated judging system
* Battle result summaries

### 👤 User Authentication

* JWT-based authentication
* User registration and login
* Protected routes
* User profiles

### ⚡ Backend Features

* RESTful API architecture
* Prisma ORM with PostgreSQL
* Redis for caching and real-time events
* Socket.IO for multiplayer communication

## Tech Stack

### Frontend

* React 19
* TypeScript
* Vite
* React Router
* Socket.IO Client
* Monaco Editor
* Tailwind CSS

### Backend

* Node.js
* Express.js
* TypeScript
* Prisma ORM
* PostgreSQL
* Redis
* Socket.IO
* JWT Authentication

## Project Structure

```text
CodeBattle/
├── apps/
│   ├── backend/
│   └── frontend/
├── packages/
│   └── shared/
├── docker/
├── docker-compose.yml
└── package.json
```

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/Codebattle.git
cd Codebattle
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Backend:

```bash
cd apps/backend
cp .env.example .env
```

Frontend:

```bash
cd apps/frontend
cp .env.example .env
```

### 4. Start PostgreSQL and Redis

```bash
docker-compose up -d
```

### 5. Setup Database

```bash
cd apps/backend

npx prisma generate
npx prisma db push
```

(Optional)

```bash
npx prisma studio
```

### 6. Run Backend

```bash
cd apps/backend
npm run dev
```

### 7. Run Frontend

Open a new terminal:

```bash
cd apps/frontend
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:4000
```

## Screenshots

* Home Page
* Create Room
* Join Room
* Coding Battle Interface
* Battle Results

## Future Enhancements

* Leaderboards
* Contest History
* AI-Based Problem Recommendations
* Advanced Analytics
* Team Battles
* Contest Scheduling

## Author

**Samreen Shaik**

GitHub: https://github.com/Samreenshaik715

## License

This project is licensed under the MIT License.
