import axios from "axios";
import React, { useState, useContext } from "react";
const authContext = React.createContext();

export function useAuth() {
  return useContext(authContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [users, setUsers] = useState();

  function signin({ props }) {
    console.log(props);
  }

  function signup(username, email, password) {}

  function logout() {
    //hook with logout api
    console.log("logout");

    setUser(false);
  }

  const value = { signin, signup, logout };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}
