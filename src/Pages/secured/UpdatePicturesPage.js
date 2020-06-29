import React from "react";
import Link from "react-router-dom/Link";
import ProfilePicture from "../../Components/UpdatePictures/ProfilePicture";

export default function UpdatePicturesPage() {
  return (
    <div className="content-wrapper">
      {/* <!-- Content Header (Page header) --> */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Profile</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item active">Update images</li>
              </ol>
            </div>
          </div>
        </div>
        {/* <!-- /.container-fluid --> */}
      </section>

      <div className="container-fluid row">
        <div className="col-12 col-md-6 mx-auto text-center">
          <ProfilePicture></ProfilePicture>
        </div>

        <div className="col-12 col-md-6 mx-auto text-center">
          <ProfilePicture cover={true}></ProfilePicture>
        </div>
      </div>
    </div>
  );
}
