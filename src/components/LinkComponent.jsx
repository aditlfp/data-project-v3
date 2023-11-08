import React from "react";
import { Link } from "react-router-dom";

function LinkComponent({ href, title }) {
  return (
    <Link
      href={href}
      className="block py-2 pl-3 pr-4 hover:bg-fuchsia-800 text-black hover:text-gray-100 rounded transition-all ease-linear .2s"
      aria-current="page"
    >
      {title}
    </Link>
  );
}

export default LinkComponent;
