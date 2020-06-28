import React from "react";
import { Link } from "react-router-dom";

export default function PageHeader() {
  const pageStyles = {
    backgroundImage: "url()",
  };
  return (
    <div className="page-header page-header-small">
      <div className="page-header-image" style={pageStyles}></div>
      <div className="content-center">
        <div className="col-md-8 ml-auto mr-auto">
          <div className="brand">
            <h2 className="title">
              <b className="font-weight-bolder">Friend</b>Z
            </h2>
            <h3 className="description">Join our Community now</h3>
            <br />
            <Link to="/register" className="btn btn-primary btn-round btn-lg">
              Get started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
