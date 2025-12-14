```markdown
# Sweet Shop Management System

**TDD Kata – Full Stack Application**

---

## Project Overview

The **Sweet Shop Management System** is a full-stack web application designed to manage sweets inventory, purchases, and administration.
The system supports **role-based access control**, secure authentication, inventory tracking, and search/filter functionality.

This project was developed as part of a **Test-Driven Development (TDD) Kata**, with emphasis on clean architecture, maintainability, and real-world backend–frontend integration.

---

## Features

### Authentication & Authorization

* User registration and login
* JWT-based authentication
* Role-based access control (Admin and User)

### Sweets Management

* Add, update, and delete sweets (Admin only)
* View all available sweets
* Each sweet contains:

  * Unique ID
  * Name
  * Category
  * Price
  * Quantity in stock

### Inventory Management

* Purchase sweets (Users)
* Restock sweets (Admins)
* Validation to prevent negative inventory

### Search & Filter

* Search sweets by name (case-insensitive)
* Filter sweets by category
* Filter sweets by price range
* Combine multiple filters

### Testing

* Backend tests using Jest
* Core business logic developed following a TDD approach
* Tests covering sweets and inventory operations

---

## Tech Stack

### Backend

* Node.js
* Express.js
* PostgreSQL
* Sequelize ORM
* JSON Web Tokens (JWT)
* Jest

### Frontend

* React (Vite)
* Axios
* React Router
* Context API
* Custom CSS (no Tailwind)

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
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/sweetshop
JWT_SECRET=your_secret_key
```

Run the backend server:

```bash
node server.js
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

* Frontend URL: `http://localhost:5173`
* Backend URL: `http://localhost:5000`

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

* Login and Registration
* User Dashboard
* Admin Dashboard
* Inventory Management
* Search and Filter Interface

(Add screenshots here)

---

## My AI Usage

AI tools were used extensively during the development of this project as **development assistance**, particularly because I am relatively new to React and modern full-stack workflows.

### How AI was used

* Understanding the problem statement and breaking it into smaller, manageable tasks
* Getting guidance on folder structure and overall project organization
* Generating initial boilerplate code for backend controllers and React components
* Debugging issues related to database schema changes, authentication, and API integration
* Refining validation logic and improving test cases
* Clarifying concepts related to React state management, JWT authentication, and Sequelize ORM

### My contribution

* Designed and implemented the backend architecture
* Wrote and integrated all business logic for authentication, sweets, and inventory
* Manually connected frontend and backend APIs
* Fixed bugs, edge cases, and validation errors
* Refactored code for clarity, maintainability, and alignment with requirements
* Made architectural decisions such as route aliasing, role-based middleware, and schema evolution
* Ensured the project met all functional and non-functional kata requirements

AI was used strictly as a **tool to support learning and productivity**.
All final decisions, integrations, and implementations were done by me.

---

## AI Usage and Commit Transparency

AI co-author trailers were **not added to individual Git commits** during development.

Instead, AI usage is **fully and explicitly documented in this README**, particularly in the **"My AI Usage"** section. This section provides a transparent explanation of where and how AI tools were used, as well as which parts of the work were implemented and decided by me.

This approach is intended to provide clear and honest disclosure of AI involvement, even though commit-level co-authorship was not applied.

---

## Key Learnings

* Designing and structuring a full-stack application
* Implementing secure JWT-based authentication
* Handling role-based access control
* Managing database schema evolution
* Integrating a React frontend with a RESTful backend
* Writing maintainable APIs and backend tests
* Using AI responsibly as a development aid

---

## Final Status

* All kata requirements implemented
* Backend and frontend fully functional
* Tests passing
* AI usage transparently documented

