import React from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchForm() {
  return (
    <form className="form-inline ml-3">
      <div className="input-group input-group-sm">
        <input
          className="form-control form-control-navbar"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <div className="input-group-append">
          <button className="btn btn-navbar" type="submit">
            <FaSearch></FaSearch>
          </button>
        </div>
      </div>
    </form>
  );
}
