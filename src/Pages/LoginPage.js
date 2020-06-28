import React from "react";
import Link from "react-router-dom/Link";
import loginUser from "../Auth/loginUser";
import { FriendZContext } from "../context/context";

export default function LoginPage({ history }) {
  const { userLogin, user } = React.useContext(FriendZContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  if (user.token) {
    history.push("/dashboard");
  }
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await loginUser(email, password);
    const { success, error, token } = response.data;
    if (!success) {
      window.displayError(error || "something went wrong");
    } else {
      let user = { token, info: {} };
      userLogin(user);
    }
  };
  return (
    <section className="login-page">
      <div className="login-box" style={{ margin: "1% auto" }}>
        <div className="login-logo">
          <Link to="/">
            <b>Friend</b>Z
          </Link>
        </div>
        {/* <!-- /.login-logo --> */}
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in to start your session</p>

            <form method="post" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmail}
                ></input>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={handlePassword}
                />
              </div>
              <div className="row">
                <div className="col-7">
                  <div className="checkbox icheck">
                    <label>
                      <input type="checkbox" /> Remember Me
                    </label>
                  </div>
                </div>
                {/* <!-- /.col --> */}
                <div className="col-5">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block btn-flat"
                  >
                    Sign In
                  </button>
                </div>
                {/* <!-- /.col --> */}
              </div>
            </form>

            <div className="social-auth-links text-center mb-3">
              <p>- OR -</p>
              <a href="/login" className="btn btn-block btn-primary">
                <i className="fa fa-facebook mr-2"></i> Sign in using Facebook
              </a>
              <a href="/login" className="btn btn-block btn-danger">
                <i className="fa fa-google-plus mr-2"></i> Sign in using Google+
              </a>
            </div>
            {/* <!-- /.social-auth-links --> */}

            <p className="mb-1">
              <Link to="/forgotPassword">I forgot my password</Link>
            </p>
            <p className="mb-0">
              <Link to="register" className="text-center">
                Register a new membership
              </Link>
            </p>
          </div>
          {/* <!-- /.login-card-body --> */}
        </div>
      </div>
    </section>
  );
}
