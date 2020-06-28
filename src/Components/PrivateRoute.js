import React from "react";
import { Route } from "react-router-dom";
import { FriendZContext } from "../context/context";
import LockScreen from "../Pages/LockScreen";
import Navbar from "./Navbar";
import Redirect from "react-router-dom/Redirect";
export default function PrivateRoute({ children, component, rest }) {
  const { user } = React.useContext(FriendZContext);
  return (
    <>
      {!user.token && <Navbar></Navbar>}
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
    </>
  );
}
