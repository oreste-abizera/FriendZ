import React from "react";
import { url, defaultImage, defaultBg } from "../../helpers/url";
import Link from "react-router-dom/Link";
import {
  FaBook,
  FaMapMarker,
  FaPencilAlt,
  FaEnvelopeOpenText,
} from "react-icons/fa";
import { FriendZContext } from "../../context/context";
import { getUserPosts } from "../../helpers/functions";

export default function ProfileInfo({
  user = { firstName: "", lastName: "" },
}) {
  const {
    user: { info },
    user: me,
    openChat,
  } = React.useContext(FriendZContext);
  const [posts, setposts] = React.useState([]);

  let image = user.image ? `${url}/uploads/${user.image}` : defaultImage;
  let name =
    user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : "loading ...";

  async function loadPosts() {
    let tempPosts = await getUserPosts(user._id, me.token);
    tempPosts = tempPosts.filter((item) => item.user._id === user._id);
    setposts(tempPosts || []);
  }

  React.useEffect(() => {
    if (user._id) {
      loadPosts();
    }
  }, [me, user]);
  return (
    <>
      {/* card */}
      <div className="card card-widget widget-user card-primary card-outline">
        <div
          className={
            user._id === info._id
              ? "widget-user-header text-white background-pic-container"
              : "widget-user-header text-white"
          }
          style={{
            background: `url(${
              user.cover ? `${url}/uploads/${user.cover}` : defaultBg
            }) center`,
            height: "15rem",
            opacity: 0.8,
          }}
        >
          {/* <h3 className="widget-user-username">{name}</h3> */}
          {user._id === info._id && (
            <Link
              to="/updatePictures"
              className="btn btn-primary btn-sm update-background-btn"
            >
              Update Background
            </Link>
          )}
        </div>
        <div className="widget-user-image" style={{ top: "27%" }}>
          <div
            style={{ position: "relative" }}
            className={user._id === info._id ? "profile-pic-container" : ""}
          >
            <img
              className="profile-user-img img-fluid img-circle"
              src={image}
              alt="User Avatar"
            />
            {user._id === info._id && (
              <Link
                to="/updatePictures"
                className="btn btn-block btn-primary btn-sm update-prof-btn"
                style={{ position: "absolute", top: "45%" }}
              >
                Update
              </Link>
            )}
          </div>
        </div>

        <div className="card-body mt-3">
          <h3 className="text-center widget-user-username">{name}</h3>
          {user._id !== info._id && (
            <div className="text-center">
              <button
                onClick={() => openChat(user._id)}
                className="btn btn-sm my-1 btn-primary"
              >
                Message
              </button>
            </div>
          )}
          <ul className="list-group list-group-unbordered mb-3">
            <li className="list-group-item">
              <b>Followers</b> <span className="float-right">1,322</span>
            </li>
            <li className="list-group-item">
              <b>Following</b> <span className="float-right">543</span>
            </li>
            <li className="list-group-item">
              <b>Posts</b> <span className="float-right">{posts.length}</span>
            </li>
          </ul>

          <Link to="#" className="btn btn-primary btn-block">
            <b>Follow</b>
          </Link>
        </div>
      </div>
      {/* end of card */}

      {/* <!-- About Me Box --> */}
      <div className="card card-primary">
        <div className="card-header">
          <h3 className="card-title">About Me</h3>
        </div>
        {/* <!-- /.card-header --> */}
        <div className="card-body">
          <strong>
            <FaBook className="mr-1"></FaBook> Education
          </strong>

          <p className="text-muted">{user.education}</p>

          <hr />

          <strong>
            <FaMapMarker className="mr-1"></FaMapMarker> Location
          </strong>

          <p className="text-muted">{user.location}</p>

          <hr />

          <strong>
            <FaPencilAlt className="mr-1"></FaPencilAlt> Skills
          </strong>

          <p className="text-muted">{user.skills}</p>

          <hr />

          <strong>
            <FaEnvelopeOpenText className="mr-1"></FaEnvelopeOpenText> Notes
          </strong>

          <p className="text-muted">{user.notes}</p>
        </div>
        {/* <!-- /.card-body --> */}
      </div>
      {/* <!-- /.about me box --> */}
    </>
  );
}
