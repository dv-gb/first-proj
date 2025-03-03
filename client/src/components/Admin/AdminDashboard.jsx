import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://flask-59e1.onrender.com/user", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched User Data:", data); // Debugging

        if (!data.logged_in) {
          navigate("/login");
        } else if (data.user.user_role !== "admin") {
          navigate("#/client/dashboard", { replace: true }); // Fixed redirection
        } else {
          setUser(data.user);
        }
      })
      .catch((err) => console.error("Session check failed:", err))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const response = await fetch("https://flask-59e1.onrender.com/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();
      if (data.redirect) {
        navigate(data.redirect);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <h1 className="text-2xl font-bold mb-4">Welcome Admin</h1>

      {user && (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md w-[250px]">
          <h2 className="text-xl font-semibold">User Information</h2>
          <p>
            <strong>First Name:</strong> {user.firstname}
          </p>
          <p>
            <strong>Last Name:</strong> {user.lastname}
          </p>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Contact:</strong> {user.contact}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      )}

      <button
        onClick={handleLogout}
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-700"
      >
        Logout
      </button>
    </div>
  );
}
