import React, { useEffect, useState } from "react";
import { RiDraftFill } from "react-icons/ri";
import { TbTrashXFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Paginate from "../../components/Paginate";
import axios from "../../lib/axios";
import UserEdit from "./UserEdit";

function UserList({ props, onUpdate, datas }) {
  //   console.log(props);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [show, setShow] = useState(false);
  const [btn, setBtn] = useState(false);
  // let [qty, setCount] = useState(0);
  const [child, setChild] = useState(false);
  const [id, setId] = useState();
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});
  const [data, setData] = useState();
  const [userList, setUserList] = useState();
  const csrf = () => axios.get("api/sanctum/csrf");

  const create = () => {
    setShow(true);
  };

  const handleDelete = (id) => {
    axios.delete(`/api/user/${id}`).then((res) => {
      toast.warning("Data Has Deleted !");
      onUpdate();
    });
  };

  const navigasi = () => {
    navigate(-1);
  };

  const close = () => {
    setShow(false);
    onUpdate();
  };

  useEffect(() => {
    props;
  }, [props]);

  const handleEdit = (id) => {
    const editedUser = props.data.find((item) => item.id === id);
    setUserList(editedUser);
    setShow(true);
    onUpdate();
  };
  return (
    <div>
      {!show ? (
        <>
          <div className="overflow-x-auto mx-5 rounded-md">
            <table className="table table-xs table-zebra">
              <thead className="text-black">
                <tr className="bg-slate-300">
                  <th>No</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Mitra</th>
                  <th>Email</th>
                  <th>Created At</th>
                  <th>Action</th>
                </tr>
              </thead>
              {props.data ? (
                <tbody>
                  {props.data.map((user, i) => (
                    <tr key={i}>
                      <th>{i + 1}</th>
                      <td>{user.name}</td>
                      <td>{user.role}</td>
                      <td>{user.mitra}</td>
                      <td>{user.email}</td>
                      <td>{user.created_at}</td>
                      <td>
                        <div className="flex items-center gap-x-3">
                          <button
                            onClick={() => handleEdit(user.id)}
                            className="text-2xl text-yellow-400 hover:text-yellow-600 transition-all ease-linear .2s"
                          >
                            <RiDraftFill />
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="text-2xl text-red-600 hover:text-red-700 transition-all ease-linear .2s"
                          >
                            <TbTrashXFilled />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <>
                  <tbody>
                    <tr>
                      <td colSpan={7}>
                        <span className="text-bold text-blue-500">
                          Data Saat Ini Kosong
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </>
              )}
            </table>
          </div>
          <div className="flex justify-center my-2">
            <Paginate meta={props.meta} />
          </div>
        </>
      ) : (
        <div className="mx-10">
          <button
            onClick={() => close()}
            className="bg-red-500 hover:bg-red-700 transition-all ease-in-out .2s mb-5 text-white font-bold rounded-full flex justify-center items-center"
          >
            <span className="px-[0.95rem] py-2">&times;</span>
          </button>
          <UserEdit props={userList} datas={datas} />
        </div>
      )}
    </div>
  );
}

export default UserList;
