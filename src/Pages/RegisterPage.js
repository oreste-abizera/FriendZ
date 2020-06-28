import React, { useState } from "react";
import Link from "react-router-dom/Link";
import registerUser from "../Auth/RegisterUser";
import { FriendZContext } from "../context/context";

export default function RegisterPage({ history }) {
  const { userLogin } = React.useContext(FriendZContext);
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [gender, setgender] = useState("");

  const handleFname = (e) => {
    setfname(e.target.value);
  };

  const handleLname = (e) => {
    setlname(e.target.value);
  };

  const handleEmail = (e) => {
    setemail(e.target.value);
  };

  const handlePassword = (e) => {
    setpassword(e.target.value);
  };

  const handleGender = (e) => {
    setgender(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await registerUser({
      firstName: fname,
      lastName: lname,
      email,
      password,
      gender,
    });
    const { success, error, token } = response.data;
    if (!success) {
      window.displayError(error || "something went wrong");
    } else {
      let user = { token, info: {} };
      userLogin(user);
      history.push("/login");
    }
  };
  return (
    <section className="register-page">
      <div className="register-box" style={{ margin: "1% auto" }}>
        <div className="register-logo">
          <Link to="/">
            <b>Friend</b>Z
          </Link>
        </div>

        <div className="card">
          <div className="card-body register-card-body">
            <p className="login-box-msg">Register a new membership</p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  value={fname}
                  onChange={handleFname}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                  value={lname}
                  onChange={handleLname}
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmail}
                />
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
              <div className="form-group">
                <select
                  className="form-control"
                  required
                  onChange={handleGender}
                  value={gender}
                >
                  <option value="">Select your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="row">
                <div className="col-7">
                  <div className="checkbox icheck">
                    <label>
                      <input type="checkbox" required /> I agree to the{" "}
                      <a href="/register">terms</a>
                    </label>
                  </div>
                </div>
                <div className="col-5">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block btn-flat"
                  >
                    Register
                  </button>
                </div>
              </div>
            </form>

            <div className="social-auth-links text-center">
              <p>- OR -</p>
              <a href="/register" className="btn btn-block btn-primary">
                <i className="fa fa-facebook mr-2"></i>
                Sign up using Facebook
              </a>
              <a href="/register" className="btn btn-block btn-danger">
                <i className="fa fa-google-plus mr-2"></i>
                Sign up using Google+
              </a>
            </div>

            <Link to="/login" className="text-center">
              I already have a membership
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
