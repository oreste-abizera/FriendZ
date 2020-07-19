import React from "react";
import Link from "react-router-dom/Link";
import { FaShare, FaThumbsUp, FaComments } from "react-icons/fa";
import { url, defaultImage } from "../helpers/url";
import { getUser, commentOnPost, getPostComments } from "../helpers/functions";
import { FriendZContext } from "../context/context";
import Comment from "./Comment";

export default function Post({ data = {} }) {
  const [tags, settags] = React.useState([]);
  const [comment, setcomment] = React.useState("");
  const [comments, setcomments] = React.useState([]);
  const [load, setload] = React.useState(true);

  const { user, resolveResponse } = React.useContext(FriendZContext);
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

  async function loadComments() {
    let tempComments = await getPostComments(data._id, user.token);
    setcomments(tempComments);
  }

  React.useEffect(() => {
    populateTags();
  }, [user, data]);

  React.useEffect(() => {
    loadComments();
  }, [load]);

  const handleComment = (e) => {
    setcomment(e.target.value);
  };

  const leaveComment = async (e) => {
    e.preventDefault();
    let response = await commentOnPost(comment, data._id, user.token);
    if (response.data.success) {
      setload(!load);
      resolveResponse(response, "comment added");
    }
  };
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
      <div className="text-center">
        {data.photos.length > 0 &&
          data.photos.map((item, index) => (
            <img
              key={index}
              alt=""
              src={`${url}/uploads/${item}`}
              className="img-fluid"
              style={{ maxHeight: "25rem" }}
            ></img>
          ))}
      </div>

      <p className="mt-4">
        <Link to="#share" className="link-black text-sm mr-2">
          <FaShare></FaShare> Share
        </Link>{" "}
        <Link to="#like" className="link-primary text-sm">
          <FaThumbsUp></FaThumbsUp> Like
        </Link>
        <span className="float-right">
          <Link to="#likes" className="link-black text-sm">
            127 likes -{" "}
          </Link>
          <Link to="#comments" className="link-black text-sm">
            <FaComments className="ml-2"></FaComments> Comments (
            {comments.length})
          </Link>
        </span>
      </p>

      <div className="comments">
        {comments.length > 0 && (
          <Comment data={comments[comments.length - 1]}></Comment>
        )}
      </div>

      {/* leave a comment */}
      <form className="form-container" onSubmit={leaveComment}>
        <input
          className="form-control form-control-sm"
          type="text"
          placeholder="Type a comment"
          name="comment"
          onChange={handleComment}
          value={comment}
        />
      </form>
    </div>
  );
}
