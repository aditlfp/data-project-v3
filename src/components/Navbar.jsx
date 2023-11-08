import React from "react";
import { RiSettings4Fill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo3.png";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state && location.state.userData;

  const toProfile = () => {
    navigate("/profile", { state: { userData: data } });
  };

  return (
    <>
      {data ? (
        <nav className="bg-sky-500/50 rounded-2xl m-5 shadow-md flex items-center top-0 left-0">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <span className="flex items-center bg-slate-300/30 px-5 rounded-xl shadow-md hover:shadow-inner transition-all ease-in-out .2s">
              <img src={Logo} width={55} className="mr-3" alt="Flowbite Logo" />
              <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">
                Gudang System Backend
              </span>
            </span>
          </div>
          <div>
            <button
              onClick={toProfile}
              className="flex flex-col hover:text-slate-400 transition-all ease-in-out duration-200 items-center -ml-11 justify-end mr-10"
            >
              <span
                className="text-xl tooltip tooltip-bottom"
                data-tip="setting"
              >
                <RiSettings4Fill />
              </span>
            </button>
          </div>
        </nav>
      ) : (
        ""
      )}
    </>
  );
}

export default Navbar;
