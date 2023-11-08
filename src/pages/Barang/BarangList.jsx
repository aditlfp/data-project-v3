import { FormatRupiah } from "@arismun/format-rupiah";
import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { RiDraftFill } from "react-icons/ri";
import { TbTrashXFilled } from "react-icons/tb";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Paginate from "../../components/Paginate";
import axios from "../../lib/axios";
import BarangEdit from "./BarangEdit";

const isData = ({ barang, onUpdate }) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [barangList, setBarangList] = useState([]);
  // console.log(barang);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const handleDelete = (id) => {
    axios.delete(`/api/barang/${id}`).then((res) => {
      toast.warning("Data Has Deleted !");
      onUpdate();
    });
  };

  useEffect(() => {
    if (!show) {
      onUpdate();
    }
  }, [show]);

  const handleEdit = (id) => {
    const editedBarang = barang.data.find((item) => item.id === id);
    setBarangList(editedBarang);
    setShow(true);
    onUpdate();
  };

  return (
    <div>
      {show ? (
        <>
          <div className="flex justify-end mr-2">
            <button
              onClick={() => setShow(false)}
              className="text-2xl text-red-500 hover:text-red-600 transition-all ease-linear .2s"
            >
              <AiFillCloseCircle />
            </button>
          </div>
          <BarangEdit barang={barangList} />
        </>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-xs text-white">
            <thead>
              <tr>
                <th className="text-white">No</th>
                <th className="text-white">Image</th>
                <th className="text-white">Name</th>
                <th className="text-white">Keterangan</th>
                <th className="text-white">Harga Satuan</th>
                <th className="text-white">Tanggal Masuk</th>
                <th className="text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {barang.data.map((item, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    <img
                      src={baseUrl + "/storage/images/" + item.image}
                      width={50}
                    />
                  </td>
                  <td>{item.nama_barang}</td>
                  <td>{item.keterangan}</td>
                  <td>
                    <FormatRupiah value={item.harga_satuan} />
                  </td>
                  <td>{item.tanggal_masuk}</td>
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
            </tbody>
          </table>
        </div>
      )}
      <div className="flex justify-center my-2">
        <Paginate meta={barang.meta} />
      </div>
    </div>
  );
};

const noData = () => {
  return (
    <>
      <div className="text-center my-2">
        <span className="text-center font-bold text-white">
          Barang Masih Kosong
        </span>
      </div>
    </>
  );
};

const BarangList = ({ barang, onUpdate }) => {
  return barang.data.length <= 0 ? noData() : isData({ barang, onUpdate });
};

export default BarangList;
