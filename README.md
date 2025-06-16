# 🏡 Glen Assignment - Property Management System

A full-stack property management system built using **React**, **Node.js**, and **MongoDB**, enabling users to list, search, and book properties with secure authentication and integrated payment processing.

---

## 📁 Project Structure

```

glen-property-management/
├── frontend/          # React frontend application
└── backend/           # Node.js backend server

```

---

## ✅ Prerequisites

Ensure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (local or Atlas)
- **npm** or **yarn** package manager

---

## 🔐 Environment Variables

### 🔧 Backend `.env`

Create a `.env` file in the `backend/` directory:

```

PORT=5000
MONGODB\_URI=mongodb://localhost:27017/glen
JWT\_SECRET=your\_jwt\_secret\_key

```

### 🌐 Frontend `.env`

Create a `.env` file in the `frontend/` directory:

```

VITE\_API\_URL=[http://localhost:5000/api](http://localhost:5000/api)

````

---

## 🚀 Installation & Setup

### 🔙 Backend Setup

```bash
cd backend
npm install
npm run dev
````

➡️ Runs at: [http://localhost:5000](http://localhost:5000)

---

### 🔜 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

➡️ Runs at: [http://localhost:5173](http://localhost:5173)

---

## ✨ Features

* 🔐 User Authentication (Register/Login)
* 🏘️ Property Listings (CRUD)
* 🔎 Property Search with Filters
* 📅 Booking Management
* 💳 Payment Integration
* 👤 User Profiles
* 🛠️ Admin Dashboard

---

## 📡 API Endpoints

### 🔐 Authentication

* `POST /api/auth/register` – Register a new user
* `POST /api/auth/login` – Login user
* `GET /api/auth/profile` – Get user profile

### 🏠 Listings

* `GET /api/listings` – Get all listings
* `POST /api/listings` – Create new listing
* `GET /api/listings/:id` – Get listing by ID
* `PUT /api/listings/:id` – Update listing
* `DELETE /api/listings/:id` – Delete listing

### 📆 Bookings

* `GET /api/bookings` – Get user bookings
* `POST /api/bookings` – Create new booking
* `PUT /api/bookings/:id` – Update booking status

### 🔍 Search

* `GET /api/search` – Search listings with filters

### 💰 Payments

* `POST /api/payments` – Process payment
* `GET /api/payments/:id` – Get payment status

---

## 🛠️ Technologies Used

### 🎨 Frontend

* React
* TypeScript
* Tailwind CSS
* Axios
* React Router
* React Query

### 🔧 Backend

* Node.js
* Express
* MongoDB & Mongoose
* JWT Authentication
* CORS

---

## 🧪 Development & Testing

### 🔎 Code Style

* **ESLint** for linting
* **Prettier** for code formatting

### ✅ Run Tests

```bash
# Backend Tests
cd backend
npm test

# Frontend Tests
cd frontend
npm test
```

---

## ☁️ Deployment

### 🌐 Frontend (Netlify)

```bash
cd frontend
npm run build
```

* Deploy using [Netlify CLI](https://docs.netlify.com/cli/get-started/) or connect your GitHub repo.

### ⚙️ Backend (Render)

1. Create a **Web Service** on [Render](https://render.com)
2. Connect your GitHub repo
3. Set environment variables
4. Click **Deploy**

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch:
   `git checkout -b feature/AmazingFeature`
3. **Commit** your changes:
   `git commit -m 'Add some AmazingFeature'`
4. **Push** the branch:
   `git push origin feature/AmazingFeature`
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

## 📬 Support

For support, email [satyamjha1616@gmail.com](mailto:satyamjha1616@gmail.com) or create an issue in the repository.

```
