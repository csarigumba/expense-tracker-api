# Expense Tracker API - cURL Commands

This document provides ready-to-use cURL commands for testing the Expense Tracker API endpoints.

## Base URL

```bash
BASE_URL="http://localhost:3005"
```

## Prerequisites

Before running these commands, make sure:

1. **MongoDB is running** (if using Docker):

   ```bash
   docker-compose up -d
   ```

2. **The API server is running**:

   ```bash
   npm run dev
   ```

3. **Test server connectivity**:
   ```bash
   curl -X GET $BASE_URL/health
   # Should return: {"status":"OK","message":"Expense Tracker API is running"}
   ```

## Health Check

```bash
curl -X GET $BASE_URL/health
```

## Authentication

### Register User

```bash
curl -X POST $BASE_URL/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Login User

```bash
curl -X POST $BASE_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

**Note:** Save the JWT token from the response for use in protected endpoints.

## Expenses (Protected Routes)

### Set JWT Token

First, set your JWT token as a variable:

```bash
JWT_TOKEN="your-jwt-token-here"
```

### Create Expense

```bash
curl -X POST $BASE_URL/expenses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -d '{
    "amount": 25.50,
    "category": "Groceries",
    "description": "Weekly grocery shopping",
    "date": "2025-07-14T10:00:00Z"
  }'
```

### Get All Expenses

```bash
curl -X GET $BASE_URL/expenses \
  -H "Authorization: Bearer $JWT_TOKEN"
```

### Get Expenses with Pagination

```bash
curl -X GET "$BASE_URL/expenses?page=1&limit=5" \
  -H "Authorization: Bearer $JWT_TOKEN"
```

### Get Expenses - Filter by Time Period

#### Past Week

```bash
curl -X GET "$BASE_URL/expenses?period=week" \
  -H "Authorization: Bearer $JWT_TOKEN"
```

#### Past Month

```bash
curl -X GET "$BASE_URL/expenses?period=month" \
  -H "Authorization: Bearer $JWT_TOKEN"
```

#### Past 3 Months

```bash
curl -X GET "$BASE_URL/expenses?period=3months" \
  -H "Authorization: Bearer $JWT_TOKEN"
```

#### Custom Date Range

```bash
curl -X GET "$BASE_URL/expenses?period=custom&startDate=2025-01-01&endDate=2025-07-14" \
  -H "Authorization: Bearer $JWT_TOKEN"
```

### Get Expenses - Filter by Category

```bash
curl -X GET "$BASE_URL/expenses?category=Groceries" \
  -H "Authorization: Bearer $JWT_TOKEN"
```

### Get Expenses - Combined Filters

```bash
curl -X GET "$BASE_URL/expenses?period=month&category=Health&page=1&limit=10" \
  -H "Authorization: Bearer $JWT_TOKEN"
```

### Update Expense

```bash
EXPENSE_ID="expense-id-here"

curl -X PUT $BASE_URL/expenses/$EXPENSE_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -d '{
    "amount": 30.00,
    "category": "Health",
    "description": "Updated description"
  }'
```

### Delete Expense

```bash
EXPENSE_ID="expense-id-here"

curl -X DELETE $BASE_URL/expenses/$EXPENSE_ID \
  -H "Authorization: Bearer $JWT_TOKEN"
```

## Complete Test Flow

Here's a complete flow to test the API:

### 1. Register a new user

```bash
curl -X POST $BASE_URL/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "testpass123"
  }'
```

### 2. Login and get token

```bash
RESPONSE=$(curl -s -X POST $BASE_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "testpass123"
  }')

# Extract token (requires jq)
JWT_TOKEN=$(echo $RESPONSE | jq -r '.token')
echo "JWT Token: $JWT_TOKEN"
```

### 3. Create some test expenses

```bash
# Expense 1
curl -X POST $BASE_URL/expenses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -d '{
    "amount": 50.00,
    "category": "Groceries",
    "description": "Weekly groceries"
  }'

# Expense 2
curl -X POST $BASE_URL/expenses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -d '{
    "amount": 25.99,
    "category": "Health",
    "description": "Pharmacy visit"
  }'

# Expense 3
curl -X POST $BASE_URL/expenses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -d '{
    "amount": 15.50,
    "category": "Leisure",
    "description": "Coffee and snacks"
  }'
```

### 4. Get all expenses

```bash
curl -X GET $BASE_URL/expenses \
  -H "Authorization: Bearer $JWT_TOKEN"
```

### 5. Filter expenses

```bash
# Get only groceries
curl -X GET "$BASE_URL/expenses?category=Groceries" \
  -H "Authorization: Bearer $JWT_TOKEN"

# Get expenses from past week
curl -X GET "$BASE_URL/expenses?period=week" \
  -H "Authorization: Bearer $JWT_TOKEN"
```

## Categories

Valid expense categories for testing:

- Groceries
- Leisure
- Electronics
- Utilities
- Clothing
- Health
- Others

## Error Testing

### Invalid Registration (Missing Password)

```bash
curl -X POST $BASE_URL/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com"
  }'
```

### Invalid Login

```bash
curl -X POST $BASE_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "wrongpassword"
  }'
```

### Unauthorized Access (No Token)

```bash
curl -X GET $BASE_URL/expenses
```

### Invalid Expense Data

```bash
curl -X POST $BASE_URL/expenses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -d '{
    "amount": -10,
    "category": "InvalidCategory",
    "description": ""
  }'
```

## Tips

1. **Pretty Print JSON**: Add `-s | jq` to format JSON responses:

   ```bash
   curl -X GET $BASE_URL/expenses -H "Authorization: Bearer $JWT_TOKEN" -s | jq
   ```

2. **Save Response**: Save response to file:

   ```bash
   curl -X GET $BASE_URL/expenses -H "Authorization: Bearer $JWT_TOKEN" -o expenses.json
   ```

3. **Include Headers**: See response headers:

   ```bash
   curl -X GET $BASE_URL/expenses -H "Authorization: Bearer $JWT_TOKEN" -i
   ```

4. **Verbose Output**: See full request/response:
   ```bash
   curl -X GET $BASE_URL/expenses -H "Authorization: Bearer $JWT_TOKEN" -v
   ```

## Troubleshooting

### "Cannot POST /auth/register" Error

If you get an HTML error page instead of JSON:

1. **Check if server is running**:

   ```bash
   curl -X GET $BASE_URL/health
   ```

2. **Restart the server**:

   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

3. **Check the correct port**: Make sure you're using the right port (check your .env file)

### "Command find requires authentication" Error

This MongoDB authentication error can be resolved by:

1. **Using local MongoDB without auth**:

   ```bash
   # In .env file
   MONGODB_URI=mongodb://localhost:27017/expense-tracker
   ```

2. **Using Docker MongoDB**:

   ```bash
   # Start Docker MongoDB
   docker-compose up -d

   # Use Docker connection in .env
   MONGODB_URI=mongodb://admin:password@localhost:27017/expense-tracker?authSource=admin
   ```

3. **Or use the .env.docker file**:
   ```bash
   cp .env.docker .env
   ```
