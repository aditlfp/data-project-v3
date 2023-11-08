import React from "react";
import { useLocation } from "react-router";
import Dashboard from "./Dashboard";
import Signin from "./Signin";
export default function PrivateRouteDashboard() {
  const location = useLocation();
  const data = location.state && location.state.userData;
  console.log("dari private", data);

  return data ? <Dashboard /> : <Signin />;
}
