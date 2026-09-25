import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import ResortCard from "../components/ResortCard";
import ImageModal from "../components/ImageModal";
import BookingModal from "../components/BookingModal";
import { api } from "../services/api";
import { fallbackResorts } from "../data/resorts";

export default function ResortsPage() {
  const [resorts, setResorts] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedResort, setSelectedResort] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    api.getResorts()
      .then((data) => setResorts(data.resorts))
      .catch(() => setResorts(fallbackResorts));
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return resorts;
    return resorts.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
    );
  }, [resorts, query]);

  function booked() {
    setNotice("Booking confirmed successfully.");
    window.setTimeout(() => setNotice(""), 3500);
  }

  return (
    <>
      <Navbar />
      <main className="resorts-page">
        <section className="resorts-header">
          <div>
            <h1>Explore Resorts</h1>
            <p>Find your next luxury getaway.</p>
          </div>
          <input
            className="search-input"
            placeholder="Search resorts or locations..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </section>

        {notice && <div className="success-message">{notice}</div>}

        <section className="resorts-container">
          {filtered.map((resort) => (
            <ResortCard
              key={resort._id}
              resort={resort}
              onBook={(resort) => { setSelectedResort(resort); setBookingOpen(true); }}
              onImage={(src, title) => setImage({ src, title })}
            />
          ))}
        </section>

        {!filtered.length && <p className="empty-state">No resorts found.</p>}
      </main>

      <ImageModal
        image={image?.src}
        title={image?.title}
        onClose={() => setImage(null)}
      />

      <BookingModal
        resort={bookingOpen ? selectedResort : null}
        onClose={() => { setBookingOpen(false); setSelectedResort(null); }}
        onBooked={booked}
      />
    </>
  );
}
