import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";
import axios from "../lib/axios";

export default function Dashboard() {
  const location = useLocation();
  const [error, setError] = useState("");
  const [waiting, setWaiting] = useState(false);
  const navigate = useNavigate();
  const verbose = false;
  const [user, setUser] = useState();

  useEffect(() => {
    axios.get("api/user").then((res) => setUser(res.data));
  }, []);

  function handleLogout() {
    setWaiting(true);
    try {
      axios.post("logout");
      navigate("/signin");
    } catch (err) {
      setError(verbose ? err.message : "Failed created the account");
    }
    setWaiting(false);
  }

  return (
    <div>
      {user ? (
        <AuthenticatedLayout props={user} />
      ) : (
        <div className="flex justify-center mt-32">
          <span className="loading loading-dots loading-lg text-blue-300"></span>
        </div>
      )}
    </div>
  );
}
