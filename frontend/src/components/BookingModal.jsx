import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function BookingModal({ resort, onClose, onBooked }) {
  const [form, setForm] = useState({
    clientName: "",
    clientPhone: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setForm((current) => ({ ...current, clientName: "" }));
    setError("");
  }, [resort]);

  if (!resort) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.checkOut <= form.checkIn) {
      setError("Check-out must be after check-in.");
      return;
    }

    setSubmitting(true);
    try {
      const result = await api.createBooking({
        resortId: resort._id,
        ...form,
        guests: Number(form.guests),
      });
      onBooked(result.booking);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  return (
    <div className="modal" onMouseDown={onClose}>
      <div className="modal-content booking-modal-content" onMouseDown={(e) => e.stopPropagation()}>
        <button type="button" className="close-button" onClick={onClose} aria-label="Close">×</button>
        <h2>Book Your Stay</h2>
        <p className="selected-resort">{resort.name}</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={form.clientName}
            onChange={(e) => update("clientName", e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Your Phone Number"
            value={form.clientPhone}
            onChange={(e) => update("clientPhone", e.target.value)}
            required
          />
          <label>Check-in</label>
          <input
            type="date"
            value={form.checkIn}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => update("checkIn", e.target.value)}
            required
          />
          <label>Check-out</label>
          <input
            type="date"
            value={form.checkOut}
            min={form.checkIn || new Date().toISOString().split("T")[0]}
            onChange={(e) => update("checkOut", e.target.value)}
            required
          />
          <label>Guests</label>
          <input
            type="number"
            min="1"
            max="20"
            value={form.guests}
            onChange={(e) => update("guests", e.target.value)}
            required
          />

          <div className="currency-info">
            <p><strong>USD:</strong> ${resort.priceUSD}</p>
            <p><strong>EUR:</strong> €{resort.priceEUR}</p>
            <p><strong>GBP:</strong> £{resort.priceGBP}</p>
            <p><strong>AED:</strong> د.إ {resort.priceAED}</p>
            <p><strong>INR:</strong> ₹{resort.priceINR}</p>
          </div>

          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-button" disabled={submitting}>
            {submitting ? "Confirming..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
}
