import { Link } from "react-router-dom";

const Paginate = ({ meta }) => {
  const prev = meta.links[0].url;
  const next = meta.links[meta.links.length - 1].url;
  const current = meta.current_page;

  return (
    <div className="join shadow-md">
      {prev && (
        <Link
          href={prev}
          className="join-item btn bg-blue-600 hover:bg-blue-800"
        >
          «
        </Link>
      )}
      <button className="join-item btn bg-blue-600 hover:bg-blue-800">
        {current}
      </button>
      {next && (
        <Link
          href={next}
          className="join-item btn bg-blue-600 hover:bg-blue-800"
        >
          »
        </Link>
      )}
    </div>
  );
};

export default Paginate;
