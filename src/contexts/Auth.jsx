import { useContext } from "react";

const useDataAuth = React.createContext();

export function Auth() {
  return useContext(useDataAuth);
}

export default function AuthData({ children }) {
  function setData({ props }) {
    console.log("props : ", props);
  }

  const value = { setData };

  return <useDataAuth.Provider value={value}>{children}</useDataAuth.Provider>;
}
