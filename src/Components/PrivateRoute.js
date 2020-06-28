import React from "react";
import { Route } from "react-router-dom";
import { FriendZContext } from "../context/context";
import LockScreen from "../Pages/LockScreen";
import Navbar from "./Navbar";
import Redirect from "react-router-dom/Redirect";
import SecuredNavbar from "./Secured/SecuredNavbar";
import Sidebar from "./Secured/Sidebar";
import ControlSidebar from "./Secured/ControlSidebar";
export default function PrivateRoute({ children, component, rest }) {
  const { user, handleDropdown, sidebarOpen } = React.useContext(
    FriendZContext
  );
  return (
    <>
      {!user.token && <Navbar></Navbar>}
      <div
        className={
          sidebarOpen
            ? "sidebar-mini sidebar-open"
            : "sidebar-mini sidebar-collapse"
        }
      >
        {user.token && <SecuredNavbar></SecuredNavbar>}
        <div
          onClick={() => {
            user.token && handleDropdown("");
          }}
        >
          {user.token && <Sidebar></Sidebar>}
          {component ? (
            <Route
              {...rest}
              component={user.token ? component : LockScreen}
            ></Route>
          ) : (
            <Route
              {...rest}
              render={() => {
                return user.token ? (
                  children
                ) : (
                  <Redirect to="/lockscreen"></Redirect>
                );
              }}
            ></Route>
          )}
          {user.token && <ControlSidebar></ControlSidebar>}
        </div>
      </div>
    </>
  );
}
