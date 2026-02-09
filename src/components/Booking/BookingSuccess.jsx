import { useNavigate } from "react-router-dom";

function BookingSuccess() {
  const navigate = useNavigate();

  return (
    <div className="card" style={{ textAlign: 'center', marginTop: '10vh' }}>
      <h2 style={{ color: '#4ade80' }}>🎉 Booking Confirmed!</h2>
      <p style={{ fontSize: '1.2rem', margin: '2rem 0' }}>Your ticket has been successfully booked.</p>
      <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
    </div>
  );
}

export default BookingSuccess;
