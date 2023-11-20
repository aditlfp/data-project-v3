import React, { useEffect, useState } from "react";
import axios from "../../lib/axios";
import { toast } from "react-toastify";

const UserEdit = ({ props, datas }) => {
  //   console.log(props, "aku Datas", datas);

  const [name, setName] = useState(props.name);
  const [role_id, setRole] = useState(props.role_id);
  const [mitra_id, setMitra] = useState(props.mitra_id);
  const [email, setEmail] = useState(props.email);
  const [password, setPassword] = useState(props.password);
  const [confirmation_password, setConfirm] = useState();
  const [awaiting, setAwaiting] = useState(false);
  const [role, setRoles] = useState([]);
  const [mitras, setMitras] = useState([]);

  useEffect(() => {
    setRoles(datas.data.role);
  }, []);

  useEffect(() => {
    setMitras(datas.data.mitra);
  }, []);

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleMitraChange = (e) => {
    setMitra(e.target.value);
  };

  const csrf = () => axios.get("api/sanctum/csrf");
  //   console.log(csrf());

  const submitHandler = async (e) => {
    e.preventDefault();
    setAwaiting(true);
    if (csrf) {
      await axios
        .patch(`api/user/${props.id}`, {
          name,
          role_id,
          mitra_id,
          email,
          password,
          confirmation_password,
        })
        .then((res) => {
          toast.success(`User Has Updated!`);
          setAwaiting(false);
        });
    } else {
      console.error("CSRF : Missmatch");
    }
  };

  return (
    <div className="card flex-shrink justify-center w-full shadow-2xl bg-base-100">
      <form
        onSubmit={submitHandler}
        className="card-body"
        encType="multipart/form-data"
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Nama</span>
          </label>
          <input
            type="text"
            placeholder="Name ..."
            className="input input-bordered"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Role</span>
          </label>
          <select
            className="select select-bordered w-full"
            onChange={handleRoleChange}
            defaultValue={0}
          >
            <option disabled value={0}>
              Select Role
            </option>
            {role.map((item, i) => (
              <option
                selected={item.id == role_id ? true : ""}
                value={item.id}
                key={i}
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Mitra</span>
          </label>
          <select
            className="select select-bordered w-full"
            onChange={handleMitraChange}
            defaultValue={0}
          >
            <option disabled value={0}>
              Select Mitra
            </option>
            {mitras.map((item, i) => (
              <option
                selected={item.id == mitra_id ? true : ""}
                value={item.id}
                key={i}
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="example@gmail.com ..."
            className="input input-bordered"
            value={email}
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Confirmation Password</span>
          </label>
          <input
            type="password"
            placeholder="Confirmation password"
            className="input input-bordered"
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>
        <div className="form-control mt-6">
          {awaiting ? (
            <span className="bg-sky-300 text-center py-3 rounded-md text-black font-semibold">
              Loading....
            </span>
          ) : (
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserEdit;
