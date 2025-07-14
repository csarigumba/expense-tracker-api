# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an **Expense Tracker API** - a Node.js/Express.js backend service that provides JWT-authenticated expense management functionality. The API allows users to register, authenticate, and perform CRUD operations on their personal expenses with filtering capabilities.

## Standard Workflow

1. First think through the problem, read the codebase for relevant files, and write a plan to tasks/todo.md
2. The plan should have a list of todo items that you can check off as you complete them
3. Before you begin working, check in with the user to verify the plan
4. Then, begin working on the todo items, marking them as complete as you go
5. Please every step of the way just give me a high level explanation of what changes you made
6. Make every task and code change you do as simple as possible. We want to avoid making any massive or complex changes. Every change should impact as little code as possible. Everything is about simplicity
7. Finally, add a review section to the todo.md file with a summary of the changes you made and any other relevant information

## Architecture & Tech Stack

- **Backend Framework**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ORM
- **Authentication**: JWT (JSON Web Token) for stateless authentication
- **Package Manager**: npm

## Data Models

### User Model

- `_id`: ObjectId
- `email`: String (unique)
- `password`: String (hashed)
- `createdAt`, `updatedAt`: Date

### Expense Model

- `_id`: ObjectId
- `userId`: ObjectId (ref: User)
- `amount`: Number
- `category`: String (enum: Groceries, Leisure, Electronics, Utilities, Clothing, Health, Others)
- `description`: String
- `date`: Date
- `createdAt`, `updatedAt`: Date

## API Endpoints Structure

### Authentication Routes

- `POST /auth/register` - User registration
- `POST /auth/login` - User authentication

### Expense Routes (JWT Protected)

- `GET /expenses` - List user expenses with filtering
- `POST /expenses` - Create new expense
- `PUT /expenses/:id` - Update existing expense
- `DELETE /expenses/:id` - Delete expense

### Query Parameters for Filtering

- `period`: `week` | `month` | `3months` | `custom`
- `startDate`: ISO date string (for custom period)
- `endDate`: ISO date string (for custom period)
- `category`: Filter by expense category

## Environment Variables

Required environment variables:

- `JWT_SECRET`: Secret key for JWT token signing
- `MONGODB_URI`: MongoDB connection string
- `PORT`: Server port (optional, defaults to 3000)

## Security Requirements

- All expense endpoints must be JWT-protected
- Users can only access their own expense data
- Passwords must be hashed before storing
- JWT tokens should have reasonable expiration times

## Development Commands

Once the project is initialized with package.json:

- `npm install` - Install dependencies
- `npm start` - Start the server
- `npm run dev` - Start development server with hot reload (if nodemon is configured)
- `npm test` - Run tests (once test setup is complete)

## Performance Requirements

- API responses should be returned in < 200ms
- Support multiple concurrent users
- Implement pagination for expense listing

## Project Structure Recommendations

```
/
├── src/
│   ├── models/          # Mongoose models (User, Expense)
│   ├── routes/          # Express routes (auth, expenses)
│   ├── middleware/      # JWT authentication middleware
│   ├── controllers/     # Route handlers
│   ├── utils/           # Helper functions
│   └── app.js           # Express app setup
├── tests/               # Test files
├── .env                 # Environment variables
└── server.js            # Entry point
```

## Development Milestones

1. **Project Setup**: Initialize npm, install dependencies, setup MongoDB connection
2. **Authentication System**: User registration, login, JWT implementation
3. **Expense CRUD**: Basic expense create, read, update, delete operations
4. **Filtering & Pagination**: Implement time-based filtering and pagination
5. **Testing**: Unit tests for all endpoints and middleware
