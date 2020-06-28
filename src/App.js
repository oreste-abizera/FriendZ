import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./assets/css/material-dashboard.css";
import "admin-lte/dist/css/adminlte.min.css";
import Homepage from "./Pages/Homepage";
import { Switch } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import LockScreen from "./Pages/LockScreen";
import ForgotPassword from "./Pages/ForgotPassword";
import ErrorPage from "./Pages/ErrorPage";
import Route from "./Components/Route";

class App extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route exact path="/" component={Homepage}></Route>
          <Route exact path="/login" component={LoginPage}></Route>
          <Route exact path="/register" component={RegisterPage}></Route>
          <Route exact path="/lockscreen" component={LockScreen}></Route>
          <Route
            exact
            path="/forgotPassword"
            component={ForgotPassword}
          ></Route>
          <Route exact path="*" component={ErrorPage}></Route>
        </Switch>
      </>
    );
  }
}

export default App;
