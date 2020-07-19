import React from "react";
import { url } from "../helpers/url";
import { FriendZContext } from "../context/context";

export default function Comment({ data = {} }) {
  const { formatTime } = React.useContext(FriendZContext);
  return (
    <div className="card-comment">
      <img
        className="img-circle img-sm"
        src={`${url}/uploads/${data.user.image}`}
        alt="User"
      />

      <div className="comment-text">
        <span className="username">
          {data.user.firstName + " " + data.user.lastName}
          <span className="text-muted float-right">
            {formatTime(data.createdAt)}
          </span>
        </span>
        {data.message}
      </div>
    </div>
  );
}
