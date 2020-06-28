import React from "react";
import { FaSearch } from "react-icons/fa";
import { MdWarning } from "react-icons/md";
import Link from "react-router-dom/Link";

export default function ErrorPage() {
  return (
    <div className="container col-8" style={{ marginTop: "10%" }}>
      <section className="content">
        <div className="login-logo">
          <Link to="/">
            <b>Friend</b>Z
          </Link>
        </div>
        <div className="error-page">
          <h2 className="headline text-warning"> 404</h2>

          <div className="error-content">
            <h3>
              <MdWarning className="text-warning"></MdWarning> Oops! Page not
              found.
            </h3>

            <p>
              We could not find the page you were looking for. Meanwhile, you
              may <Link to="/">return to home</Link> or try using the search
              form.
            </p>

            <form
              className="search-form"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="input-group">
                <input
                  type="text"
                  name="search"
                  className="form-control"
                  placeholder="Search"
                />
                <div className="input-group-append">
                  <button
                    type="submit"
                    name="submit"
                    className="btn btn-warning"
                  >
                    <FaSearch></FaSearch>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
