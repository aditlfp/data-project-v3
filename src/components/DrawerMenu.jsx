import React from "react";
import {
  RiArchive2Line,
  RiBox3Line,
  RiHammerLine,
  RiHomeLine,
  RiLogoutBoxLine,
  RiLuggageCartLine,
  RiTeamLine,
  RiUserSettingsLine,
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import Title from "./Title";


function DrawerMenu({ isLogin }) {
  const navigate = useNavigate();
  const csrf = () => axios.get("api/sanctum/csrf");

  function barang() {
    if (isLogin) {
      navigate("/barang", { state: { userData: isLogin } });
    } else {
      return navigate("/signin");
    }
  }

  const gudang = () => {
    if (isLogin) {
      navigate("/gudang", { state: { userData: isLogin } });
    } else {
      return navigate("/signin");
    }
  };

  const mitra = () => {
    if (isLogin) {
      navigate("/mitra", { state: { userData: isLogin } });
    } else {
      return navigate("/signin");
    }
  };

  const logOutHandler = async () => {
    if (isLogin) {
      try {
        await csrf().then((res) => {
          axios.post("/api/logout").then((res) => {
            return navigate("/signin");
          });
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      return navigate("/signin");
    }
  };

  return (
    <div>
      <Title name="Dashboard" />
      <div className="drawer drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="flex flex-col menu p-4 w-[21rem] bg-base-100 text-base-content">
            <div className="flex flex-col gap-y-2 bg-base-300 pb-10 pt-5 rounded-md px-5">
              <h2 className="text-center font-semibold bg-slate-600 rounded-xl text-base-300">
                Menu
              </h2>
              <li>
                <button className="bg-sky-200 shadow-md flex items-center pb-4 hover:bg-sky-200">
                  <span className="mt-2 flex items-center gap-x-2 text-black font-semibold text-md">
                    <RiHomeLine /> Dashboard
                  </span>
                </button>
              </li>
              <div className="w-[100%] border border-slate-500 transition-all ease-linear duration-300 hover:border-sky-200  rounded-full">
                <li className="flex justify-center items-center text-center transition-all duration-500">
                  <button
                    onClick={gudang}
                    className="text-slate-500 hover:shadow-md underline hover:no-underline hover:text-black hover:bg-sky-200 w-0 hover:border-0 focus:border-0 h-14
                  transition-all duration-200 pr-20 hover:pr-0
                  ease-in-out hover:w-[100%] flex items-center pb-4"
                  >
                    <span className="mt-2 flex items-center gap-x-2 pr-20 font-semibold text-md">
                      <RiUserSettingsLine className="text-md" /> User
                    </span>
                  </button>
                </li>
              </div>
              <div className="w-[100%] border border-slate-500 transition-all ease-linear duration-300 hover:border-sky-200  rounded-full">
                <li className="flex justify-center items-center text-center transition-all duration-500">
                  <button
                    onClick={mitra}
                    className="text-slate-500 hover:shadow-md underline hover:no-underline hover:text-black hover:bg-sky-200 w-0 hover:border-0 focus:border-0 h-14
                transition-all duration-200 pr-20 hover:pr-0
                ease-in-out hover:w-[100%] flex items-center pb-4"
                  >
                    <span className="mt-2 flex items-center gap-x-2 pr-20 font-semibold text-md">
                      <RiTeamLine className="text-md" /> Mitra
                    </span>
                  </button>
                </li>
              </div>
              <div className="w-[100%] border border-slate-500 transition-all ease-linear duration-300 hover:border-sky-200  rounded-full">
                <li className="flex justify-center items-center text-center transition-all duration-500">
                  <button
                    onClick={barang}
                    className="text-slate-500 hover:shadow-md underline hover:no-underline hover:text-black hover:bg-sky-200 w-0 hover:border-0 focus:border-0 h-14
                transition-all duration-200 pr-20 hover:pr-0
                ease-in-out hover:w-[100%] flex items-center pb-4 "
                  >
                    <span className="mt-2 flex items-center gap-x-2 font-semibold text-md">
                      {" "}
                      <RiArchive2Line />
                      Barang
                    </span>
                  </button>
                </li>
              </div>
              <div className="w-[100%] border border-slate-500 transition-all ease-linear duration-300 hover:border-sky-200  rounded-full">
                <li className="flex justify-center items-center text-center transition-all duration-500">
                  <button
                    onClick={barang}
                    className="text-slate-500 hover:shadow-md underline hover:no-underline hover:text-black hover:bg-sky-200 w-0 hover:border-0 focus:border-0 h-14
                transition-all duration-200 pr-20 hover:pr-0
                ease-in-out hover:w-[100%] flex items-center pb-4 "
                  >
                    <span className="mt-2 flex items-center gap-x-2 font-semibold text-md">
                      {" "}
                      <RiHammerLine />
                      Alat
                    </span>
                  </button>
                </li>
              </div>
              <div className="w-[100%] border border-slate-500 transition-all ease-linear duration-300 hover:border-sky-200  rounded-full">
                <li className="flex justify-center items-center text-center transition-all duration-500">
                  <button
                    onClick={gudang}
                    className="text-slate-500 hover:shadow-md underline hover:no-underline hover:text-black hover:bg-sky-200 w-0 hover:border-0 focus:border-0 h-14
                transition-all duration-200 pr-20 hover:pr-0
                ease-in-out hover:w-[100%] flex items-center pb-4"
                  >
                    <span className="mt-2 flex items-center gap-x-2 font-semibold text-md">
                      <RiBox3Line className="text-md" /> <span>Gudang</span>
                    </span>
                  </button>
                </li>
              </div>
              <div className="w-[100%] border border-slate-500 transition-all ease-linear duration-300 hover:border-sky-200  rounded-full">
                <li className="flex justify-center items-center text-center transition-all duration-500">
                  <button
                    onClick={gudang}
                    className="text-slate-500 hover:shadow-md underline hover:no-underline hover:text-black hover:bg-sky-200 w-0 hover:border-0 focus:border-0 h-14
                transition-all duration-200 pr-20 hover:pr-0
                ease-in-out hover:w-[100%] flex items-center pb-4"
                  >
                    <span className="mt-2 flex items-center gap-x-2 pr-20 font-semibold text-md">
                      <RiLuggageCartLine className="text-md" /> Order
                    </span>
                  </button>
                </li>
              </div>
              <div className="w-[100%] border border-slate-500 transition-all ease-linear duration-300 hover:border-sky-200  rounded-full">
                <li className="flex justify-center items-center text-center transition-all duration-500">
                  <button
                    onClick={logOutHandler}
                    className="text-red-500 hover:shadow-md underline hover:no-underline hover:text-black hover:bg-sky-200 w-0 hover:border-0 focus:border-0 h-14
                transition-all duration-200 pr-20 hover:pr-0
                ease-in-out hover:w-[100%] flex items-center pb-4"
                  >
                    <span className="mt-2 flex items-center gap-x-2 pr-20 font-semibold text-md">
                      <RiLogoutBoxLine className="text-md" />
                      SignOut
                    </span>
                  </button>
                </li>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DrawerMenu;
