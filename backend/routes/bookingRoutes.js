import { Router } from "express";
import { cancelBooking, createBooking, myBookings } from "../controllers/bookingController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.use(requireAuth);
router.post("/", createBooking);
router.get("/my", myBookings);
router.patch("/:id/cancel", cancelBooking);

export default router;
