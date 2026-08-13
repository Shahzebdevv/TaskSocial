# TaskSocial🚀

TaskSocial is a full-stack social accountability app where users can share the tasks they are working on and keep each other accountable.

Instead of keeping goals completely private, TaskSocial lets users share their progress through a common feed.

## Features

- User registration and login
- JWT-based authentication
- HttpOnly cookies for storing authentication tokens
- Password hashing with bcrypt
- Create, update, and delete tasks
- View your own tasks
- View tasks shared across the platform
- Task status tracking
- Protected API routes
- Task ownership checks
- MongoDB data storage

## Tech Stack

### Frontend

- React
- JavaScript
- Tailwind CSS
- TanStack Query
- React Router

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token
- bcrypt
- cookie-parser
- dotenv

### Development Tools

- Git
- GitHub
- Postman
- Nodemon

## How It Works

TaskSocial follows a client-server architecture.

```text
React Frontend
      ↓
   API Request
      ↓
 Express Routes
      ↓
  Controllers
      ↓
   Mongoose
      ↓
   MongoDB
      ↓
   Response
      ↓
React Frontend
```

The frontend communicates with the backend through REST API endpoints.

The backend handles authentication, authorization, task operations, and communication with MongoDB.

## Authentication

TaskSocial uses JWT-based authentication.

When a user registers, their password is hashed using bcrypt before it is stored in MongoDB.

During login:

```text
User enters credentials
        ↓
Backend finds the user
        ↓
bcrypt verifies the password
        ↓
JWT is created
        ↓
JWT is stored in an HttpOnly cookie
```

Protected routes use middleware to verify the JWT before allowing the request to continue.

```text
Request
   ↓
Authentication cookie
   ↓
JWT verification
   ↓
Authenticated user
   ↓
Controller
```

The HttpOnly cookie prevents client-side JavaScript from directly reading the authentication token.

## Task Ownership

Each task is associated with the user who created it.

When a user tries to update or delete a task, the backend checks whether the authenticated user owns that task.

This prevents one authenticated user from modifying another user's tasks.

## API Endpoints

### Authentication

| Method | Endpoint | Authentication |
| --- | --- | --- |
| `POST` | `/api/v1/auth/register` | Not required |
| `POST` | `/api/v1/auth/login` | Not required |
| `POST` | `/api/v1/auth/logout` | Not required |

### Tasks

| Method | Endpoint | Authentication |
| --- | --- | --- |
| `POST` | `/api/v1/tasks/create` | Required |
| `GET` | `/api/v1/tasks/my-tasks` | Required |
| `GET` | `/api/v1/tasks/feed` | Required |
| `PUT` | `/api/v1/tasks/:id` | Required |
| `DELETE` | `/api/v1/tasks/:id` | Required |

## Backend Structure

```text
Backend/
└── src/
    ├── config/
    │   └── database.js
    ├── controllers/
    │   ├── task.controller.js
    │   └── user.controller.js
    ├── middlewares/
    │   └── auth.middleware.js
    ├── models/
    │   ├── task.model.js
    │   └── user.model.js
    ├── routes/
    │   ├── auth.route.js
    │   └── task.route.js
    ├── app.js
    └── index.js
```

The backend separates routes, controllers, middleware, models, and database configuration so each part has a clear responsibility.

## Environment Variables

Create a `.env` file inside the backend project and add:

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

Do not commit your `.env` file or expose your MongoDB connection string and JWT secret publicly.

## Running Locally

Clone the repository:

```bash
git clone https://github.com/Shahzebdevv/TaskSocial.git
cd TaskSocial
```

Install the backend dependencies:

```bash
npm install
```

Create your `.env` file using the variables shown above.

### Start the development server

```bash
npm run dev
```

The development server runs using Nodemon and starts the application from:

```text
src/index.js
```

### Start the application

For a normal start without Nodemon:

```bash
npm start
```

The backend runs on the port specified in your `.env` file.

With the default configuration:

```text
http://localhost:4000
```

## Testing the API

You can use Postman to test the API endpoints.

For example, you can test the authentication flow by:

1. Registering a new user.
2. Logging in with the registered credentials.
3. Checking the authentication cookie.
4. Calling a protected endpoint.
5. Logging out.

You can also test task operations such as creating, updating, fetching, and deleting tasks.

## Authentication Flow

The authentication flow can be summarized as:

```text
Register
   ↓
Hash password with bcrypt
   ↓
Store user in MongoDB
```

After registration, the user can log in:

```text
Login
   ↓
Find user
   ↓
Compare password with bcrypt
   ↓
Create JWT
   ↓
Store JWT in HttpOnly cookie
```

When the user accesses a protected route:

```text
Request
   ↓
Read authentication cookie
   ↓
Verify JWT
   ↓
Identify user
   ↓
Allow request
```

## Task Flow

A task is created through the API and associated with the authenticated user.

```text
Authenticated request
        ↓
Express route
        ↓
Authentication middleware
        ↓
Task controller
        ↓
Mongoose
        ↓
MongoDB
```

When updating or deleting a task, the backend also checks whether the task belongs to the authenticated user.

## What I Learned

Building TaskSocial helped me understand backend development by connecting the individual pieces into one application.

While building it, I worked with:

- REST API endpoints with Express
- Routes and controllers
- MongoDB and Mongoose
- Password hashing with bcrypt
- JWT-based authentication
- HttpOnly cookies
- Protected routes and middleware
- Task ownership and authorization
- API testing with Postman
- Connecting a React frontend to a backend API

The project also gave me a practical starting point for exploring API documentation and docs-as-code workflows.
