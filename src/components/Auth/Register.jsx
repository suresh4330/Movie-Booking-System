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

    let users = JSON.parse(localStorage.getItem("users")) || [];

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
