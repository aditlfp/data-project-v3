import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import BtnError from "../../components/BtnError";
import DrawerMenu from "../../components/DrawerMenu";
import SearchComponent from "../../components/SearchComponent";
import Title from "../../components/Title";
import axios from "../../lib/axios";
import UserCreate from "./UserCreate";
import UserList from "./UserList";

function UserIndex() {
  const [user, setUser] = useState();
  const [show, setShow] = useState(false);
  const [data, setData] = useState();
  const [search, setSearch] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    await axios.get("api/user").then((res) => {
      setLoading(false);
      setUser(res.data);
    });
  };

  const fetchCreate = async () => {
    await axios.get("api/user/create").then((res) => {
      setData(res);
    });
  };
  const csrf = () => axios.get("api/sanctum/csrf");

  useEffect(() => {
    fetchCreate();
  }, []);

  // Handle Debounced Search
  const searchDebounced = debounce((params) => {
    SearchQuery(params);
  }, 500);

  const SearchQuery = async (params) => {
    try {
      if (params.trim() == "") {
        fetchData();
      } else {
        setLoading(true);
        await axios
          .get("/api/user", {
            params: { search: params },
          })
          .then((res) => {
            setLoading(false);
            setUser(res.data);
          });
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

  const handleUserUpdate = () => {
    fetchData();
  };

  useEffect(() => {
    if (!show) {
      fetchData();
    }
  }, [show]);

  const create = () => {
    setShow(true);
  };

  const navigasi = () => {
    navigate(-1);
  };

  const close = () => {
    setShow(false);
  };

  // console.log(user);

  return (
    <>
      <ToastContainer />
      <Title name="Data User" />
      <DrawerMenu>
        <div className="flex justify-end mr-5">
          {show ? (
            <BtnError onClick={(e) => close()}>close</BtnError>
          ) : (
            <div className="flex gap-x-2 mb-2">
              <div>
                <SearchComponent onChange={handleSearchChange} />
              </div>
              <button onClick={() => navigasi()} className="btn btn-error">
                back
              </button>
              <button onClick={() => create()} className="btn btn-primary">
                create
              </button>
            </div>
          )}
        </div>
        {show ? (
          <>{data ? <UserCreate csrf={csrf} data={data} /> : "Loading"}</>
        ) : user ? (
          loading ? (
            <div className="flex justify-center items-center my-20">
              <span className="loading loading-spinner loading-lg bg-blue-400"></span>
            </div>
          ) : (
            <UserList
              props={user}
              datas={data}
              csrf={csrf}
              onUpdate={handleUserUpdate}
            />
          )
        ) : (
          <div className="flex justify-center items-center my-20">
            <span className="loading loading-spinner loading-lg bg-blue-400"></span>
          </div>
        )}
      </DrawerMenu>
    </>
  );
}

export default UserIndex;
