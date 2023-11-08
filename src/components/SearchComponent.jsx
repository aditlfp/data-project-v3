import React from 'react'
import { RiSearchLine } from 'react-icons/ri'

function SearchComponent({ onChange }) {
  return (
    <>
        <div className="join items-center">
        <input
          type="text"
          id="search"
          className="input input-bordered rounded-r-none join-item"
          onChange={onChange}
        />
        <span className="join join-item input input-bordered rounded-l-none flex items-center bg-blue-300 text-black text-xl font-bold">
          <RiSearchLine />
        </span>
      </div>
    </>
  )
}

export default SearchComponent