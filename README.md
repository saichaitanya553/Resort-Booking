# Resort Booking

A rebuilt version of the original Resort Booking project using React + Vite on the frontend and Express + MongoDB on the backend.

## What changed
- Preserves the original blue/purple login UI and resort-card style.
- React component structure instead of one large HTML file.
- Real registration/login with JWT and bcrypt.
- MongoDB persistence for users and bookings.
- Resort data stored in the backend.
- Date-based booking conflict checking.
- Booking history and cancellation.
- Responsive layout and cleaner CSS.
- Environment variables for secrets.

## Project structure

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
│   ├── .env.example
│   └── package.json
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── .gitignore
└── README.md
```

## Run locally

### Backend

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

Set `MONGODB_URI` and `JWT_SECRET` in `.env`.

### Frontend

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

The frontend expects the API at `http://localhost:5000/api` by default.

## Notes
- No `node_modules` are included in this ZIP.
- No real credentials are included.
- The application can render the resort catalog without MongoDB, but authentication and persistent bookings require MongoDB.
