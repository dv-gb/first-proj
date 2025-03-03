import "./css/Login.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { CFormCheck } from "@coreui/react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  // 🔎 Always check if the user is logged in
  useEffect(() => {
    fetch("http://localhost:5000/user", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.logged_in) {
          navigate("/dashboard"); // Redirect if session exists
        }
      })
      .catch((err) => console.error("Session check failed:", err));
  }, []);

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
    <div className="login-body h-[100vh] w-[100%] bg-[#f8f8f8] flex justify-center items-center">
      <img
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzI1IiBoZWlnaHQ9Ijk5MCIgdmlld0JveD0iMCAwIDcyNSA5OTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHg9IjY2My45NzMiIHk9Ii00NTQiIHdpZHRoPSIxMjcwLjAzIiBoZWlnaHQ9IjkzOSIgcng9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSg0NSA2NjMuOTczIC00NTQpIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXIpIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXIiIHgxPSI2NjMuOTczIiB5MT0iLTQ1NCIgeDI9IjE1NTkuNjMiIHkyPSI3NTcuNDEyIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiM2QTk4RjAiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNDk2MURDIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg=="
        alt="bg-card"
        className="absolute right-0 z-[0] w-[50%] top-0"
      />
      <form onSubmit={handleLogin} className="z-[1]">
        <h2 className="text-xl font-semibold ">Sign In</h2>
        <div className="flex w-[100%]">
          <label htmlFor="Email" className="text-[14px]">
            Email:
          </label>
        </div>
        <input
          type="email"
          required
          value={loginData.email}
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
        />
        <div className="flex w-[100%] pt-10">
          <label htmlFor="Email" className="text-[15px]">
            Password:
          </label>
        </div>
        <input
          type="password"
          required
          value={loginData.password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
        />
        <div className="button-div flex">
          <div className="flex items-center">
            <CFormCheck
              id="flexCheckDefault"
              label="Remember me"
              className="rememberme"
            />
          </div>
          <p className="text-[#6d83f2] font-light text-[11px] cursor-pointer">
            <Link to={"/change_password"}>Forgot Password?</Link>
          </p>
        </div>
        <button type="submit" className="w-[100%]">
          Login
        </button>
        <p className="text-[11px] ">
          - Don't have an account?{" "}
          <span>
            <Link to={"/register"}>Create new</Link>
          </span>{" "}
          -
        </p>
      </form>
    </div>
  );
}
