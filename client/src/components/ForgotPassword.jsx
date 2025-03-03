import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    new_password: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/user", {
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
    const response = await fetch("http://localhost:5000/change_password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(loginData),
    });
    const data = await response.json();
    if (response.ok) {
      navigate("/login");
    } else {
      alert(data.message);
    }
  };
  return (
    <>
      <div>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
          />
          <input
            type="password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
          <input
            type="password"
            value={loginData.new_password}
            onChange={(e) =>
              setLoginData({ ...loginData, new_password: e.target.value })
            }
          />
          <button type="submit">change</button>
        </form>
      </div>
    </>
  );
}
