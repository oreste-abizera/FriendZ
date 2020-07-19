import React from "react";
import Link from "react-router-dom/Link";
import { FaLock } from "react-icons/fa";
import { FriendZContext } from "../context/context";
import { getUser } from "../helpers/functions";
import { url, defaultImage } from "../helpers/url";
import loginUser from "../Auth/loginUser";

export default function LockScreen({ history }) {
  const [password, setpassword] = React.useState("");
  const [stateUser, setstateUser] = React.useState({
    firstName: "",
    lastName: "",
  });
  const { user, userLogin } = React.useContext(FriendZContext);
  if (user.token) {
    history.push("/dashboard");
  }
  if (!localStorage.getItem("user")) {
    history.push("/login");
  }

  let id = localStorage.getItem("user");
  if (id === "undefined" || id === "null") {
    history.push("/login");
  }

  const getLockedUser = async () => {
    let lockedUser = await getUser(
      JSON.parse(localStorage.getItem("user")),
      user.token
    );
    if (!lockedUser._id) {
      history.push("/login");
    }
    setstateUser(lockedUser);
  };

  //call getLockedUser
  getLockedUser();

  let name = `${stateUser.firstName} ${stateUser.lastName}`;
  let image = stateUser.image
    ? `${url}/uploads/${stateUser.image}`
    : defaultImage;
  const handlePassword = (e) => {
    setpassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await loginUser(stateUser.email, password);
    const { success, error, token } = response.data;
    if (!success) {
      window.displayError(error || "something went wrong");
    } else {
      let user = { token, info: {} };
      userLogin(user);
    }
  };
  return (
    <section className="lockscreen">
      <div className="lockscreen-wrapper" style={{ margin: "4% auto" }}>
        <div className="lockscreen-logo">
          <Link to="/">
            <b>Friend</b>Z
          </Link>
        </div>
        <div className="lockscreen-name">{name}</div>
        <div className="lockscreen-item">
          <div className="lockscreen-image">
            <img src={image} alt={name} />
          </div>
          <form className="lockscreen-credentials" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="password"
                className="form-control"
                placeholder="password"
                value={password}
                onChange={handlePassword}
              />

              <div className="input-group-append">
                <button type="button" className="btn">
                  <FaLock className="text-muted"></FaLock>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="help-block text-center">
          Enter your password to retrieve your session
        </div>
        <div className="text-center">
          <Link to="/login">Or sign in as a different user</Link>
        </div>
        <div className="lockscreen-footer text-center">
          Copyright &copy; {new Date().getFullYear()}{" "}
          <b>
            <a href="http://oresteabizera.netlify.app" className="text-black">
              Coderspace
            </a>
          </b>
          <br />
          All rights reserved
        </div>
      </div>
    </section>
  );
}
