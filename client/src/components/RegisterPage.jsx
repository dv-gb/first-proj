import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Headers from "./Headers";
import "./css/Register.css";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    contact_number: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    document.title = "Register";
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

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://flask-production-e8d1.up.railway.app/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(registerData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        navigate(data.redirect);
      } else {
        alert(data.message);
      }
    } catch {
      console.log("Error Registering User");
    }
  };

  return (
    <>
      <Headers />
      <div className="reg-body h-[100vh] w-[100%] bg-[#f8f8f8] flex flex-col justify-center items-center">
        <img
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzI1IiBoZWlnaHQ9Ijk5MCIgdmlld0JveD0iMCAwIDcyNSA5OTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHg9IjY2My45NzMiIHk9Ii00NTQiIHdpZHRoPSIxMjcwLjAzIiBoZWlnaHQ9IjkzOSIgcng9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSg0NSA2NjMuOTczIC00NTQpIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXIpIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXIiIHgxPSI2NjMuOTczIiB5MT0iLTQ1NCIgeDI9IjE1NTkuNjMiIHkyPSI3NTcuNDEyIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiM2QTk4RjAiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNDk2MURDIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg=="
          alt="bg-card"
          className="bg-desktop absolute right-0 w-[50%] top-0 z-[0]"
        />
        <form onSubmit={handleRegister} className="register-form z-[1] ">
          <h2 className="text-xl font-semibold">Create an account</h2>
          <div
            className="flex gap-2.5
        "
          >
            <input
              type="text"
              placeholder="First Name"
              value={registerData.first_name}
              onChange={(e) =>
                setRegisterData({ ...registerData, first_name: e.target.value })
              }
              required
              className="fname"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={registerData.last_name}
              onChange={(e) =>
                setRegisterData({ ...registerData, last_name: e.target.value })
              }
              required
              className="lname"
            />
          </div>
          <input
            type="text"
            placeholder="Username"
            value={registerData.username}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                username: e.target.value,
              })
            }
            required
          />

          <input
            type="text"
            placeholder="Contact Number"
            value={registerData.contact_number}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                contact_number: e.target.value,
              })
            }
            required
          />
          <input
            type="text"
            placeholder="Email"
            value={registerData.email}
            onChange={(e) =>
              setRegisterData({ ...registerData, email: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={registerData.password}
            onChange={(e) =>
              setRegisterData({ ...registerData, password: e.target.value })
            }
            required
          />
          <button type="submit" className="w-[100%]">
            Register
          </button>
          <p className="text-[11px] ">
            - Already have an account?{" "}
            <span>
              <Link to={"/login"}>Sign In</Link>
            </span>{" "}
            -
          </p>
        </form>
      </div>
    </>
  );
}
