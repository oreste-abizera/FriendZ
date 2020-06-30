import React from "react";
import { createPost } from "../../helpers/functions";
import { FriendZContext } from "../../context/context";
import { FaTimes } from "react-icons/fa";
import { url, defaultImage } from "../../helpers/url";

export default function CreatePost({ history }) {
  const { user, resolveResponse, users } = React.useContext(FriendZContext);
  const [text, settext] = React.useState("");
  const [photo, setphoto] = React.useState(null);
  const [tags, settags] = React.useState([]);
  const [filteredUsers, setfilteredUsers] = React.useState([]);
  const [addTag, setaddTag] = React.useState(false);
  const [input, setinput] = React.useState("");

  const handletext = (e) => {
    settext(e.target.value);
  };
  const handlephoto = (e) => {
    setphoto(e.target.files[0]);
  };
  const handletags = (value) => {
    settags([...tags, value]);
    setaddTag(false);
    setinput("");
  };

  const toggleaddTag = (value) => {
    setaddTag(value);
  };

  const removeTag = (item) => {
    let tempTags = tags.filter((record) => record._id !== item._id);
    settags(tempTags);
  };

  const handleInput = (e) => {
    setinput(e.target.value);
  };

  React.useEffect(() => {
    let tempFilteredUsers = users.filter((item) => {
      let slice1 = `${item.firstName} ${item.lastName}`.slice(0, input.length);
      let slice2 = `${item.lastName} ${item.firstName}`.slice(0, input.length);
      return (
        (slice1.toLowerCase() === input.toLowerCase() &&
          item._id !== user.info._id) ||
        (slice2.toLowerCase() === input.toLowerCase() &&
          item._id !== user.info._id)
      );
    });
    if (!input) {
      setfilteredUsers([]);
    } else {
      setfilteredUsers(tempFilteredUsers);
    }
  }, [input]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let tempTags = [];
    for (let i = 0; i < tags.length; i++) {
      const element = tags[i]._id;
      tempTags.push(element);
    }
    tempTags = [...tempTags];
    const data = new FormData();
    data.append("text", text);
    data.append("file", photo);
    data.append("tags", tempTags);
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
          <label>Tags</label>{" "}
          <div
            className={
              addTag
                ? "d-inline-block dropdown show float-right"
                : "d-inline-block dropdown float-right"
            }
          >
            <button
              className="btn btn-primary ml-5 mb-3"
              type="button"
              onClick={() => toggleaddTag(!addTag)}
            >
              Add tag
            </button>
            <div
              className={
                addTag
                  ? "dropdown-menu dropdown-menu-lg dropdown-menu-right show"
                  : "dropdown-menu dropdown-menu-lg dropdown-menu-right"
              }
            >
              <div className="form-group p-3">
                <label>Enter the name</label>
                <input
                  type="text"
                  className="form-control"
                  value={input}
                  onChange={handleInput}
                ></input>
                <label>Suggestions: </label>
                <p>
                  {filteredUsers.length === 0 &&
                    input.length > 0 &&
                    "No suggestions found"}
                </p>
                <p>
                  {filteredUsers.length === 0 &&
                    input.length === 0 &&
                    "Start typing to see suggestions"}
                </p>
                {filteredUsers.map((item) => (
                  <div
                    key={item._id}
                    className="d-flex my-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => handletags(item)}
                  >
                    <img
                      src={
                        item.image
                          ? `${url}/uploads/${item.image}`
                          : defaultImage
                      }
                      className="img-fluid img-circle"
                      style={{ maxHeight: "3rem" }}
                      alt=""
                    ></img>
                    <p className="ml-2 mt-2">
                      {item.firstName + " " + item.lastName}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <br></br>
          {tags.map((item) => (
            <div key={item._id} className="badge badge-danger mx-1">
              {item.firstName + " " + item.lastName}
              <FaTimes
                className="mx-1"
                style={{ cursor: "pointer" }}
                onClick={() => removeTag(item)}
              ></FaTimes>
            </div>
          ))}
        </div>
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
