import React from "react";
import Link from "react-router-dom/Link";
import { FaShare, FaThumbsUp, FaComments } from "react-icons/fa";
import { url, defaultImage } from "../helpers/url";

export default function Post({ data = {} }) {
  let image = data.user.image
    ? `${url}/uploads/${data.user.image}`
    : defaultImage;
  let name = `${data.user.firstName} ${data.user.lastName}`;
  // let date = data.createdAt;
  // console.log(
  //   date.getUTCDate() +
  //     "/" +
  //     date.getUTCMonth() +
  //     "/" +
  //     date.getUTCFullYear() +
  //     "  " +
  //     date.getUTCHours() +
  //     ":" +
  //     date.getUTCMinutes()
  // );
  let createdAt = data.createdAt;
  let date = createdAt.split("T")[0];
  let rest = createdAt.split("T")[1];
  let time = `${rest.split(":")[0]}:${rest.split(":")[1]}`;

  let finalTime = `${date} ${time}`;
  return (
    <div className="post p-3">
      <div className="user-block">
        <img className="img-circle img-bordered-sm" src={image} alt="user" />
        <span className="username">
          <Link to={`/profile/${data.user._id}`}>{name}</Link>{" "}
          <span>{data.message}</span>
          {/* <a href="/" className="float-right btn-tool">
            <FaTimes></FaTimes>
          </a> */}
        </span>
        <span className="description">Shared publicly - {finalTime}</span>
      </div>
      {/* <!-- /.user-block --> */}
      <p>{data.text}</p>
      {data.photos.length > 0 &&
        data.photos.map((item, index) => (
          <img
            key={index}
            alt=""
            src={`${url}/uploads/${item}`}
            className="img-fluid"
          ></img>
        ))}

      <p className="mt-4">
        <a href="/" className="link-black text-sm mr-2">
          <FaShare></FaShare> Share
        </a>{" "}
        <a href="/" className="link-black text-sm">
          <FaThumbsUp></FaThumbsUp> Like
        </a>
        <span className="float-right">
          <a href="/" className="link-black text-sm">
            <FaComments></FaComments> Comments (5)
          </a>
        </span>
      </p>

      <input
        className="form-control form-control-sm"
        type="text"
        placeholder="Type a comment"
      />
    </div>
  );
}
