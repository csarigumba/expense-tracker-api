# **Product Requirements Document (PRD)**

## **Expense Tracker API**

---

### **1. Project Overview**

**Title:** Expense Tracker API
**Difficulty Level:** Easy
**Type:** Backend Service
**Owner:** Development Team
**Target Users:** Web/Mobile Applications needing expense management functionality
**Primary Goal:** Provide a secure, authenticated API for tracking and managing personal expenses with filtering capabilities.

---

### **2. Purpose and Scope**

The service aims to:

- Provide user registration and authentication using JWT tokens.
- Allow users to create, read, update, and delete their personal expenses.
- Offer flexible filtering options for expense history analysis.
- Support categorized expense tracking across multiple predefined categories.

This API will serve as the backend foundation for expense management applications, ensuring secure user data handling and efficient expense operations.

---

### **3. Features and Requirements**

#### **3.1 Functional Requirements**

| ID  | Feature                  | Description                                                                     |
| --- | ------------------------ | ------------------------------------------------------------------------------- |
| FR1 | User registration        | Allow new users to create accounts with email and password.                     |
| FR2 | User authentication      | Generate and validate JWT tokens for secure API access.                        |
| FR3 | Expense creation         | Add new expenses with amount, category, description, and date.                  |
| FR4 | Expense listing          | Retrieve user's expenses with pagination support.                              |
| FR5 | Expense filtering        | Filter expenses by time periods (past week, month, 3 months, custom range).    |
| FR6 | Expense updates          | Modify existing expense details.                                                |
| FR7 | Expense deletion         | Remove existing expenses from user's account.                                  |
| FR8 | Category management      | Support predefined expense categories for organization.                         |

#### **3.2 Non-Functional Requirements**

| ID   | Requirement | Description                                            |
| ---- | ----------- | ------------------------------------------------------ |
| NFR1 | Security    | All expense endpoints must be JWT-protected.           |
| NFR2 | Performance | API responses should be returned in < 200ms.           |
| NFR3 | Scalability | Service should support multiple concurrent users.      |
| NFR4 | Data Privacy| Users can only access their own expense data.         |

---

### **4. User Flow**

1. User registers with email and password.
2. User authenticates and receives JWT token.
3. User includes JWT token in Authorization header for all requests.
4. User can:
   - Create new expenses with category selection
   - View expense history with optional filters
   - Update existing expenses
   - Delete unwanted expenses

---

### **5. Technical Design**

- **Authentication:** JWT (JSON Web Token) for stateless authentication.
- **Database:** MongoDB with Mongoose ORM for data modeling.
- **Languages/Frameworks:** Node.js with Express.js framework.
- **Expense Categories:** 
  - Groceries
  - Leisure
  - Electronics
  - Utilities
  - Clothing
  - Health
  - Others
- **Environment Variables:**
  - `JWT_SECRET`
  - `MONGODB_URI`
  - `PORT`

---

### **6. API Specification**

#### **Authentication Endpoints**
- `POST /auth/register` - User registration
- `POST /auth/login` - User authentication

#### **Expense Endpoints** (JWT Protected)
- `GET /expenses` - List user expenses with optional filters
- `POST /expenses` - Create new expense
- `PUT /expenses/:id` - Update existing expense
- `DELETE /expenses/:id` - Delete expense

#### **Filter Query Parameters**
- `period`: `week` | `month` | `3months` | `custom`
- `startDate`: ISO date string (required for custom period)
- `endDate`: ISO date string (required for custom period)
- `category`: Filter by expense category

**Example Response:**
```json
{
  "expenses": [
    {
      "id": "507f1f77bcf86cd799439011",
      "amount": 25.50,
      "category": "Groceries",
      "description": "Weekly grocery shopping",
      "date": "2025-07-14T10:00:00Z",
      "userId": "507f1f77bcf86cd799439012"
    }
  ],
  "total": 1,
  "page": 1,
  "totalPages": 1
}
```

---

### **7. Data Models**

#### **User Model**
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

#### **Expense Model**
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  amount: Number,
  category: String (enum: categories),
  description: String,
  date: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

### **8. Constraints & Assumptions**

- Assumes MongoDB is available and accessible.
- JWT tokens will have reasonable expiration times for security.
- Users are responsible for managing their own expense data.
- Project will use Node.js with npm for package management.

---

### **9. Milestones**

| Milestone | Description                               | ETA   |
| --------- | ----------------------------------------- | ----- |
| M1        | Project setup & database configuration   | Day 1 |
| M2        | User authentication system               | Day 2 |
| M3        | Basic expense CRUD operations            | Day 3 |
| M4        | Expense filtering and pagination         | Day 4 |
| M5        | Testing & Documentation                  | Day 5 |