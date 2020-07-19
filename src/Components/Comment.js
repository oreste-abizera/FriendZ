import React from "react";
import { url } from "../helpers/url";

export default function Comment({ data = {} }) {
  return (
    <div className="media my-2">
      <img
        src={`${url}/uploads/${data.user.image}`}
        alt="User"
        className="img-size-50 mr-3 img-circle"
      />
      <div className="media-body">
        <h3 className="dropdown-item-title">
          {data.user.firstName + " " + data.user.lastName}
        </h3>
        <p className="text-sm">{data.message}</p>
      </div>
    </div>
  );
}
