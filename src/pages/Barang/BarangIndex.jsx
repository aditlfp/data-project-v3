import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import BtnError from "../../components/BtnError";
import BtnYellow from "../../components/BtnYellow";
import SearchComponent from "../../components/SearchComponent";
import Title from "../../components/Title";
import axios from "../../lib/axios";
import BarangCreate from "./BarangCreate";
import BarangList from "./BarangList";

function BarangIndex() {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);
  const [list, setList] = useState();
  const [search, setSearch] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchData = () => {
    axios
      .get("api/barang")
      .then((res) => setList(res.data))
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          navigate("/signin");
        } else {
          // Handle other errors here
          console.error("An error occurred:", err);
        }
      });
  };

  // Handle Debounced Search
  const searchDebounced = debounce((params) => {
    SearchQuery(params);
  }, 500);

  const SearchQuery = async (params) => {
    try {
      if (params.trim() == "") {
        fetchData();
      } else {
        const res = await axios.get("/api/barang", {
          params: { search: params },
        });
        setList(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    searchDebounced(term);
  };
  // End Handle Debounced Search

  useEffect(() => {
    if (show) {
      fetchData();
    }
  }, [show]);

  const handleBarangUpdate = () => {
    fetchData();
  };

  function hideModal() {
    setShow(false);
  }

  const navigasi = () => {
    navigate(-1);
  };

  function newBarang() {
    setLoading(true);
    setTimeout(() => {
      setShow(!show);
      setLoading(false);
    }, 800);
  }

  return (
    <>
      <ToastContainer />
      <Title name="Data Barang" />

      <span className="ml-4 text-xs rounded-full bg-indigo-400 pr-5 pl-1 mb-3 flex w-fit items-center">
        <span className="mb-[3px] ml-1">
          <a
            onClick={navigasi}
            href="javascript:void(0)"
            className="text-black hover:text-slate-600 transition-all ease-linear .2s"
          >
            dashboard &gt;{" "}
          </a>
          <a href="#" className="text-slate-600">
            barang
          </a>
        </span>
      </span>
      <div className="bg-indigo-300/70 min-h-screen mx-4 rounded-xl">
        <div className="flex justify-center">
          <span className="text-3xl font-bold text-black my-5">
            {show ? "Data Barang" : "Tambah Barang"}
          </span>
        </div>
        <div className="flex justify-end mr-11">
          {show ? (
            <div className="flex gap-x-2">
              <div>
                <SearchComponent onChange={handleSearchChange} />
              </div>
              <BtnError onClick={navigasi}>Back</BtnError>
              <BtnYellow onClick={newBarang}>+ Barang</BtnYellow>
            </div>
          ) : (
            <BtnError onClick={newBarang}>Close</BtnError>
          )}
        </div>
        <div className="mx-10 bg-[#111827] py-2 rounded-xl">
          {loading ? (
            <div className="flex justify-center items-center my-20">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : show && list ? (
            <BarangList barang={list} onUpdate={handleBarangUpdate} />
          ) : list ? (
            <BarangCreate />
          ) : (
            <div className="flex justify-center items-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default BarangIndex;
