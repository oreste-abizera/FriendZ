import React from "react";
import { FriendZContext } from "../../context/context";
import { url, defaultImage } from "../../helpers/url";
import Link from "react-router-dom/Link";
import { FaAngleLeft, FaDotCircle, FaComments } from "react-icons/fa";
import { MdDashboard, MdClose } from "react-icons/md";

export default function Sidebar() {
  const {
    user: { info: user },
    toggleSidebar,
  } = React.useContext(FriendZContext);
  let image = user.image ? `${url}/uploads/${user.image}` : defaultImage;
  let name = `${user.firstName} ${user.lastName}`;
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* <!-- Brand Logo --> */}
      <div style={{ position: "relative" }}>
        <Link to="/dashboard" className="brand-link">
          <img
            src={`${url}/uploads/logo.gif`}
            alt="FriendZ"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">
            <b>Friend</b>Z
          </span>
        </Link>

        <span
          className="float-right d-lg-none"
          onClick={toggleSidebar}
          style={{
            position: "absolute",
            right: "1rem",
            top: "1rem",
            cursor: "pointer",
          }}
        >
          <MdClose className="text-white"></MdClose>
        </span>
      </div>

      {/* <!-- Sidebar --> */}
      <div className="sidebar">
        {/* <!-- Sidebar user panel (optional) --> */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img src={image} className="img-circle elevation-2" alt="User" />
          </div>
          <div className="info">
            <Link to={`profile/${user._id}`} className="d-block">
              {name}
            </Link>
          </div>
        </div>

        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* <!-- Add icons to the links using the .nav-icon className */}
            {/* with font-awesome or any other icon font library --> */}
            <li className="nav-item has-treeview menu-open">
              <Link to="/dashboard" className="nav-link active">
                <MdDashboard className="nav-icon"></MdDashboard>
                <p>
                  Dashboard
                  <FaAngleLeft className="right"></FaAngleLeft>
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link active">
                    <FaDotCircle className="nav-icon"></FaDotCircle>
                    <p>Active Page</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link">
                    <FaDotCircle className="nav-icon"></FaDotCircle>
                    <p>Inactive Page</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/messages" className="nav-link">
                <FaComments className="nav-icon"></FaComments>
                <p>
                  Messages
                  <span className="right badge badge-danger">New</span>
                </p>
              </Link>
            </li>
          </ul>
        </nav>
        {/* <!-- /.sidebar-menu --> */}
      </div>
      {/* <!-- /.sidebar --> */}
    </aside>
  );
}
