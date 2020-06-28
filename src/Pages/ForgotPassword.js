import React from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setemail] = React.useState("");
  const handleEmail = (e) => {
    setemail(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("forgot password of email: " + email);
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
            <p className="login-box-msg">
              Use this form to reset your password using the registered email
              address.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group col">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmail}
                  required
                ></input>
              </div>
              <div className="col-8">
                <button
                  type="submit"
                  className="btn btn-primary btn-block btn-flat"
                >
                  Reset password
                </button>
              </div>
              <p className="col mt-3">
                <Link to="/login" className="text-center">
                  Return to login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
