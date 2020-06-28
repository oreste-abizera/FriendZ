import React from "react";
import {
  FaComments,
  FaBell,
  // FaThLarge,
  FaEnvelope,
  FaUsers,
  FaFile,
  FaClock,
  FaStar,
  FaUser,
  FaUserEdit,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import Link from "react-router-dom/Link";
import { FriendZContext } from "../../context/context";

export default function RightLinks() {
  const {
    // toggleControlSidebar,
    dropdown,
    handleDropdown,
    userLogout,
  } = React.useContext(FriendZContext);

  return (
    <ul className="navbar-nav ml-auto">
      {/* <!-- Messages Dropdown Menu --> */}
      <li
        className={
          dropdown === "messages"
            ? "nav-item dropdown show"
            : "nav-item dropdown"
        }
      >
        <Link
          className="nav-link"
          onClick={() => {
            handleDropdown("messages");
          }}
          data-toggle="dropdown"
          to="#"
        >
          <FaComments></FaComments>
          <span className="badge badge-danger navbar-badge">3</span>
        </Link>
        <div
          className={
            dropdown === "messages"
              ? "dropdown-menu dropdown-menu-lg dropdown-menu-right show"
              : "dropdown-menu dropdown-menu-lg dropdown-menu-right"
          }
        >
          <a href="/messages" className="dropdown-item">
            {/* <!-- Message Start --> */}
            <div className="media">
              <img
                src="./assets/images/profile.jpg"
                alt="User Avatar"
                className="img-size-50 mr-3 img-circle"
              />
              <div className="media-body">
                <h3 className="dropdown-item-title">
                  Brad Diesel
                  <span className="float-right text-sm text-danger">
                    <FaStar></FaStar>
                  </span>
                </h3>
                <p className="text-sm">Call me whenever you can...</p>
                <p className="text-sm text-muted">
                  <FaClock className="mr-1"></FaClock> 4 Hours Ago
                </p>
              </div>
            </div>
            {/* <!-- Message End --> */}
          </a>
          <div className="dropdown-divider"></div>
          <a href="/messages" className="dropdown-item dropdown-footer">
            See All Messages
          </a>
        </div>
      </li>
      {/* <!-- Notifications Dropdown Menu --> */}
      <li
        className={
          dropdown === "notifications"
            ? "nav-item dropdown show"
            : "nav-item dropdown"
        }
      >
        <Link
          className="nav-link"
          data-toggle="dropdown"
          to="#"
          onClick={() => handleDropdown("notifications")}
        >
          <FaBell></FaBell>
          <span className="badge badge-warning navbar-badge">15</span>
        </Link>
        <div
          className={
            dropdown === "notifications"
              ? "dropdown-menu dropdown-menu-lg dropdown-menu-right show"
              : "dropdown-menu dropdown-menu-lg dropdown-menu-right"
          }
        >
          <span className="dropdown-header">15 Notifications</span>
          <div className="dropdown-divider"></div>
          <a href="/messages" className="dropdown-item">
            <FaEnvelope className="mr-2"></FaEnvelope> 4 new messages
            <span className="float-right text-muted text-sm">3 mins</span>
          </a>
          <div className="dropdown-divider"></div>
          <a href="/messages" className="dropdown-item">
            <FaUsers className="mr-2"></FaUsers> 8 friend requests
            <span className="float-right text-muted text-sm">12 hours</span>
          </a>
          <div className="dropdown-divider"></div>
          <a href="/messages" className="dropdown-item">
            <FaFile className="mr-2"></FaFile> 3 new reports
            <span className="float-right text-muted text-sm">2 days</span>
          </a>
          <div className="dropdown-divider"></div>
          <a href="/notifications" className="dropdown-item dropdown-footer">
            See All Notifications
          </a>
        </div>
      </li>

      {/* <!-- profile dropdown --> */}
      <li
        className={
          dropdown === "profile"
            ? "nav-item dropdown show"
            : "nav-item dropdown"
        }
      >
        <Link
          className="nav-link"
          data-toggle="dropdown"
          to="#"
          onClick={() => handleDropdown("profile")}
        >
          <FaUser></FaUser>
        </Link>
        <div
          className={
            dropdown === "profile"
              ? "dropdown-menu dropdown-menu-lg dropdown-menu-right show"
              : "dropdown-menu dropdown-menu-lg dropdown-menu-right"
          }
        >
          <Link to="/profile" className="nav-link">
            <FaUserEdit className="mr-2"></FaUserEdit> Profile
          </Link>
          <div className="dropdown-divider"></div>
          <Link to="/settings" className="nav-link">
            <FaCog className="mr-2"></FaCog> Settings
          </Link>
          <div className="dropdown-divider"></div>
          <Link to="#" onClick={userLogout} className="nav-link">
            <FaSignOutAlt className="mr-2"></FaSignOutAlt> Logout
          </Link>
        </div>
      </li>

      {/* <li className="nav-item">
        <Link
          className="nav-link"
          data-widget="control-sidebar"
          data-slide="true"
          to="#"
          onClick={toggleControlSidebar}
        >
          <FaThLarge></FaThLarge>
        </Link>
      </li> */}
    </ul>
  );
}
