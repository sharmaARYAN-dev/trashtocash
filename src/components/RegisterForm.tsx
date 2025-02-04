"use client";
import { useState } from "react";
/*import "../path/to/globals.css"; */// Adjust the path if needed

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole] = useState("normalUser");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, userRole }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "An error occurred during registration.");
      }

      setSuccess(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="form-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Sign Up</h2>
        <div className="form-group">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="form-input"
          />
        </div>
        <input type="hidden" value={userRole} readOnly />
        <button type="submit" className="form-button">Sign Up</button>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Registration successful!</p>}

        <div className="login-redirect">
          <p>
            Already have an account?{" "}
            <a href="/login" className="login-link">Log In</a>
          </p>
        </div>
      </form>
    </div>
  );
}
