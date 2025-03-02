import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    first_name: "",
    last_name: "",
    contact_number: "",
    email: "",
    password: "",
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

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(registerData),
      });
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
      <div>
        <form onSubmit={handleRegister}>
          <h1>Create an account</h1>
          <input
            type="text"
            placeholder="First Name"
            value={registerData.first_name}
            onChange={(e) =>
              setRegisterData({ ...registerData, first_name: e.target.value })
            }
            required
          />

          <input
            type="text"
            placeholder="Last Name"
            value={registerData.last_name}
            onChange={(e) =>
              setRegisterData({ ...registerData, last_name: e.target.value })
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
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
}
