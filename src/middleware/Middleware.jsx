import React from "react";
import { Route } from "react-router-dom";
import Signin from "../components/Signin";

// Fungsi middleware yang akan digunakan untuk melindungi rute tertentu
const Middleware = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          // Pengguna telah terautentikasi, izinkan akses ke komponen yang dituju
          return <Component {...props} />;
        } else {
          // Pengguna belum terautentikasi, arahkan mereka ke halaman login
          return <Signin />;
        }
      }}
    />
  );
};

export default Middleware;
