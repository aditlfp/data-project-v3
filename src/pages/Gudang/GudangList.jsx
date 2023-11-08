import { useEffect, useState } from "react";
import {
  RiAddCircleFill,
  RiCheckboxIndeterminateFill,
  RiDraftFill,
} from "react-icons/ri";
import { TbTrashXFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BtnError from "../../components/BtnError";
import Paginate from "../../components/Paginate";
import axios from "../../lib/axios";
import NewGudang from "./NewGudang";

const Gudang = ({ data, onUpdate, dataBarang, loading, setChildToParent }) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [show, setShow] = useState(false);
  const [btn, setBtn] = useState(false);
  // let [qty, setCount] = useState(0);
  const [child, setChild] = useState(false);
  const [id, setId] = useState();
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});
  const csrf = () => axios.get("api/sanctum/csrf");

  useEffect(() => {
    if (data.data.data.length > 0) {
      const initialQuantities = {};

      data.data.data.forEach((item) => {
        initialQuantities[item.id] = item.qty;
      });

      setQuantities(initialQuantities);
    }
  }, [data.data.data]);

  const handleQtyChange = (itemId, newQty) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: newQty,
    }));
  };

  async function submit(itemId) {
    const newQty = quantities[itemId];

    await csrf().then((res) => {
      axios.patch(`api/gudang/${itemId}`, { qty: newQty }).then((res) => {
        toast.info("Stock Has Updated!");
      });
    });
  }

  const newCount = () => {
    setBtn(!btn);
    onUpdate();
  };

  const close = () => {
    setShow(!show);
    onUpdate();
  };

  const navigasi = () => {
    navigate(-1);
  };

  // async function submit(e) {
  //   await csrf().then((res) => {
  //     axios.patch(`api/gudang/${id}`, { qty }).then((res) => {
  //       toast.info("Stock Has Updated!");
  //     });
  //   });
  // }

  const handleDelete = (id) => {
    axios.delete(`/api/gudang/${id}`).then((res) => {
      toast.warning("Data Has Deleted !");
      onUpdate();
    });
  };

  return (
    <div>
      <div className="flex justify-end mr-5">
        {show ? (
          <BtnError onClick={(e) => close()}>close</BtnError>
        ) : (
          <div className="flex gap-x-2 mb-2">
            <button onClick={() => navigasi()} className="btn btn-error">
              back
            </button>
          </div>
        )}
      </div>
      {show ? (
        <>
          <NewGudang data={dataBarang} update={onUpdate} />
        </>
      ) : (
        <>
          <div className="overflow-x-auto mx-5 rounded-md">
            <table className="table table-xs table-zebra">
              <thead className="text-black">
                <tr className="bg-slate-300">
                  <th>No</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Stock Digudang</th>
                  <th>Action</th>
                </tr>
              </thead>
              {!loading ? (
                <tbody className="text-white table-zebra">
                  {data.data.data.length >= 1 ? (
                    <>
                      {data.data.data.map((item, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>
                            <img
                              src={
                                baseUrl + "/storage/images/" + item.barang.image
                              }
                              width={50}
                            />
                          </td>
                          <td>{item.barang.nama_barang}</td>
                          <td>
                            <div className="flex flex-col gap-y-2">
                              <div>
                                {btn ? "" : <>{item.qty}</>}
                                <div
                                  className={`transition-transform ease-in-out duration-[500] ${
                                    btn ? "-rotate-[1.5deg]" : "rotate-0"
                                  }`}
                                >
                                  {btn ? (
                                    <button
                                      onClick={() => newCount()}
                                      className="text-lg text-blue-600"
                                    >
                                      <RiCheckboxIndeterminateFill />
                                    </button>
                                  ) : (
                                    <>
                                      <button
                                        onClick={() => {
                                          newCount();
                                          setId(item.id);
                                        }}
                                        className="text-lg text-blue-600"
                                      >
                                        <RiAddCircleFill />
                                      </button>
                                    </>
                                  )}
                                </div>
                              </div>
                              {btn ? (
                                <>
                                  <div className="flex items-center gap-x-2">
                                    <button
                                      disabled={
                                        quantities[item.id] <= 0 ? true : false
                                      }
                                      onClick={() =>
                                        handleQtyChange(
                                          item.id,
                                          (quantities[item.id] -= 1)
                                        )
                                      }
                                      className="btn btn-xs btn-error"
                                    >
                                      -
                                    </button>
                                    <input
                                      type="text"
                                      value={quantities[item.id]}
                                      onChange={(e) =>
                                        handleQtyChange(item.id, e.target.value)
                                      }
                                      className="w-[20%] input input-xs input-bordered"
                                    />
                                    <button
                                      onClick={() =>
                                        handleQtyChange(
                                          item.id,
                                          (quantities[item.id] += 1)
                                        )
                                      }
                                      className="btn btn-xs btn-info"
                                    >
                                      +
                                    </button>
                                    <button
                                      type="submit"
                                      onClick={() => submit(item.id)}
                                      className="btn btn-warning btn-xs"
                                    >
                                      save
                                    </button>
                                  </div>
                                </>
                              ) : (
                                ""
                              )}
                            </div>
                          </td>
                          <td>
                            <div className="flex items-center gap-x-3">
                              <button
                                onClick={() => handleEdit(item.id)}
                                className="text-2xl text-yellow-400 hover:text-yellow-600 transition-all ease-linear .2s"
                              >
                                <RiDraftFill />
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="text-2xl text-red-600 hover:text-red-700 transition-all ease-linear .2s"
                              >
                                <TbTrashXFilled />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <>
                      <tr>
                        <td colSpan={7}>
                          <div className="text-center my-20">
                            <span className="text-center bg-slate-300 text-black p-3 rounded-md font-bold">
                              Gudang Masih Kosong
                            </span>
                          </div>
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              ) : (
                <>
                  <tbody>
                    <tr>
                      <td colSpan={5}>
                        <div className="flex justify-center items-center my-20">
                          <span className="loading loading-spinner loading-lg"></span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </>
              )}
            </table>
          </div>
        </>
      )}
      <div className="flex justify-center my-2">
        <Paginate meta={data.data.meta} />
      </div>
    </div>
  );
};

const GudangList = ({
  data,
  onUpdate,
  dataBarang,
  loading,
  setChildToParent,
}) => {
  return Gudang({ data, onUpdate, dataBarang, loading, setChildToParent });
};

export default GudangList;
