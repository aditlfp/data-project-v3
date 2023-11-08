import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import Title from "./Title";

export default function Signup() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [cpassword, setCPassword] = useState();
  const [error, setError] = useState("");
  const [waiting, setWaiting] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const verbose = true;

  async function submitHandler(e) {
    e.preventDefault();
    setWaiting(true);

    try {
      axios
        .post(import.meta.env.VITE_BASE_URL + "/api/register", {
          name,
          email,
          password,
          password_confirmation: cpassword,
        })
        .then((response) => {
          navigate("/signin", { state: { userData: response.data } });
        })
        .catch((error) => {
          setError("Error Validated");
        });
    } catch (err) {
      setError(verbose ? err.message : "Failed created the account");
    }
    setWaiting(false);
  }

  return (
    <>
      <Title name="Sign Up" />
      <div className="mt-10 py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="flex flex-col justify-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Setup Your Account To Access Backend
          </h1>
          <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            Here we focus on markets where technology, innovation, and capital
            can unlock long-term value and drive economic growth.
          </p>
        </div>
        <div>
          <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-lime-200 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 ">
              Sign Up to Backed Panel
            </h2>
            <form className="mt-8 space-y-6" onSubmit={submitHandler}>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm capitalize font-medium text-gray-900"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="name...."
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block required mb-2 text-sm capitalize font-medium text-gray-900"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 required border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="example@gmail.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 required border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirmation_password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Confirmation Password
                </label>
                <input
                  type="password"
                  name="confirmation_password"
                  id="confirmation_password"
                  placeholder="••••••••"
                  onChange={(e) => setCPassword(e.target.value)}
                  className="bg-gray-50 required border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  required
                />
              </div>
              {waiting == true ? (
                <span className="w-full px-5 py-3 text-base font-medium text-center text-slate-400 bg-blue-500 rounded-lg focus:ring-4 focus:ring-blue-300 sm:w-auto ">
                  Loading...
                </span>
              ) : (
                <button
                  type="submit"
                  className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto "
                >
                  Register account
                </button>
              )}
            </form>
            <a href="/signin">Have Account ?</a>
          </div>
        </div>
      </div>
    </>
  );
}
