# Expense Tracker API

A RESTful API for managing personal expenses with user authentication, built with Node.js, Express, and MongoDB.

## Features

- User registration and authentication using JWT
- Create, read, update, and delete expenses
- Filter expenses by time periods (week, month, 3 months, custom range)
- Filter expenses by category
- Pagination support
- Input validation and error handling

## Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (or Docker for containerized setup)
- npm

### Installation

#### Option 1: Local Development

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:

   ```
   JWT_SECRET=your-super-secret-jwt-key-here
   MONGODB_URI=mongodb://localhost:27017/expense-tracker
   PORT=3000
   ```

4. Start the server:
   ```bash
   npm run dev  # for development
   npm start    # for production
   ```

#### Option 2: Docker Setup

1. Clone the repository
2. Start MongoDB with Docker Compose:

   ```bash
   docker-compose up -d
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Use the Docker environment file:

   ```bash
   cp .env.docker .env
   ```

5. Start the server:
   ```bash
   npm run dev  # for development
   npm start    # for production
   ```

#### Docker Services

The Docker Compose setup includes:

- **MongoDB**: Database server (port 27017)
- **Mongo Express**: Web-based MongoDB admin interface (port 8081)

Access Mongo Express at: http://localhost:8081

#### Docker Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs mongodb

# Remove volumes (clears database)
docker-compose down -v
```

## API Endpoints

### Authentication

#### Register User

- **POST** `/auth/register`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User created successfully",
    "token": "jwt-token-here",
    "user": {
      "id": "user-id",
      "email": "user@example.com"
    }
  }
  ```

#### Login User

- **POST** `/auth/login`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Login successful",
    "token": "jwt-token-here",
    "user": {
      "id": "user-id",
      "email": "user@example.com"
    }
  }
  ```

### Expenses (Protected Routes)

All expense endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

#### Create Expense

- **POST** `/expenses`
- **Body:**
  ```json
  {
    "amount": 25.5,
    "category": "Groceries",
    "description": "Weekly grocery shopping",
    "date": "2025-07-14T10:00:00Z"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Expense created successfully",
    "expense": {
      "id": "expense-id",
      "amount": 25.5,
      "category": "Groceries",
      "description": "Weekly grocery shopping",
      "date": "2025-07-14T10:00:00Z",
      "userId": "user-id"
    }
  }
  ```

#### Get Expenses

- **GET** `/expenses`
- **Query Parameters:**
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 10)
  - `period` (optional): Filter by time period (`week`, `month`, `3months`, `custom`)
  - `startDate` (optional): Start date for custom period (ISO 8601 format)
  - `endDate` (optional): End date for custom period (ISO 8601 format)
  - `category` (optional): Filter by category
- **Response:**
  ```json
  {
    "expenses": [
      {
        "id": "expense-id",
        "amount": 25.5,
        "category": "Groceries",
        "description": "Weekly grocery shopping",
        "date": "2025-07-14T10:00:00Z",
        "userId": "user-id"
      }
    ],
    "pagination": {
      "total": 1,
      "page": 1,
      "totalPages": 1,
      "hasNext": false,
      "hasPrev": false
    }
  }
  ```

#### Update Expense

- **PUT** `/expenses/:id`
- **Body:**
  ```json
  {
    "amount": 30.0,
    "category": "Health",
    "description": "Updated description"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Expense updated successfully",
    "expense": {
      "id": "expense-id",
      "amount": 30.0,
      "category": "Health",
      "description": "Updated description",
      "date": "2025-07-14T10:00:00Z",
      "userId": "user-id"
    }
  }
  ```

#### Delete Expense

- **DELETE** `/expenses/:id`
- **Response:**
  ```json
  {
    "message": "Expense deleted successfully"
  }
  ```

## Categories

Valid expense categories:

- Groceries
- Leisure
- Electronics
- Utilities
- Clothing
- Health
- Others

## Error Handling

The API returns consistent error responses:

```json
{
  "message": "Error description",
  "errors": ["Specific error details"]
}
```

Common HTTP status codes:

- 200: Success
- 201: Created
- 400: Bad Request (validation errors)
- 401: Unauthorized (authentication required)
- 404: Not Found
- 500: Internal Server Error

## Health Check

- **GET** `/health`
- **Response:**
  ```json
  {
    "status": "OK",
    "message": "Expense Tracker API is running"
  }
  ```
