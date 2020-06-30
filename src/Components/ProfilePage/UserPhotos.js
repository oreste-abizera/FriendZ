import React from "react";
import { FriendZContext } from "../../context/context";
import { getUserPosts } from "../../helpers/functions";
import { url } from "../../helpers/url";

export default function UserPhotos({ id }) {
  const [photos, setphotos] = React.useState([]);
  const { user } = React.useContext(FriendZContext);
  async function loadPhotos() {
    let tempPhotos = [];
    let tempPosts = await getUserPosts(id, user.token);
    for (let i = 0; i < tempPosts.length; i++) {
      //eslint-disable-next-line
      tempPosts[i].photos.map((item) => {
        tempPhotos = [...tempPhotos, item];
        return item;
      });
    }
    setphotos(tempPhotos);
  }
  React.useEffect(() => {
    loadPhotos();
  }, [id, user]);
  return (
    <div className="row">
      {photos.length === 0 && <p>No photos yet</p>}
      {photos.map((item, index) => (
        <div key={index} className="my-3 col-12 col-md-6 col-lg-4">
          <img
            src={`${url}/uploads/${item}`}
            alt=""
            className="img-fluid"
            style={{
              maxWidth: "25rem !important",
              maxHeight: "13rem",
              minHeight: "13rem",
            }}
          ></img>
        </div>
      ))}
    </div>
  );
}
