import React from "react";
import Link from "react-router-dom/Link";
import { FaShare, FaThumbsUp, FaComments } from "react-icons/fa";
import { url, defaultImage } from "../helpers/url";
import {
  getUser,
  commentOnPost,
  getPostComments,
  likePost,
  getPost,
} from "../helpers/functions";
import { FriendZContext } from "../context/context";
import Comment from "./Comment";

export default function Post({ data = {} }) {
  const { user, resolveResponse, formatTime, formatText } = React.useContext(
    FriendZContext
  );
  const [post, setpost] = React.useState(data);
  const [tags, settags] = React.useState([]);
  const [comment, setcomment] = React.useState("");
  const [comments, setcomments] = React.useState([]);
  const [load, setload] = React.useState(true);
  const [liked, setliked] = React.useState(false);

  let image = post.user.image
    ? `${url}/uploads/${post.user.image}`
    : defaultImage;
  let name = `${post.user.firstName} ${post.user.lastName}`;
  let createdAt = post.createdAt;

  async function populateTags() {
    let temptags = [];
    for (let i = 0; i < post.tags.length; i++) {
      const activeTag = post.tags[i];
      let formatedTag = await getUser(activeTag, user.token);
      temptags[i] = formatedTag;
    }
    settags(temptags);
  }

  async function loadComments() {
    let tempComments = await getPostComments(post._id, user.token);
    setcomments(tempComments);
  }

  React.useEffect(() => {
    populateTags();
    setliked(post.likes.includes(user.info._id));
    loadComments();
  }, [user, post, load]);

  const handleComment = (e) => {
    setcomment(e.target.value);
  };

  const leaveComment = async (e) => {
    e.preventDefault();
    let response = await commentOnPost(comment, post._id, user.token);
    if (response.data.success) {
      setcomment("");
      setload(!load);
      resolveResponse(response, "comment added");
    }
  };

  const handlelike = async () => {
    let response = await likePost(post._id, user.token);
    if (response.data.success) {
      setpost(await getPost(data._id, user.token));
    }
  };

  let text = formatText(post.text);

  return (
    <div className="post p-3 card card-widget">
      <div className="user-block card-header">
        <img className="img-circle img-bordered-sm" src={image} alt="user" />
        <span className="username">
          <Link to={`/profile/${post.user._id}`}>{name}</Link>{" "}
          <span>
            {post.message}{" "}
            {tags.length > 0 && (
              <span>
                {post.message ? " with " : " is with "}
                <Link to={`/profile/${tags[0]._id}`}>
                  <b>{tags[0].firstName + " " + tags[0].lastName}</b>
                </Link>
                {tags.length > 1 && (
                  <span>{" and " + (tags.length - 1) + " others"}</span>
                )}
              </span>
            )}
          </span>
        </span>
        <span className="description">
          Shared publicly - {formatTime(createdAt)}
        </span>
      </div>
      {/* <!-- /.user-block --> */}
      <p>{text}</p>
      <div className="text-center">
        {post.photos.length > 0 &&
          post.photos.map((item, index) => (
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
        <Link
          to="#like"
          className={liked ? "link-primary text-sm" : "link-black text-sm"}
          onClick={handlelike}
        >
          <FaThumbsUp></FaThumbsUp> Like
        </Link>
        <span className="float-right">
          <Link to="#likes" className="link-black text-sm">
            {post.likes.length} likes -{" "}
          </Link>
          <Link to="#comments" className="link-black text-sm">
            <FaComments className="ml-2"></FaComments> Comments (
            {comments.length})
          </Link>
        </span>
      </p>

      <div className="card-footer card-comments">
        {comments.length > 0 && (
          <Comment data={comments[comments.length - 1]}></Comment>
        )}
      </div>

      {/* leave a comment */}
      <form className="form-container" onSubmit={leaveComment}>
        <img
          className="img-fluid img-circle img-sm"
          src={`${url}/uploads/${user.info.image}`}
          alt=""
        ></img>
        <div className="img-push">
          <input
            className="form-control form-control-sm"
            type="text"
            placeholder="Type a comment"
            name="comment"
            onChange={handleComment}
            value={comment}
          />
        </div>
      </form>
    </div>
  );
}
