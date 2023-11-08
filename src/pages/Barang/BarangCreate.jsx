import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../lib/axios";

const BarangCreate = () => {
  const [nama_barang, setNamaBarang] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [tanggal_masuk, setTanggal] = useState("");
  const [harga_satuan, setHarga] = useState("");
  const [isImage, setisImage] = useState(null);
  const [error, setError] = useState("");
  const [waiting, setWaiting] = useState(false);
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    // Menggunakan useEffect untuk mengawasi perubahan input file
    const inputElement = document.getElementById("id-img"); // Ganti dengan ID input file Anda
    inputElement.addEventListener("change", handleChange);

    return () => {
      // Membersihkan event listener saat komponen unmount
      inputElement.removeEventListener("change", handleChange);
    };
  }, []);

  const csrf = () => axios.get("api/sanctum/csrf");
  // console.log(csrf());
  async function submitHandler(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nama_barang", nama_barang);
    formData.append("keterangan", keterangan);
    formData.append("image", selectedFile);
    formData.append("tanggal_masuk", tanggal_masuk);
    formData.append("harga_satuan", harga_satuan);

    setWaiting(true);
    await csrf().then((res) => {
      // console.log(res);
      axios
        .post("/api/barang", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          toast.success(`Barang Has Created!`);
          setNamaBarang("");
          setKeterangan("");
          setTanggal("");
          setHarga("");
          setError("");
          setWaiting(false);
        })
        .catch((error) => {
          setError("Data Cannot Store");
          setWaiting(false);
        });
    });
  }

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
              required
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

export default BarangCreate;
