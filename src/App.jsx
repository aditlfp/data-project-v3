import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRouteDashboard from "./components/PrivateRouteDashboard";
import Profile from "./components/PrivateRouteProfile";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import AuthProvider from "./contexts/AuthContext";
import BarangIndex from "./pages/Barang/BarangIndex";
import GudangIndex from "./pages/Gudang/GudangIndex";
import MitraIndex from "./pages/Mitra/MitraIndex";
import User from "./pages/User/UserIndex";

function App() {
  const isAuthenticated = true;

  return (
    <>
      <div className="antialiased">
        <Router>
          <Navbar />
          <AuthProvider>
            <Routes>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/signin" element={<Signin />}></Route>
              <Route path="/" element={<Signin />}></Route>
              <Route path="/barang" element={<BarangIndex />}></Route>
              <Route path="/gudang" element={<GudangIndex />}></Route>
              <Route
                path="/dashboard"
                element={<PrivateRouteDashboard />}
              ></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/mitra" element={<MitraIndex />}></Route>
              <Route path="/user" element={<User />}></Route>
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </>
  );
}

export default App;
