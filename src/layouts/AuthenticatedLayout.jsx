import React from "react";
import { useLocation } from "react-router-dom";
import DrawerMenu from "../components/DrawerMenu";
import Footer from "../components/Footer";
import GuestLayout from "./GuestLayout";

function AuthenticatedLayout({ props }) {
  const location = useLocation();
  console.log("aku auth", props);

  return (
    <div>
      <div>
        {props.data ? <DrawerMenu isLogin={props.data} /> : <GuestLayout />}
      </div>
      {/* <div className="mt-20"></div> */}
      <div className="fixed bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
}

export default AuthenticatedLayout;
