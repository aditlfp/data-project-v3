import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileImg from "../../assets/images/cv.png";
import BtnError from "../../components/BtnError";

function ProfileIndex({ data }) {
  const navigate = useNavigate();
  const date = new Date(data.data[0].created_at);
  const updated = new Date(data.data[0].updated_at);
  const localeDate = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "full",
  }).format(date);
  const updatedDate = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "full",
  }).format(updated);

  const back = () => {
    navigate(-1);
  };

  console.log(data);
  return (
    <>
      {data.status ? (
        <>
          <div className="flex gap-x-5">
            <div className="card w-96 ml-5 bg-slate-300/40 shadow-xl image-full">
              <figure>
                <img src={ProfileImg} alt="profile image" />
              </figure>
              <div className="card-body pr-10">
                <div className="bg-green-500 text-black font-semibold px-2 w-fit text-xs rounded-2xl">
                  <span>You Login As {data.data[0].role.name}</span>
                </div>
                <div className="flex gap-2">
                  <span className="flex flex-col">
                    <h2 className="capitalize font-semibold">name </h2>
                    <h2 className="capitalize font-semibold">email </h2>
                    <h2 className="capitalize font-semibold">Dibuat </h2>
                    <h2 className="capitalize font-semibold">
                      Terakhir Update{" "}
                    </h2>
                  </span>
                  <span className="flex flex-col">
                    <span className="uppercase font-semibold">
                      : {data.data[0].name}
                    </span>
                    <span className="font-semibold">
                      : {data.data[0].email}
                    </span>
                    <span className="font-semibold">: {localeDate}</span>
                    <span className="font-semibold">: {updatedDate}</span>
                  </span>
                </div>
              </div>
              <div></div>
            </div>
            <BtnError onClick={back}>Back</BtnError>
            <div className="bg-red-50">
              <h2>P</h2>
            </div>
          </div>
        </>
      ) : (
        navigate("/signin")
      )}
    </>
  );
}

export default ProfileIndex;
