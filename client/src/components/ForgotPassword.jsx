import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./css/Register.css";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    new_password: "",
  });

  useEffect(() => {
    fetch("https://flask-production-e8d1.up.railway.app/user", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.logged_in) {
          navigate("/dashboard");
        }
      });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://flask-production-e8d1.up.railway.app/change_password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(loginData),
      }
    );
    const data = await response.json();
    if (response.ok) {
      navigate("/login");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="reg-body h-[100vh] w-[100%] bg-[#f8f8f8] flex flex-col justify-center items-center">
      <img
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzI1IiBoZWlnaHQ9Ijk5MCIgdmlld0JveD0iMCAwIDcyNSA5OTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHg9IjY2My45NzMiIHk9Ii00NTQiIHdpZHRoPSIxMjcwLjAzIiBoZWlnaHQ9IjkzOSIgcng9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSg0NSA2NjMuOTczIC00NTQpIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXIpIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXIiIHgxPSI2NjMuOTczIiB5MT0iLTQ1NCIgeDI9IjE1NTkuNjMiIHkyPSI3NTcuNDEyIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiM2QTk4RjAiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNDk2MURDIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg=="
        alt="bg-card"
        className="absolute right-0 z-[0] w-[50%] top-0"
      />
      <form onSubmit={handleLogin} className="register-form z-[1] ">
        <h2 className="text-xl font-semibold">Reset Password</h2>
        <input
          type="text"
          placeholder="Email"
          value={loginData.email}
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
          required
        />
        <input
          type="password"
          placeholder="Old Password"
          value={loginData.password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={loginData.new_password}
          onChange={(e) =>
            setLoginData({ ...loginData, new_password: e.target.value })
          }
          required
        />
        <button type="submit" className="w-[100%]">
          Change Password
        </button>
        <p className="text-[11px]">
          <Link to="/login">↩︎ Back</Link>
        </p>
      </form>
    </div>
  );
}
