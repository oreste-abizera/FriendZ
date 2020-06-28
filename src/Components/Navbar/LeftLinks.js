import React from "react";
import Link from "react-router-dom/Link";
import { FaBars } from "react-icons/fa";
import { FriendZContext } from "../../context/context";

export default function LeftLinks() {
  const { toggleSidebar } = React.useContext(FriendZContext);
  return (
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link
          className="nav-link"
          data-widget="pushmenu"
          to="#"
          onClick={toggleSidebar}
        >
          <FaBars></FaBars>
        </Link>
      </li>
      <li className="nav-item d-none d-sm-inline-block">
        <Link to="/dashboard" className="nav-link">
          Home
        </Link>
      </li>
      <li className="nav-item d-none d-sm-inline-block">
        <Link to="/contact" className="nav-link">
          Contact
        </Link>
      </li>
    </ul>
  );
}
