import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Components/Route";

//pages
import Homepage from "./Pages/Homepage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import LockScreen from "./Pages/LockScreen";
import ForgotPassword from "./Pages/ForgotPassword";
import ErrorPage from "./Pages/ErrorPage";
import PrivateRoute from "./Components/PrivateRoute";
import DashboardPage from "./Pages/secured/DashboardPage";

export default function Routes() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Homepage}></Route>
        <Route exact path="/login" component={LoginPage}></Route>
        <Route exact path="/register" component={RegisterPage}></Route>
        <Route exact path="/lockscreen" component={LockScreen}></Route>
        <Route exact path="/forgotPassword" component={ForgotPassword}></Route>
        <PrivateRoute path="/dashboard">
          <DashboardPage></DashboardPage>
        </PrivateRoute>
        <Route exact path="*" component={ErrorPage}></Route>
      </Switch>
    </>
  );
}
