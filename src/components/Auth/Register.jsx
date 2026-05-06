import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {

    if (!user.name || !user.email || !user.password) {
      alert("Please fill all fields");
      return;
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      alert("Please enter a valid email address");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(u => u.email === user.email)) {
      alert("User with this email already exists");
      return;
    }

    users.push(user);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered Successfully");

    navigate("/login");
  };

  return (
    <div className="card">
      <h2>Register</h2>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />

      <button onClick={handleSubmit}>Register</button>

      <p style={{ marginTop: '1rem' }}>
        Already have an account? <span onClick={() => navigate('/login')} style={{ color: 'var(--primary)', cursor: 'pointer' }}>Login</span>
      </p>
    </div>
  );
}

export default Register;
