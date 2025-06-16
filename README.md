# Glen Assignment - Property Management System

A full-stack property management system built with React, Node.js, and MongoDB.

## Project Structure

```
├── frontend/          # React frontend application
│   ├── src/          # Source files
│   ├── public/       # Static files
│   └── package.json  # Frontend dependencies
│
└── backend/          # Node.js backend server
    ├── src/         # Source files
    ├── config/      # Configuration files
    └── package.json # Backend dependencies
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn package manager

## Environment Variables

### Backend (.env)
Create a `.env` file in the `backend` directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/glen
JWT_SECRET=your_jwt_secret_key
```

### Frontend (.env)
Create a `.env` file in the `frontend` directory:
```
VITE_API_URL=http://localhost:5000/api
```

## Installation & Setup

### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The backend server will run on http://localhost:5000

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend application will run on http://localhost:5173

## Features

- User Authentication (Register/Login)
- Property Listings
- Property Search
- Booking Management
- Payment Integration
- User Profiles
- Admin Dashboard

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/profile - Get user profile

### Listings
- GET /api/listings - Get all listings
- POST /api/listings - Create new listing
- GET /api/listings/:id - Get listing by ID
- PUT /api/listings/:id - Update listing
- DELETE /api/listings/:id - Delete listing

### Bookings
- GET /api/bookings - Get user bookings
- POST /api/bookings - Create new booking
- PUT /api/bookings/:id - Update booking status

### Search
- GET /api/search - Search listings with filters

### Payments
- POST /api/payments - Process payment
- GET /api/payments/:id - Get payment status

## Technologies Used

### Frontend
- React
- TypeScript
- Tailwind CSS
- Axios
- React Router
- React Query

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication
- CORS

## Development

### Code Style
- ESLint for code linting
- Prettier for code formatting

### Testing
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## Deployment

### Frontend (Netlify)
1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Deploy to Netlify using the Netlify CLI or connect your GitHub repository.

### Backend (Render)
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set environment variables
4. Deploy

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@glen.com or create an issue in the repository.

```
