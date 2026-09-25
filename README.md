# Resort Booking System

A full-stack resort booking web application built with **React + Vite**, **Node.js + Express**, and **MongoDB**.

## Features

- Responsive resort discovery interface
- Search resorts by name, location, or description
- Resort cards with images and details
- Resort image preview modal
- User registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Book resorts with check-in and check-out dates
- Date-overlap availability validation
- Booking history
- Booking cancellation
- MongoDB data persistence
- Protected booking APIs
- Responsive design for desktop and mobile
- External resort images — no image files are required in the project

## Technology Stack

### Frontend

- React
- Vite
- React Router
- JavaScript
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS
- dotenv

## Project Structure

```text
Resort-Booking/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md