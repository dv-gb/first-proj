import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  // 🔎 Ensure user is authenticated
  useEffect(() => {
    fetch("http://localhost:5000/user", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (!data.logged_in) {
          navigate("/login"); // 🚀 Redirect to login if no active session
        }
      })
      .catch((err) => console.error("Session check failed:", err));
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();
      if (data.redirect) {
        navigate(data.redirect); // ✅ Redirect to login
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <div>
        <h1>Welcome to Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-gray-500 pl-3 pr-3 pt-1 pb-1 rounded-xl"
        >
          Logout
        </button>
      </div>
    </>
  );
}
