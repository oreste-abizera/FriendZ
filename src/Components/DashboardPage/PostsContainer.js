import React from "react";
import Link from "react-router-dom/Link";
import { getPosts } from "../../helpers/functions";
import { FriendZContext } from "../../context/context";
import Post from "../Post";

export default function PostsContainer() {
  const { user } = React.useContext(FriendZContext);
  const [posts, setposts] = React.useState([]);

  const loadPosts = async () => {
    let tempPosts = await getPosts(user.token);
    setposts(tempPosts || []);
  };
  React.useEffect(() => {
    loadPosts();
    return () => {};
  }, []);
  return (
    <div className="mb-4">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">
            Express your feelings to the whole world
          </h1>
        </div>
        <div className="card-body">
          <Link to="/createPost" className="btn btn-primary">
            Create post
          </Link>
        </div>
      </div>
      {/* display posts */}
      <div className="card" style={{ height: "72vh", overflow: "auto" }}>
        {posts.map((item) => (
          <Post key={item._id} data={item}></Post>
        ))}
      </div>
    </div>
  );
}
