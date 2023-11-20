import { useEffect, useState } from "react";
import { RiDraftFill } from "react-icons/ri";
import { TbTrashXFilled } from "react-icons/tb";
import Paginate from "../../components/Paginate";
import axios from "../../lib/axios";

const MitraList = () => {
  const [mitra, setMitra] = useState();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchMitra = async () => {
    await axios.get("api/mitra").then((res) => setMitra(res));
  };

  useEffect(() => {
    fetchMitra();
  }, []);

  console.log(mitra);

  return (
    <div>
      {mitra ? (
        <>
          <div className="overflow-x-auto mx-5 rounded-md">
            <table className="table table-xs table-zebra">
              <thead className="text-black">
                <tr className="bg-slate-300">
                  <th>No</th>
                  <th>Logo</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Kabupaten</th>
                  <th>Zipcode</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Fax</th>
                  <th>Action</th>
                </tr>
              </thead>
              {mitra.data.data ? (
                <tbody>
                  {mitra.data.data.map((item, i) => (
                    <tr key={i}>
                     <td>{i+1}</td>
                     <td>
                     <img
                      src={baseUrl + "/storage/images/" + item.logo}
                      width={60}
                    />
                     </td>
                     <td>{item.name}</td>
                     <td>{item.address}</td>
                     <td>{item.kabupaten}</td>
                     <td>{item.zipcode}</td>
                     <td>{item.email}</td>
                     <td>{item.phone}</td>
                     <td>{item.fax}</td>
                      <td>
                        <div className="flex items-center gap-x-3">
                          <button className="text-2xl text-yellow-400 hover:text-yellow-600 transition-all ease-linear .2s">
                            <RiDraftFill />
                          </button>
                          <button className="text-2xl text-red-600 hover:text-red-700 transition-all ease-linear .2s">
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
                      <td colSpan={10} className="text-center">
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
            <Paginate meta={mitra.data.meta} />
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center mt-32 text-blue-300">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
    </div>
  );
};

export default MitraList;
