import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../lib/axios";

const BarangEdit = ({ barang }) => {
  const [nama_barang, setNamaBarang] = useState(barang.nama_barang);
  const [keterangan, setKeterangan] = useState(barang.keterangan);
  const [tanggal_masuk, setTanggal] = useState(barang.tanggal_masuk);
  const [harga_satuan, setHarga] = useState(barang.harga_satuan);
  const [isImage, setisImage] = useState(barang.image);
  const [error, setError] = useState("");
  const [waiting, setWaiting] = useState(false);
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState([]);
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    const inputElement = document.getElementById("id-img"); // Ganti dengan ID input file Anda
    inputElement.addEventListener("change", handleChange);

    return () => {
      inputElement.removeEventListener("change", handleChange);
    };
  }, []);

  const csrf = () => axios.get("api/sanctum/csrf");

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nama_barang", nama_barang);
    formData.append("keterangan", keterangan);
    formData.append("tanggal_masuk", tanggal_masuk);
    formData.append("harga_satuan", harga_satuan);
    if (selectedFile != null) {
      formData.append("image", selectedFile);
      formData.append("oldimage", isImage);
    } else {
      formData.append("oldimage", isImage);
    }

    setWaiting(true);

    try {
      const csrfToken = await csrf();
      await axios
        .post(`/api/barang/${barang.id}?_method=PATCH`, formData, {
          headers: {
            "Content-Type":
              "multipart/form-data;boundary=----WebKitFormBoundaryyrV7KO0BoCBuDbTL",
            "X-CSRF-TOKEN": csrfToken,
          },
        })
        .then((res) => {
          toast.success("Data Has Updated !");
          setNamaBarang("");
          setKeterangan("");
          setTanggal("");
          setHarga("");
          setSelectedFile(null);
          setError("");
          setWaiting(false);
        });
    } catch (error) {
      setError("Data Cannot Store");
      setWaiting(false);
      console.error("Error while updating data:", error);
    }
  };

  return (
    <>
      <div className="card flex-shrink justify-center w-full shadow-2xl bg-base-100">
        <form
          onSubmit={submitHandler}
          className="card-body"
          encType="multipart/form-data"
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text required">Nama Barang</span>
            </label>
            <input
              type="text"
              placeholder="Nama Barang ..."
              className="input input-bordered"
              required
              value={nama_barang}
              onChange={(e) => setNamaBarang(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text required">Keterangan</span>
            </label>
            <input
              type="text"
              placeholder="Keterangan ...."
              className="input input-bordered"
              required
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text required">Image</span>
            </label>
            <img
              src={file}
              alt={file}
              width={200}
              className="rounded-xl mb-2"
            />
            <input
              id="id-img"
              type="file"
              placeholder="Keterangan ...."
              className="file-input file-input-bordered"
              accept="image/*"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text required">Tanggal Masuk</span>
            </label>
            <input
              type="date"
              placeholder="12/12/1200"
              className="input input-bordered"
              required
              value={tanggal_masuk}
              onChange={(e) => setTanggal(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text required">Harga Satuan</span>
            </label>
            <input
              type="text"
              placeholder="Harga Satuan ...."
              className="input input-bordered"
              required
              value={harga_satuan}
              onChange={(e) => setHarga(e.target.value)}
            />
          </div>
          <div className="form-control mt-6">
            {waiting ? (
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
    </>
  );
};

export default BarangEdit;
