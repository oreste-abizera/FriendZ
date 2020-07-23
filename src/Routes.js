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
import { FriendZContext } from "./context/context";
import ProfilePage from "./Pages/secured/ProfilePage";
import UpdatePicturesPage from "./Pages/secured/UpdatePicturesPage";
import CreatePostsPage from "./Pages/secured/CreatePostsPage";
import Chat from "./Components/Chat";

export default function Routes() {
  const { user } = React.useContext(FriendZContext);
  return (
    <>
      {user.token && <Chat></Chat>}
      <Switch>
        <Route exact path="/" component={Homepage}></Route>
        <Route exact path="/login" component={LoginPage}></Route>
        <Route exact path="/register" component={RegisterPage}></Route>
        <Route exact path="/lockscreen" component={LockScreen}></Route>
        <Route exact path="/forgotPassword" component={ForgotPassword}></Route>

        <PrivateRoute exact path="/dashboard">
          <DashboardPage></DashboardPage>
        </PrivateRoute>

        <PrivateRoute
          exact
          path="/profile/:id"
          component={ProfilePage}
        ></PrivateRoute>

        <PrivateRoute
          exact
          path="/updatePictures"
          component={UpdatePicturesPage}
        ></PrivateRoute>

        <PrivateRoute
          exact
          path="/createPost"
          component={CreatePostsPage}
        ></PrivateRoute>

        {user.token ? (
          <PrivateRoute exact path="*" component={ErrorPage}></PrivateRoute>
        ) : (
          <Route exact path="*" component={ErrorPage}></Route>
        )}
      </Switch>
    </>
  );
}
