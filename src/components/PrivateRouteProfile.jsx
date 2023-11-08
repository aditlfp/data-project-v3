import React from "react";
import { useLocation } from "react-router-dom";
import ProfileIndex from "../pages/Profile/ProfileIndex";
import Signin from "./Signin";

function PrivateRouteProfile() {
  const location = useLocation();
  const data = location.state && location.state.userData;

  return data ? <ProfileIndex data={data} /> : <Signin />;
}

export default PrivateRouteProfile;
