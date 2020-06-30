import React from "react";
import { createPost } from "../../helpers/functions";
import { FriendZContext } from "../../context/context";

export default function CreatePost({ history }) {
  const { user, resolveResponse } = React.useContext(FriendZContext);
  const [text, settext] = React.useState("");
  const [photo, setphoto] = React.useState(null);
  const handletext = (e) => {
    settext(e.target.value);
  };
  const handlephoto = (e) => {
    setphoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("text", text);
    data.append("file", photo);
    let response = await createPost(data, user.token);
    resolveResponse(response, "Post created");
    history.push("/dashboard");
  };
  return (
    <div className="card pb-3 col-12 col-md-10 col-lg-8 mx-auto">
      <div className="card-header">
        <h1 className="card-title text-center">Create Post</h1>
      </div>
      <form className="card-body" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description">Post Description</label>
          <textarea
            className="form-control"
            rows="3"
            id="description"
            value={text}
            onChange={handletext}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="photo">Add Photo (optional)</label>
          <input
            type="file"
            className="form-control"
            onChange={handlephoto}
          ></input>
        </div>

        <div className="form-group">
          <input
            className="form-control btn btn-primary"
            type="submit"
            value="post"
          ></input>
        </div>
      </form>
    </div>
  );
}
