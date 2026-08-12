# TaskSocial 🚀

A minimal, full-stack public accountability social stream built to help creators, developers, and writers commit to and stick to their daily goals.

## How It Works

1. **Public Timelines:** Sign up for a custom handle and commit your daily tasks to an open log.
2. **Zero Secret Slacking:** Every task is permanently locked to your verified account database ID.
3. **Real-Time Consistency:** Toggle tasks to "completed" or delete entries with instant reactive cache feedback.

## The Technical Architecture Under the Hood

This application was engineered as a decoupled full-stack architecture with production-grade security overrides:

- **The Authentication Engine:** Uses a custom Express `protectedRoute` middleware guard. Passwords are encrypted via an async pre-save hashing filter (`bcrypt`), and sessions are maintained securely via `jsonwebtoken` (JWT) passed through **HttpOnly browser cookies** to stop XSS script injection vulnerabilities.
- **Data Association:** Tasks and Users are dynamically cross-referenced in MongoDB via `Schema.Types.ObjectId` links. The main feed maps relationships cleanly using Mongoose `.populate()`.
- **Backend Safety Layers:** Mutation endpoints check user permissions explicitly (`task.author.toString() === req.user._id.toString()`) to prevent parameter hijacking.
- **The Frontend Data Layer:** Built with Vite React and uses **Zod validation schemas** paired with `react-hook-form`. Global UI state is tracked using **Zustand**, and database endpoints are queried and cached using **TanStack Query** (`useQuery` / `useMutation`) for instant lag-free layout renders.

## Local Development Setup

1. Clone the repository.
2. Install dependencies in both backend and frontend directories using `npm install`.
3. Configure your local `.env` variables (`PORT`, `MONGODB_URI`, `JWT_SECRET`).
4. Run `npm run dev` in both terminals to launch the hot-reloading streams.

Created by Mohammad Shahzeb Alam. Always learning. Always contributing.
