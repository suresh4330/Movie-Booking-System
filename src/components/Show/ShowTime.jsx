import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ShowTime() {
  const { id, cinema } = useParams();
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  // State for booking flow
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]); // In a real app, fetch from backend

  const times = ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "10:00 PM"];

  // Seat configuration
  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const seatsPerRow = 8;
  const ticketPrice = 250;

  useEffect(() => {
    // Check login
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    if (!user) {
      alert("Please login to book tickets");
      navigate("/login");
    }

    // Load existing bookings to simulate sold seats
    if (selectedTime) {
      const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];
      // Filter for this specific show
      const currentShowBookings = allBookings.filter(b =>
        b.movieId === id &&
        b.cinema === cinema &&
        b.date === today &&
        b.time === selectedTime
      );
      // Flatten all booked seats into a single array
      const taken = currentShowBookings.flatMap(b => b.seats || []);
      setBookedSeats(taken);
    }
  }, [navigate, id, cinema, today, selectedTime]);

  const toggleSeat = (seatId) => {
    if (bookedSeats.includes(seatId)) return; // Already sold

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("loggedUser"));
    const bookingDetails = {
      user: user.name,
      movieId: id,
      cinema,
      date: today,
      time: selectedTime,
      seats: selectedSeats,
      totalAmount: selectedSeats.length * ticketPrice,
      bookingId: Math.random().toString(36).substr(2, 9).toUpperCase()
    };

    // Save
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.push(bookingDetails);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    // Also update local state for immediate feedback if not navigating away (though we are)
    setBookedSeats([...bookedSeats, ...selectedSeats]);

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

      {/* 1. Time Selection */}
      <h3 style={{ borderBottom: '1px solid #333', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Select Time</h3>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {times.map(t => (
          <button
            key={t}
            onClick={() => { setSelectedTime(t); setSelectedSeats([]); }}
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

      {selectedTime && (
        <>
          {/* 2. Seat Map */}
          <h3 style={{ borderBottom: '1px solid #333', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Select Seats</h3>

          <div style={{
            background: '#1a1a1a',
            padding: '2rem',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <div style={{
              width: '80%',
              height: '5px',
              background: 'linear-gradient(to right, transparent, var(--primary), transparent)',
              marginBottom: '2rem',
              borderRadius: '50%',
              opacity: 0.7
            }}></div>
            <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1rem' }}>SCREEN THIS WAY</p>

            <div style={{ display: 'grid', gap: '10px' }}>
              {rows.map(row => (
                <div key={row} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{ width: '20px', textAlign: 'center', color: '#666' }}>{row}</span>
                  {Array.from({ length: seatsPerRow }).map((_, i) => {
                    const seatId = `${row}${i + 1}`;
                    const isBooked = bookedSeats.includes(seatId);
                    const isSelected = selectedSeats.includes(seatId);

                    return (
                      <div
                        key={seatId}
                        onClick={() => toggleSeat(seatId)}
                        style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '6px',
                          backgroundColor: isBooked ? '#444' : (isSelected ? '#4ade80' : 'white'),
                          cursor: isBooked ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.7rem',
                          color: isBooked ? '#666' : '#000',
                          fontWeight: 'bold',
                          border: isSelected ? '2px solid #fff' : 'none'
                        }}
                        title={isBooked ? "Sold" : `Seat ${seatId} - ₹${ticketPrice}`}
                      >
                        {i + 1}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '20px', height: '20px', background: 'white', borderRadius: '4px' }}></div>
                <span>Available</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '20px', height: '20px', background: '#4ade80', borderRadius: '4px' }}></div>
                <span>Selected</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '20px', height: '20px', background: '#444', borderRadius: '4px' }}></div>
                <span>Sold</span>
              </div>
            </div>
          </div>

          {/* 3. Booking Summary Bar */}
          <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: '#242424',
            padding: '1.5rem',
            borderTop: '1px solid #333',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 -5px 20px rgba(0,0,0,0.5)'
          }}>
            <div>
              <p style={{ margin: 0, color: 'var(--text-muted)' }}>
                {selectedSeats.length > 0
                  ? `${selectedSeats.join(", ")} (${selectedSeats.length} Tickets)`
                  : "Select seats to proceed"}
              </p>
              <h2 style={{ margin: '0.2rem 0 0', color: '#fff' }}>
                Total: ₹{selectedSeats.length * ticketPrice}
              </h2>
            </div>
            <button
              onClick={handleBooking}
              disabled={selectedSeats.length === 0}
              style={{
                padding: '1rem 2.5rem',
                fontSize: '1.1rem',
                background: selectedSeats.length > 0 ? 'var(--primary)' : '#444',
                cursor: selectedSeats.length > 0 ? 'pointer' : 'not-allowed',
                opacity: selectedSeats.length > 0 ? 1 : 0.7
              }}
            >
              Book Tickets
            </button>
          </div>

          {/* Added spacer for fixed footer */}
          <div style={{ height: '100px' }}></div>
        </>
      )}
    </div>
  );
}


export default ShowTime;
