# Sweet Shop Management System

**TDD Kata – Full Stack Application**

---

## Project Overview

The **Sweet Shop Management System** is a full-stack web application designed to manage sweets inventory, purchases, and administration. The system supports **role-based access control**, secure authentication, inventory tracking, and search/filter functionality.

This project was developed as part of a **Test-Driven Development (TDD) Kata**, with emphasis on clean architecture, maintainability, and real-world backend–frontend integration. All local commits are included in file:Local_Commits and a screenshot of log is added in screenshot section.

---

## Features

### Authentication & Authorization

- User registration and login
- JWT-based authentication
- Role-based access control (Admin and User)

### Sweets Management

- Add, update, and delete sweets (Admin only)
- View all available sweets
- Each sweet contains:
  - Unique ID
  - Name
  - Category
  - Price
  - Quantity in stock

### Inventory Management

- Purchase sweets (Users)
- Restock sweets (Admins)
- Validation to prevent negative inventory

### Search & Filter

- Search sweets by name (case-insensitive)
- Filter sweets by category
- Filter sweets by price range
- Combine multiple filters

### Admin Access Design

Admin access is not selectable or configurable from the frontend UI by design.

#### How Admin Users Are Created

- Admin privileges are assigned only during registration
- This is done by setting the `isAdmin` flag when a user is created (typically via backend setup or controlled registration)
- Example: Admin users are created by passing `isAdmin: true` during registration in a secure or controlled context

#### Why Admin Cannot Be Selected in the UI

- Allowing users to self-select admin access from the frontend would be a security risk
- Admin capabilities (adding, updating, deleting sweets, restocking inventory) are protected by:
  - JWT authentication
  - Backend role verification middleware

This design ensures:

- Regular users cannot escalate privileges
- Admin actions are fully protected at the API level
- Role-based access control is enforced server-side

### Testing

This project follows a test-driven and test-validated approach for backend functionality. Automated tests are written using Jest and Supertest, and they run against a SQLite in-memory database when the environment is set to test.

#### Test Environment

- When `NODE_ENV=test`, the application uses SQLite (in-memory)
- For development and production, the application uses PostgreSQL
- This ensures tests are isolated, fast, and do not affect real data

#### Test Files Included

The following backend test files are included in the final submission:

**auth.test.js**
- Verifies user registration
- Verifies login and JWT token generation

**sweet.test.js**
- Verifies creation of sweets (admin only)
- Verifies fetching all available sweets
- Verifies searching sweets by name

**inventory.test.js**
- Verifies purchasing a sweet (quantity decreases)
- Verifies restocking a sweet (quantity increases)

#### Test Results

- All backend tests pass successfully
- Tests validate authentication, authorization, inventory logic, and data persistence
- Test execution uses an isolated SQLite database to ensure reliability and repeatability

### Notes

- Some route and data model choices were intentionally kept simple once the core functionality was stable; in particular, sweets are identified by name instead of numeric IDs to avoid unnecessary refactoring while preserving correctness and testability.
- The backend purchase API supports variable quantities, but the frontend intentionally limits purchases to one item per action to keep the user experience simple and focused.

---

## Tech Stack

### Backend

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JSON Web Tokens (JWT)
- Jest

### Frontend

- React (Vite)
- Axios
- React Router
- Context API
- Custom CSS (no Tailwind)

---

## Project Structure

```
sweet-shop-management/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middlewares/
│   ├── tests/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── components/
│   │   └── index.css
│
└── README.md
```

---

## Setup Instructions

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
DB_NAME=sweetshop
DB_USER=postgres
DB_PORT=5432
DB_PASSWORD=strong_password
DB_HOST=localhost
JWT_SECRET=strong_secret_key
PORT=5000
```

Can be shortened after making changes in db.js to:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/sweetshop
JWT_SECRET=your_secret_key
```

Run the backend server:

```bash
node server.js
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

- Frontend URL: `http://localhost:5173`
- Backend URL: `http://localhost:5000`

