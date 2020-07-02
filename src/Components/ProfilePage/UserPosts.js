import React from "react";
import { FriendZContext } from "../../context/context";
import { getUserPosts } from "../../helpers/functions";
import Post from "../Post";

export default function UserPosts({ id }) {
  const [posts, setposts] = React.useState([]);
  const { user } = React.useContext(FriendZContext);
  async function loadPosts() {
    let tempPosts = await getUserPosts(id, user.token);
    setposts(tempPosts || []);
  }
  React.useEffect(() => {
    loadPosts();
  }, [id, user]);
  return (
    <div style={{ height: "80vh", overflow: "auto" }}>
      {posts.length === 0 && <p>No posts yet</p>}
      {posts.map((item) => (
        <Post key={item._id} data={item}></Post>
      ))}
    </div>
  );
}
