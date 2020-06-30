import React from "react";
import { updateMyPassword } from "../../helpers/functions";
import { FriendZContext } from "../../context/context";

export default function UpdatePassword({ history }) {
  const { resolveResponse, user } = React.useContext(FriendZContext);
  const [password, setpassword] = React.useState("");
  const [newPassword, setnewPassword] = React.useState("");

  const handlepassword = (e) => {
    setpassword(e.target.value);
  };

  const handlenewPassword = (e) => {
    setnewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await updateMyPassword(
      {
        currentPassword: password,
        newPassword,
      },
      user.token
    );
    resolveResponse(response, "Password successifully changed");
    history.push("/dashboard");
  };
  return (
    <form className="form-horizontal" onSubmit={handleSubmit}>
      <div className="m-5">
        <h1>Change Password</h1>
      </div>
      <div className="form-group">
        <label htmlFor="pass" className="col-sm-5 control-label">
          Current Password
        </label>

        <div className="col-sm-10">
          <input
            type="password"
            className="form-control"
            id="pass"
            placeholder="Current Password"
            value={password}
            onChange={handlepassword}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="newpass" className="col-sm-5 control-label">
          New Password
        </label>

        <div className="col-sm-10">
          <input
            type="password"
            className="form-control"
            id="newpass"
            placeholder="New Password"
            value={newPassword}
            onChange={handlenewPassword}
          />
        </div>
      </div>

      <div className="form-group">
        <div className="col-sm-offset-2 col-sm-10">
          <button type="submit" className="btn btn-danger">
            Change password
          </button>
        </div>
      </div>
    </form>
  );
}
