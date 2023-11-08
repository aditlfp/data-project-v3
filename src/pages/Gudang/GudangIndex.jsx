import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import BtnError from "../../components/BtnError";
import BtnYellow from "../../components/BtnYellow";
import SearchComponent from "../../components/SearchComponent";
import Title from "../../components/Title";
import axios from "../../lib/axios";
import GudangList from "./GudangList";
import NewGudang from "./NewGudang";

export default function GudangIndex() {
  const [dataFromChild, setDataFromChild] = useState(null);
  const [list, setList] = useState();
  const [newList, setNewList] = useState();
  const [gudang, setGudang] = useState();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);
  const [newG, setNewG] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  //   console.log(gudang);

  const handleDataFromChild = (data) => {
    setDataFromChild(data);
  };

  // Handle Debounced Search
  const searchDebounced = debounce((params) => {
    SearchQuery(params);
  }, 200);

  const SearchQuery = async (params) => {
    try {
      if (params.trim() === "") {
        fetchGudang();
        fetchData();
      } else {
        setLoading(true);
        if (!newG) {
          const res = await axios
            .get("/api/gudang", {
              params: { search: params },
            })
            .then((res) => {
              setGudang(res);
              // console.log(res);
              setLoading(false);
            });
        } else {
          const res = await axios
            .get("/api/barang", {
              params: { search: params },
            })
            .then((res) => {
              setList(res.data);
              // console.log(res);
              setLoading(false);
            });
        }
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

  const fetchData = () => {
    axios
      .get("api/barang")
      .then((res) => setList(res.data))
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          navigate("/signin");
        } else {
          navigate("/signin");
        }
      });
  };

  const fetchGudang = () => {
    axios
      .get("api/gudang")
      .then((res) => setGudang(res))
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          navigate("/signin");
        } else {
          navigate("/signin");
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (show) {
      fetchGudang();
    }
  }, [show]);

  const handleGudangUpdate = () => {
    fetchGudang();
  };

  const newGudang = () => {
    setNewG(!newG);
    fetchData();
  };

  return (
    <div>
      <Title name="stock gudang" />
      <ToastContainer />
      {show && gudang ? (
        !newG ? (
          <div className="flex flex-col">
            <div className="flex items-center justify-end gap-x-2 mr-5">
              <div className="flex items-center mt-2">
                <BtnYellow onClick={newGudang}>new</BtnYellow>
              </div>
              <SearchComponent onChange={handleSearchChange} />
            </div>
            <GudangList
              loading={loading}
              data={gudang}
              dataBarang={list}
              onUpdate={handleGudangUpdate}
            />
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="flex justify-end mb-2 items-center gap-x-2 mr-5">
              <div className="flex items-center mt-2">
                <BtnError onClick={newGudang}>close</BtnError>
              </div>
              <SearchComponent onChange={handleSearchChange} />
            </div>
            <NewGudang data={list} update={handleGudangUpdate} />
          </div>
        )
      ) : (
        <div className="flex justify-center items-center my-20">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
    </div>
  );
}
