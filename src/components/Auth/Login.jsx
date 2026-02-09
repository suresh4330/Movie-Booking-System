import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let validUser = users.find(
      u => u.email === email && u.password === password
    );

    if (validUser) {

      localStorage.setItem("loggedUser", JSON.stringify(validUser));

      navigate("/dashboard");

    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleLogin}>Login</button>

      <p style={{ marginTop: '1rem' }}>
        Don't have an account? <span onClick={() => navigate('/')} style={{ color: 'var(--primary)', cursor: 'pointer' }}>Register</span>
      </p>
    </div>
  );
}

export default Login;
