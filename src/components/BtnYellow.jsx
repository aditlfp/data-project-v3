import React from "react";

function BtnYellow({ children, onClick }) {
  return (
    <>
      <button
        onClick={onClick}
        className="btn bg-yellow-500 border-0 text-black focus:border-0 mb-2 hover:bg-yellow-600"
      >
        {children}
      </button>
    </>
  );
}

export default BtnYellow;
