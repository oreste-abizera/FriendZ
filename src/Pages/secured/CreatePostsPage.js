import React from "react";
import Link from "react-router-dom/Link";
import CreatePost from "../../Components/CreatePostsPage/CreatePost";

export default function CreatePostsPage({ history }) {
  return (
    <div className="content-wrapper">
      {/* <!-- Content Header (Page header) --> */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">
                <b>Friend</b>Z
              </h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item active">Create Post</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Main content --> */}
      <div className="content">
        <div className="container-fluid">
          <CreatePost history={history}></CreatePost>
        </div>
      </div>
    </div>
  );
}