---

## API Endpoints

### Authentication

```
POST /api/auth/register
POST /api/auth/login
```

### Sweets (Protected)

```
GET    /api/sweets
GET    /api/sweets/search
POST   /api/sweets           (Admin only)
PUT    /api/sweets/:name     (Admin only)
DELETE /api/sweets/:name     (Admin only)
```

### Inventory

```
POST /api/sweets/:name/purchase
POST /api/sweets/:name/restock   (Admin only)
```

Note: Inventory functionality is also exposed under `/api/inventory` as alias routes for backward compatibility.

---

## Running Tests

```bash
cd backend
npm test
```

Test results are displayed in the console using Jest.

---

## Screenshots

### 1. Login and Registration

This screen allows users to register a new account or log in using their credentials. It validates user input and securely authenticates users using JWT-based authentication.

![Login and Registration](screenshots/login.png)

### 2. User Dashboard

The user dashboard provides an overview of user activities, available products, order history, and account-related actions in a structured interface.

![User Dashboard](screenshots/user-dashboard.png)

### 3. Admin Dashboard

The admin dashboard enables administrators to manage users, monitor system activity, and perform high-level operations such as inventory control and reporting.

![Admin Dashboard](screenshots/admin-dashboard.png)

### 4. Inventory Management

This interface allows admins to add, update, delete, and view items in the inventory. It ensures real-time synchronization with the database.

![Inventory Management](screenshots/inventory-management.png)

### 5. Search and Filter Interface

The search and filter feature helps users quickly find items based on keywords, categories, price range, or availability.

![Search and Filter Interface](screenshots/search-filter.png)

### 6. Local Commit Log

Git commit logs generated directly from the local repository using Git.

![Local Commit Log](screenshots/commit.png)

---

## My AI Usage

AI tools were used extensively during the development of this project as **development assistance**, particularly because I am relatively new to React and modern full-stack workflows.

### How AI Was Used

- Understanding the problem statement and breaking it into smaller, manageable tasks
- Getting guidance on folder structure and overall project organization
- Generating initial boilerplate code for backend controllers and React components
- Debugging issues related to database schema changes, authentication, and API integration
- Refining validation logic and improving test cases
- Clarifying concepts related to React state management, JWT authentication, and Sequelize ORM

### My Contribution

- Designed and implemented the backend architecture
- Wrote and integrated all business logic for authentication, sweets, and inventory
- Manually connected frontend and backend APIs
- Fixed bugs, edge cases, and validation errors
- Refactored code for clarity, maintainability, and alignment with requirements
- Made architectural decisions such as route aliasing, role-based middleware, and schema evolution
- Ensured the project met all functional and non-functional kata requirements

AI was used strictly as a **tool to support learning and productivity**. All final decisions, integrations, and implementations were done by me.

---

## AI Usage and Commit Transparency

AI co-author trailers were **not added to individual Git commits** during development.

Instead, AI usage is **fully and explicitly documented in this README**, particularly in the **"My AI Usage"** section. This section provides a transparent explanation of where and how AI tools were used, as well as which parts of the work were implemented and decided by me.

This approach is intended to provide clear and honest disclosure of AI involvement, even though commit-level co-authorship was not applied.

---

## Key Learnings

- Designing and structuring a full-stack application
- Implementing secure JWT-based authentication
- Handling role-based access control
- Managing database schema evolution
- Integrating a React frontend with a RESTful backend
- Writing maintainable APIs and backend tests
- Using AI responsibly as a development aid

---

## Final Status

- All kata requirements implemented
- Backend and frontend fully functional
- Tests passing
- AI usage transparently documented

---

## Author

**Prince Sharma**

**Co-authored-by: ChatGPT <AI@users.noreply.github.com>**

This project was developed as part of a coding kata to demonstrate full-stack development skills, test-driven development practices, and the ability to build secure, role-based web applications.
