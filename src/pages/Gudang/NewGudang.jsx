import { FormatRupiah } from "@arismun/format-rupiah";
import React from "react";
import { RiAddCircleFill } from "react-icons/ri";
import { toast } from "react-toastify";
import axios from "../../lib/axios";

function NewGudang({ data, update }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const csrf = () => axios.get("api/sanctum/csrf");

  async function addItems(id) {
    const barang = data.data.find((item) => item.id === id);
    const barang_id = barang.id;

    await csrf().then(async (res) => {
      try {
        axios.post(`api/gudang-v2/${barang_id}`).then((res) => {
          toast.info("Add To Gudang!");
          setTimeout(() => {
            toast.dismiss();
          }, 1800);
          update();
        });
      } catch (error) {
        console.error(error);
      }
    });
  }

  return (
    <>
      <div className="overflow-x-auto mx-5 rounded-md">
        <table className="table table-xs table-zebra">
          <thead className="text-black">
            <tr className="bg-slate-300">
              <th>No</th>
              <th>Image</th>
              <th>Name</th>
              <th>Harga Satuan</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-white table-zebra bg-slate-500">
            {data.data.length >= 1 ? (
              <>
                {data.data.map((item, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      <img
                        src={baseUrl + "/storage/images/" + item.image}
                        width={50}
                      />
                    </td>
                    <td>{item.nama_barang}</td>
                    <td>
                      <FormatRupiah value={item.harga_satuan} />
                    </td>
                    <td>
                      <div className="flex items-center gap-x-3">
                        <button
                          onClick={() => addItems(item.id)}
                          className="text-2xl text-green-500"
                        >
                          <RiAddCircleFill />
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
        </table>
      </div>
    </>
  );
}

export default NewGudang;
