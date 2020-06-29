import React from "react";
import Link from "react-router-dom/Link";
import { FaShare, FaThumbsUp, FaComments } from "react-icons/fa";

export default function Post() {
  return (
    <div className="post p-3">
      <div className="user-block">
        <img
          className="img-circle img-bordered-sm"
          src="../assets/images/profile.jpg"
          alt="user"
        />
        <span className="username">
          <Link to="/">Jonathan Burke Jr.</Link>
          {/* <a href="/" className="float-right btn-tool">
            <FaTimes></FaTimes>
          </a> */}
        </span>
        <span className="description">Shared publicly - 7:30 PM today</span>
      </div>
      {/* <!-- /.user-block --> */}
      <p>
        Lorem ipsum represents a long-held tradition for designers, typographers
        and the like. Some people hate it and argue for its demise, but others
        ignore the hate as they create awesome tools to help create filler text
        for everyone from bacon lovers to Charlie Sheen fans.
      </p>

      <p>
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
