import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  // 🔎 Always check if the user is logged in
  useEffect(() => {
    fetch("http://localhost:5000/user", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.logged_in) {
          navigate("/dashboard"); // ✅ Redirect if session exists
        }
      })
      .catch((err) => console.error("Session check failed:", err));
  }, []); // 🔥 Ensure this runs only once on mount

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      if (response.ok) {
        navigate(data.redirect); // ✅ Redirect to dashboard after login
      } else {
        alert(data.message); // Show error message
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          required
          value={loginData.email}
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={loginData.password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
        />
        <button
          type="submit"
          className="bg-gray-500 pl-3 pr-3 pt-1 pb-1 rounded-xl"
        >
          Login
        </button>
      </form>
    </div>
  );
}
