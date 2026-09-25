import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { api } from "../services/api";

export default function BookingHistoryPage() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.getBookings()
      .then((data) => setBookings(data.bookings))
      .catch((err) => setError(err.message));
  }, []);

  async function cancel(id) {
    if (!window.confirm("Cancel this booking?")) return;
    try {
      const data = await api.cancelBooking(id);
      setBookings((current) =>
        current.map((booking) => booking._id === id ? data.booking : booking)
      );
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <Navbar />
      <main className="history-page">
        <h1>My Bookings</h1>
        {error && <p className="error-message">{error}</p>}
        {!bookings.length && !error && (
          <p className="empty-state">You have no bookings yet.</p>
        )}

        <div className="booking-list">
          {bookings.map((booking) => (
            <article className="booking-card" key={booking._id}>
              <div>
                <h2>{booking.resort?.name || "Resort"}</h2>
                <p>{booking.resort?.location}</p>
                <p><strong>Check-in:</strong> {booking.checkIn.slice(0, 10)}</p>
                <p><strong>Check-out:</strong> {booking.checkOut.slice(0, 10)}</p>
                <p><strong>Guests:</strong> {booking.guests}</p>
                <p><strong>Status:</strong> {booking.status}</p>
              </div>
              {booking.status === "confirmed" && (
                <button className="cancel-button" onClick={() => cancel(booking._id)}>
                  Cancel Booking
                </button>
              )}
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
