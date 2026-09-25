import Booking from "../models/Booking.js";
import Resort from "../models/Resort.js";

export async function createBooking(req, res) {
  const { resortId, clientName, clientPhone, checkIn, checkOut, guests } = req.body;

  if (!resortId || !clientName || !clientPhone || !checkIn || !checkOut || !guests) {
    return res.status(400).json({ message: "All booking fields are required." });
  }

  const start = new Date(checkIn);
  const end = new Date(checkOut);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
    return res.status(400).json({ message: "Invalid booking dates." });
  }

  const resort = await Resort.findById(resortId);
  if (!resort) return res.status(404).json({ message: "Resort not found." });

  const overlapping = await Booking.findOne({
    resort: resortId,
    status: "confirmed",
    checkIn: { $lt: end },
    checkOut: { $gt: start },
  });

  if (overlapping) {
    return res.status(409).json({
      message: "This resort is already booked for part of those dates."
    });
  }

  const booking = await Booking.create({
    user: req.user.id,
    resort: resortId,
    clientName: clientName.trim(),
    clientPhone: clientPhone.trim(),
    checkIn: start,
    checkOut: end,
    guests: Number(guests),
  });

  const populated = await booking.populate("resort");
  res.status(201).json({ booking: populated });
}

export async function myBookings(req, res) {
  const bookings = await Booking.find({ user: req.user.id })
    .populate("resort")
    .sort({ createdAt: -1 });

  res.json({ bookings });
}

export async function cancelBooking(req, res) {
  const booking = await Booking.findOne({
    _id: req.params.id,
    user: req.user.id,
  }).populate("resort");

  if (!booking) return res.status(404).json({ message: "Booking not found." });

  if (booking.status === "cancelled") {
    return res.status(400).json({ message: "Booking is already cancelled." });
  }

  booking.status = "cancelled";
  await booking.save();

  res.json({ booking });
}
