import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "../lib/axios";
import Title from "./Title";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [waiting, setWaiting] = useState(false);
  const { signin } = useAuth();
  const navigate = useNavigate();
  const verbose = true;

  const csrf = () => axios.get("api/sanctum/csrf");
  // console.log(csrf());
  async function submitHandler(e) {
    e.preventDefault();
    setWaiting(true);

    try {
      await csrf();
      axios
        .post("/api/login", {
          email,
          password,
        })
        .then((response) => {
          navigate("/dashboard", { state: { userData: response.data } });
        })
        .catch((error) => {
          setError("Data Not Found");
        });
    } catch (err) {
      setError(verbose ? err.message : "Failed To Login");
    }
    setWaiting(false);
  }

  return (
    <>
      <Title name="login" />
      <div className="bg-gradient-to-l from-sky-600 to-base-300/0.1 h-screen ml-[39rem]" />
      <div className="mt-20 py-8 px-4 absolute inset-0 mx-auto max-w-screen-xl lg:py-16 flex justify-center items-center gap-8 lg:gap-16">
        <div>
          <div className="flex-col lg:flex-row-reverse">
            <div className="card flex-shrink-0 w-full px-10 shadow-xl">
              <form className="card-body" onSubmit={submitHandler}>
                <div className="text-center">
                  <h1 className="text-5xl font-bold text-slate-700 rounded-md">
                    Login Now !!
                  </h1>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="text-start">
                    <a
                      href="/signup"
                      className="italic text-xs hover:text-blue-700 transition-all ease-in-out .2s"
                    >
                      <span className="text-center">
                        Dont Have Account ? Create
                      </span>
                    </a>
                  </div>
                </div>
                <div className="form-control mt-6">
                  <button
                    className="btn btn-primary"
                    disabled={!waiting ? false : true}
                  >
                    {!waiting ? "Login" : "Loading..."}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
