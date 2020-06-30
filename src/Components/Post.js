import React from "react";
import Link from "react-router-dom/Link";
import { FaShare, FaThumbsUp, FaComments } from "react-icons/fa";
import { url, defaultImage } from "../helpers/url";
import { getUser } from "../helpers/functions";
import { FriendZContext } from "../context/context";

export default function Post({ data = {} }) {
  const [tags, settags] = React.useState([]);
  const { user } = React.useContext(FriendZContext);
  let image = data.user.image
    ? `${url}/uploads/${data.user.image}`
    : defaultImage;
  let name = `${data.user.firstName} ${data.user.lastName}`;
  let createdAt = data.createdAt;
  let date = createdAt.split("T")[0];
  let rest = createdAt.split("T")[1];
  let time = `${rest.split(":")[0]}:${rest.split(":")[1]}`;
  let finalTime = `${date} ${time}`;

  async function populateTags() {
    let temptags = [];
    for (let i = 0; i < data.tags.length; i++) {
      const activeTag = data.tags[i];
      let formatedTag = await getUser(activeTag, user.token);
      temptags[i] = formatedTag;
    }
    settags(temptags);
  }

  React.useEffect(() => {
    populateTags();
  }, [user, data]);
  return (
    <div className="post p-3">
      <div className="user-block">
        <img className="img-circle img-bordered-sm" src={image} alt="user" />
        <span className="username">
          <Link to={`/profile/${data.user._id}`}>{name}</Link>{" "}
          <span>
            {data.message}{" "}
            {tags.length > 0 && (
              <span>
                {data.message ? " with " : " is with "}
                <Link to={`profile/${tags[0]._id}`}>
                  <b>{tags[0].firstName + " " + tags[0].lastName}</b>
                </Link>
                {tags.length > 1 && (
                  <span>{" and " + (tags.length - 1) + " others"}</span>
                )}
              </span>
            )}
          </span>
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
