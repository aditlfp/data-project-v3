import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../../lib/axios";

function UserCreate({ csrf, data }) {
  const [name, setName] = useState();
  const [role_id, setRole] = useState();
  const [mitra_id, setMitra] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmation_password, setConfirm] = useState();
  const [awaiting, setAwaiting] = useState(false);
  const [role, setRoles] = useState([]);
  const [mitras, setMitras] = useState([]);

  useEffect(() => {
    setRoles(data.data.role);
  }, []);

  useEffect(() => {
    setMitras(data.data.mitra);
  }, []);

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleMitraChange = (e) => {
    setMitra(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setAwaiting(true);
    if (csrf) {
      await axios
        .post("api/user", {
          name,
          role_id,
          mitra_id,
          email,
          password,
          confirmation_password,
        })
        .then((res) => {
          toast.success(`User Has Created!`);
          setAwaiting(false);
          setName("");
          setRole("");
          setMitra("");
          setEmail("");
          setPassword("");
          setConfirm("");
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
            <span className="label-text required">Nama</span>
          </label>
          <input
            type="text"
            placeholder="Name ..."
            className="input input-bordered"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text required">Role</span>
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
              <option value={item.id} key={i}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text required">Mitra</span>
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
              <option value={item.id} key={i}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text required">Email</span>
          </label>
          <input
            type="email"
            placeholder="example@gmail.com ..."
            className="input input-bordered"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text required">Password</span>
          </label>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text required">Confirmation Password</span>
          </label>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered"
            required
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
}

export default UserCreate;
