import React from "react";
import { Link } from "react-router-dom";

function LinkActiveComponent({ href, title }) {
  return (
    <Link
      href={href}
      className="block py-2 pl-3 pr-4 bg-fuchsia-800 text-white rounded"
      aria-current="page"
    >
      {title}
    </Link>
  );
}

export default LinkActiveComponent;
