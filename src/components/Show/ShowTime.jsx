import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ShowTime() {
  const { id, cinema } = useParams();
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  // State for booking flow
  const [selectedTime, setSelectedTime] = useState(null);

  const times = ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "10:00 PM"];
  const ticketPrice = 250;

  useEffect(() => {
    // Check login
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    if (!user) {
      alert("Please login to book tickets");
      navigate("/login");
    }
  }, [navigate]);

  const handleBooking = () => {
    if (!selectedTime) {
      alert("Please select a showtime.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("loggedUser"));
    const bookingDetails = {
      user: user.name,
      movieId: id,
      cinema,
      date: today,
      time: selectedTime,
      totalAmount: ticketPrice,
      bookingId: Math.random().toString(36).substr(2, 9).toUpperCase()
    };

    // Save booking
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.push(bookingDetails);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    // Store current booking for success page display
    localStorage.setItem("lastBooking", JSON.stringify(bookingDetails));

    alert(`Booking Successful! ID: ${bookingDetails.bookingId}`);
    navigate("/success");
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', color: '#fff' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '1rem', padding: '0.5rem 1rem' }}>← Back</button>

      <h2 style={{ marginBottom: '0.5rem' }}>{cinema}</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Date: {today}</p>

      {/* Time Selection */}
      <h3 style={{ borderBottom: '1px solid #333', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Select Showtime</h3>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {times.map(t => (
          <button
            key={t}
            onClick={() => setSelectedTime(t)}
            style={{
              padding: '0.8rem 1.5rem',
              borderRadius: '8px',
              border: selectedTime === t ? '2px solid var(--primary)' : '1px solid #444',
              backgroundColor: selectedTime === t ? 'rgba(100, 108, 255, 0.2)' : '#2a2a2a',
              color: selectedTime === t ? 'var(--primary)' : '#ccc',
              cursor: 'pointer'
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Booking Summary */}
      {selectedTime && (
        <div style={{
          background: '#1a1a1a',
          padding: '2rem',
          borderRadius: '12px',
          marginBottom: '2rem',
          border: '1px solid #333'
        }}>
          <p style={{ margin: '0.5rem 0', color: 'var(--text-muted)' }}>
            <strong>Cinema:</strong> {cinema}
          </p>
          <p style={{ margin: '0.5rem 0', color: 'var(--text-muted)' }}>
            <strong>Date:</strong> {today}
          </p>
          <p style={{ margin: '0.5rem 0', color: 'var(--text-muted)' }}>
            <strong>Time:</strong> {selectedTime}
          </p>
          <h3 style={{ margin: '1rem 0 0 0', color: '#4ade80' }}>
            Amount: ₹{ticketPrice}
          </h3>
        </div>
      )}

      {/* Book Button */}
      {selectedTime && (
        <button
          onClick={handleBooking}
          style={{
            width: '100%',
            padding: '1rem',
            fontSize: '1.1rem',
            background: 'var(--primary)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Book Ticket
        </button>
      )}
    </div>
  );
}


export default ShowTime;
