import React from "react";

function BtnError({ children, onClick }) {
  return (
    <button onClick={onClick} className="btn bg-red-500 border-0 text-black focus:border-0 mb-2 hover:bg-red-600">
      {children}
    </button>
  );
}

export default BtnError;
