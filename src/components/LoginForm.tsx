"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
/*import "../path/to/globals.css"; */// Adjust the path if necessary

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Prevent redirecting to the default error page
    });

    if (result?.error) {
      setError("Invalid login credentials");
    } else {
      setError("");
      window.location.href = "/";
    }
  };

  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="form-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Log In</h2>
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
        <button type="submit" className="form-button">Log In</button>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="form-button google-button"
        >
          Login with Google
        </button>
        {error && <p className="error-message">{error}</p>}

        <div className="login-redirect">
          <p>
            Don&apos;t have an account?{" "}
            <a href="/register" className="login-link">Sign Up</a>
          </p>
        </div>
      </form>
    </div>
  );
}
