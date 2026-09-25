import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import resortRoutes from "./routes/resortRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import { seedResorts } from "./utils/seedResorts.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
}));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", message: "Resort Booking API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/resorts", resortRoutes);
app.use("/api/bookings", bookingRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error." });
});

connectDB()
  .then(seedResorts)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Startup failed:", error.message);
    process.exit(1);
  });
