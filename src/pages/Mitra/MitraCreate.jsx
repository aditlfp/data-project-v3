import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Kabup from "../../assets/json/API_PROV/kabupaten.json";
import provinsi from "../../assets/json/API_PROV/province.json";
import axios from "../../lib/axios";

function MitraCreate() {
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [province, setProvince] = useState();
  const [kabupaten, setKabupaten] = useState();
  const [zipcode, setZip] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [fax, setFax] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [file, setFile] = useState(null);
  const [waiting, setWaiting] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const [dataProv, setDataProv] = useState();

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
    formData.append("name", name);
    formData.append("address", address);
    formData.append("province", province);
    formData.append("kabupaten", kabupaten);
    formData.append("zipcode", zipcode);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("fax", fax);
    formData.append("logo", selectedFile);

    setWaiting(true);
    await csrf().then((res) => {
      // console.log(res);
      axios
        .post("/api/mitra", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          toast.success(`Mitra Has Created!`);
          setName("");
          setAddress("");
          setProvince("");
          setKabupaten("");
          setZip("");
          setEmail("");
          setPhone("");
          setFax("");
          setSelectedFile("");
          setWaiting(false);
        })
        .catch((error) => {
          setError("Data Cannot Store");
          setWaiting(false);
        });
    });
  }

  return (
    <div
      className={`card flex-shrink justify-center w-full shadow-2xl bg-base-100 ${
        waiting ? "blur-lg" : ""
      }`}
    >
      <form
        onSubmit={submitHandler}
        className="card-body"
        encType="multipart/form-data"
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text required">Image</span>
          </label>
          <img src={file} alt={file} width={200} className="rounded-xl mb-2" />
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
            <span className="label-text required">Nama Mitra</span>
          </label>
          <input
            type="text"
            placeholder="Nama Mitra ..."
            className="input input-bordered required"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text required">Address</span>
          </label>
          <input
            type="text"
            placeholder="Address ( Alamat )"
            className="input input-bordered required"
            required
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text required">Province</span>
          </label>
          <select
            defaultValue={0}
            className="select select-bordered"
            onChange={(e) => setProvince(e.target.value)}
          >
            <option disabled value={0}>
              Pilih Province
            </option>
            {provinsi.map((item, i) => (
              <option value={item.name} key={i}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text required">Kabupaten</span>
          </label>
          <select
            defaultValue={0}
            className="select select-bordered"
            onChange={(e) => setKabupaten(e.target.value)}
          >
            <option disabled value={0}>
              Pilih Kabupaten
            </option>
            {Kabup.map((item, i) => (
              <option key={i}>{item.name}</option>
            ))}
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text required">ZipCode</span>
          </label>
          <input
            type="text"
            placeholder="ZipCode ( Kode Pos )"
            className="input input-bordered required"
            required
            onChange={(e) => setZip(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text required">Email</span>
          </label>
          <input
            type="text"
            placeholder="Email ( email@gamil.com )"
            className="input input-bordered required"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text required">Phone</span>
          </label>
          <input
            type="text"
            placeholder="Phone ( 01920192 )"
            className="input input-bordered required"
            required
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text required">FAX</span>
          </label>
          <input
            type="text"
            placeholder="FAX ( 12456 )"
            className="input input-bordered required"
            required
            onChange={(e) => setFax(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn bg-yellow-500 border-0 text-black focus:border-0 mb-2 hover:bg-yellow-600"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default MitraCreate;
