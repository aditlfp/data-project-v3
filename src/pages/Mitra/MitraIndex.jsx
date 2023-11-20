import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import DrawerMenu from "../../components/DrawerMenu";
import Title from "../../components/Title";
import axios from "../../lib/axios";
import MitraCreate from "./MitraCreate";
import MitraList from "./MitraList";

export default function MitraIndex() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state && location.state.userData;
  const [show, setShow] = useState(false);

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

  const handlerClick = () => {
    setShow(!show);
  };

  if (data && data[0].role.name === "admin") {
    return (
      <>
        <ToastContainer />
        <Title name="Data Mitra" />
        <DrawerMenu>
          <div className="flex justify-end gap-x-2 mr-5">
            <button
              onClick={() => handlerClick()}
              className={`btn mb-2 text-white ${
                !show
                  ? "bg-blue-500 hover:bg-blue-600 transition-all ease-in-out duration-150"
                  : "bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-150"
              }`}
            >
              {!show ? "Create New" : "Close"}
            </button>
            <button
              onClick={() => navigate(-1)}
              className="btn bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-150 text-white"
            >
              back
            </button>
          </div>
          {!show ? <MitraList /> : <MitraCreate />}
        </DrawerMenu>
      </>
    );
  }

  logOutHandler();

  return (
    <div className="flex justify-center items-center mt-32 text-blue-300">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
}
