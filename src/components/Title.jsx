import React from "react";

function Title({ name }) {
  return (
    <>
      <title>sys-backend - {name? name : ""}</title>
    </>
  );
}

export default Title;
