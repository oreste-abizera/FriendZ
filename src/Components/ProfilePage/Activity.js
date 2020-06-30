import React from "react";
// import Post from "../Post";
import UpdateProfile from "./UpdateProfile";
import Link from "react-router-dom/Link";
import UpdatePassword from "./UpdatePassword";
import UserPosts from "./UserPosts";
import UserPhotos from "./UserPhotos";

export default function Activity({ history, settings = false, id }) {
  const [activity, setactivity] = React.useState("activity");
  const handleActivity = (value) => {
    setactivity(value);
  };
  return (
    <div className="card">
      <div className="card-header p-2">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <Link
              className={
                activity === "activity" ? "nav-link active show" : "nav-link"
              }
              to="#activity"
              data-toggle="tab"
              onClick={() => {
                handleActivity("activity");
              }}
            >
              Activity
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={
                activity === "photos" ? "nav-link active show" : "nav-link"
              }
              to="#photos"
              data-toggle="tab"
              onClick={() => {
                handleActivity("photos");
              }}
            >
              Photos
            </Link>
          </li>

          {settings && (
            <li className="nav-item">
              <Link
                className={
                  activity === "settings" ? "nav-link active show" : "nav-link"
                }
                to="#settings"
                data-toggle="tab"
                onClick={() => {
                  handleActivity("settings");
                }}
              >
                Settings
              </Link>
            </li>
          )}
        </ul>
      </div>
      {/* <!-- /.card-header --> */}

      <div className="card-body">
        <div className="tab-content">
          <div
            className={
              activity === "activity"
                ? "tab-pane active col-md-7 show"
                : "tab-pane"
            }
            id="activity"
          >
            <UserPosts id={id}></UserPosts>
          </div>
          <div
            className={
              activity === "photos" ? "tab-pane active show" : "tab-pane"
            }
            id="photos"
          >
            <UserPhotos id={id}></UserPhotos>
          </div>

          <div
            className={
              activity === "settings" ? "tab-pane active show" : "tab-pane"
            }
            id="settings"
          >
            <UpdateProfile history={history}></UpdateProfile>
            <UpdatePassword history={history}></UpdatePassword>
          </div>
        </div>
      </div>
    </div>
  );
}
