import { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:5000/api");
    console.log(response.data.users);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <div className="h-[100vh] bg-gray-500">{}</div>
    </>
  );
}
