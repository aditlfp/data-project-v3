import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../lib/axios";

export default function MitraIndex() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state && location.state.userData;

  console.log("aku dari mitra", data);

  const logOutHandler = async () => {
    try {
      if (data) {
        await axios.get("api/sanctum/csrf"); // Fetch CSRF token
        await axios.post("/api/logout"); // Logout
        navigate("/signin");
      } else {
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (data && data[0].role.name === "admin") {
    return <div>p</div>;
  }

  logOutHandler();

  return (
    <div className="flex justify-center items-center mt-32 text-blue-300">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
}
