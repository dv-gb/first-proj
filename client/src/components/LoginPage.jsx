import React from "react";
import { useState } from "react";

export default function LoginPage() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      console.log(data);
    } catch {
      console.log("Error Logging In");
    }
  };

  return (
    <>
      <div className="h-[100vh] flex justify-center items-center">
        <form onSubmit={handleLogin} className="flex flex-col items-center">
          <h1>Login</h1>
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
            placeholder="Password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
          <button type="submit" className="bg-gray-500">
            Login
          </button>
        </form>
      </div>
    </>
  );
}
