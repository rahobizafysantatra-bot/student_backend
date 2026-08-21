# Student Manager — Frontend

A simple React + TypeScript dashboard to manage students, connected to a REST API.

## Features

- Email/password authentication (login & signup)
- Create, read, update, and delete students
- Group-based statistics dashboard
- Protected routes (redirects to login if not authenticated)

## Tech Stack

- React 18 + TypeScript
- Vite
- React Router
- Axios

## Prerequisites

- Node.js >= 18
- The [backend API](#) running locally on port 3000

## Installation & Quick Start

\`\`\`bash
git clone https://github.com/TON_USERNAME/student-frontend.git
cd student-frontend
npm install
cp .env.example .env
npm run dev
\`\`\`

## Environment Variables

See \`.env.example\`:

\`\`\`
VITE_API_URL=http://localhost:3000/api
\`\`\`

## License

MIT