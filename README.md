# Records Management API

A backend API built with NestJS, TypeScript, PostgreSQL, and Prisma.

This project is a secure records management system where users can register, log in, and access protected routes using JWT authentication. It is being built as a backend portfolio project focused on authentication, authorization, database modeling, and clean API structure.

## Tech Stack
NestJS
TypeScript
PostgreSQL
Prisma
Docker Compose
bcrypt
JWT

## Features
User registration
Secure password hashing
User login
JWT access token generation
Protected routes using bearer token authentication
Current user endpoint
PostgreSQL database managed with Docker Compose
Prisma ORM for database access
User roles for future authorization features

## API Endpoints


| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Checks API status |
| POST | `/auth/register` | Creates a new user |
| POST | `/auth/login` | Logs in a user and returns a JWT |
| GET | `/auth/me` | Returns the current authenticated user |

## Authentication

Protected routes require a JWT access token.

After logging in, copy the `accessToken` from the login response and send it in the `Authorization` header:

```http
Authorization: Bearer jwt-access-token
```

Example protected request:

```http
GET /auth/me
Authorization: Bearer jwt-access-token
```


## Local Development

Start the PostgreSQL database:

docker compose up -d

Start the development server:

npm run start:dev

Stop the database:

docker compose down
Environment Variables

Create a .env file in the project root:

DATABASE_URL="postgresql://records_user26:records_password26@localhost:5432/records_management?schema=public"
JWT_SECRET="your-local-jwt-secret"

The .env file is ignored by Git and should not be committed.

# Planned Features
User profiles
Profile update routes
Role-based authorization
Admin-only routes
User-owned records
Request validation
Rate limiting for authentication routes
API documentation
