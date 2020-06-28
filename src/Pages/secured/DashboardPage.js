import React from "react";
import { FriendZContext } from "../../context/context";

export default function DashboardPage() {
  const {
    user: { info: user },
    userLogout,
  } = React.useContext(FriendZContext);
  return (
    <div className="col-5 mx-auto mt-5">
      hello <b>{user.firstName}</b>{" "}
      <button className="btn btn-outline-danger" onClick={userLogout}>
        Logout
      </button>
    </div>
  );
}
