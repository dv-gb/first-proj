import "./css/Login.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { CFormCheck } from "@coreui/react";
import Headers from "./Headers";

export default function LoginPage() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    identifier: "",
    password: "",
  });
  const [user, setUser] = useState(null);

  // 🔎 Check if user is already logged in (avoids multiple fetch calls)
  useEffect(() => {
    document.title = "Login";
    fetch("https://flask-production-e8d1.up.railway.app/user", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.logged_in) {
          setUser(data.user);
        }
      })
      .catch((err) => console.error("Session check failed:", err));
  }, []);

  // Redirect based on user role after checking session
  useEffect(() => {
    if (user) {
      navigate(
        user.user_role === "admin" ? "/admin/dashboard" : "/client/dashboard"
      );
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://flask-production-e8d1.up.railway.app/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(loginData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        setTimeout(() => {
          navigate(data.redirect);
        }, 500);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <>
      <Headers />
      <img
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzI1IiBoZWlnaHQ9Ijk5MCIgdmlld0JveD0iMCAwIDcyNSA5OTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHg9IjY2My45NzMiIHk9Ii00NTQiIHdpZHRoPSIxMjcwLjAzIiBoZWlnaHQ9IjkzOSIgcng9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSg0NSA2NjMuOTczIC00NTQpIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXIpIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXIiIHgxPSI2NjMuOTczIiB5MT0iLTQ1NCIgeDI9IjE1NTkuNjMiIHkyPSI3NTcuNDEyIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiM2QTk4RjAiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNDk2MURDIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg=="
        alt="bg-card"
        className="bg-desktop absolute right-0 w-[50%] top-0 z-[0]"
      />

      <div className="login-body h-[100vh] w-[100%] bg-[#f8f8f8] flex justify-center items-center">
        <form onSubmit={handleLogin} className="z-[0]">
          <h2 className="text-xl font-semibold">Sign In</h2>
          <div className="flex w-[100%]">
            <label htmlFor="identifier" className="text-[14px]">
              Email or Username:
            </label>
          </div>
          <input
            type="text"
            required
            value={loginData.identifier} // Use a single state key
            onChange={(e) =>
              setLoginData({ ...loginData, identifier: e.target.value })
            }
          />
          <div className="flex w-[100%] pt-10">
            <label htmlFor="Password" className="text-[15px]">
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
          <p className="text-[11px]">
            - Don't have an account?{" "}
            <span>
              <Link to={"/register"}>Create new</Link>
            </span>{" "}
            -
          </p>
        </form>
      </div>
    </>
  );
}
