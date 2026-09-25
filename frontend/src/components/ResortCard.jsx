export default function ResortCard({ resort, onBook, onImage }) {
  return (
    <article className="resort-card">
      <button
        className="image-button"
        onClick={() => onImage(resort.imageUrl, resort.name)}
        aria-label={`View ${resort.name}`}
      >
        <img src={resort.imageUrl} alt={resort.name} loading="lazy" />
      </button>
      <div className="resort-info">
        <h2>{resort.name}</h2>
        <p className="location">{resort.location}</p>
        <p>{resort.description}</p>
        <p><strong>Price:</strong> ${resort.priceUSD} (USD)</p>
        <button type="button" className="book-button" onClick={() => onBook(resort)}>
          Book Now
        </button>
      </div>
    </article>
  );
}
