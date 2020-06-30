import React from "react";
// import Link from "react-router-dom/Link";
import LatestMembers from "../../Components/DashboardPage/LatestMembers";
import PostsContainer from "../../Components/DashboardPage/PostsContainer";

export default function DashboardPage() {
  return (
    // < !--Content Wrapper.Contains page content-- >
    <div className="content-wrapper mt-2">
      {/* <!-- Content Header (Page header) --> */}
      {/* <div className="content-header">
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
                <li className="breadcrumb-item active">Dashboard</li>
              </ol>
            </div>
          </div>
        </div>
      </div> */}

      {/* <!-- Main content --> */}
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-5"></div>
            <div className="col-12 col-lg-6 mx-auto">
              <PostsContainer></PostsContainer>
            </div>
            <div className="col-12 mx-auto col-lg-4 latest-members">
              <LatestMembers></LatestMembers>
            </div>
          </div>
          {/* <!-- /.row --> */}
        </div>
        {/* <!-- /.container-fluid --> */}
      </div>
      {/* <!-- /.content --> */}
    </div>
    // <!-- /.content-wrapper -->
  );
}
