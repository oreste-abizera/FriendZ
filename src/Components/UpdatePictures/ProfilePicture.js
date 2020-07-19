import React from "react";
import { defaultImage, url, defaultBg } from "../../helpers/url";
import { FriendZContext } from "../../context/context";
import {
  updateMyProfilePicture,
  updateMyCoverPicture,
} from "../../helpers/functions";

export default function ProfilePicture({ history, cover = false }) {
  const [image, setimage] = React.useState(null);
  const { user, resolveResponse } = React.useContext(FriendZContext);

  const handleChange = (e) => {
    setimage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("file", image);
    data.append("createdAt", new Date(Date.now()).toISOString());
    let response;
    if (cover) {
      response = await updateMyCoverPicture(data, user.token);
    } else {
      response = await updateMyProfilePicture(data, user.token);
    }
    resolveResponse(
      response,
      cover ? "Cover photo updated" : "Profile picture updated"
    );
    if (response.data.success) {
      history.push(`/profile/${user.info._id}`);
    }
  };
  return (
    <>
      {" "}
      <h3>{cover ? "Background Image" : "Profile Picture"}</h3>
      <hr></hr>
      <img
        src={
          !cover
            ? user.info.image
              ? `${url}/uploads/${user.info.image}`
              : defaultImage
            : user.info.cover
            ? `${url}/uploads/${user.info.cover}`
            : defaultBg
        }
        className={cover ? "img-fluid" : "img-fluid img-circle"}
        style={{ maxHeight: "20rem", minHeight: "20rem" }}
        alt={cover ? "Cover image" : "Avatar"}
      ></img>
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-4">
          <label htmlFor={`profileFile${cover}`}>
            {cover ? "Change Background Image" : "Change Profile picture"}
          </label>
          <div className="input-group">
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id={`profileFile${cover}`}
                required
                accept="image/*"
                onChange={handleChange}
              />
              <label
                className="custom-file-label"
                htmlFor={`profileFile${cover}`}
              >
                Choose file
              </label>
            </div>
            <div className="input-group-append">
              <button type="submit" className="btn-primary btn">
                Upload
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
