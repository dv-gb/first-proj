import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/user", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (!data.logged_in) {
          navigate("/login"); //redirect to login if not logged in
        } else {
          setUser(data.user); // GET information of users
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
        navigate(data.redirect);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-[100%] h-[100vh]">
      <h1 className="text-2xl font-bold mb-4">Welcome to Dashboard</h1>

      {user ? (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md w-[250px] ">
          <h2 className="text-xl font-semibold">User Information</h2>
          <p>
            <strong>First Name:</strong> {user.firstname}
          </p>
          <p>
            <strong>Last Name:</strong> {user.lastname}
          </p>
          <p>
            <strong>Contact Number:</strong> {user.contact}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      ) : (
        <p>Loading user data...</p>
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
