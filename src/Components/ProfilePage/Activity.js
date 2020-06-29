import React from "react";
import Post from "./Post";
import UpdateProfile from "./UpdateProfile";
import Link from "react-router-dom/Link";
import UpdatePassword from "./UpdatePassword";

export default function Activity({ settings = false }) {
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
              activity === "activity" ? "tab-pane active show" : "tab-pane"
            }
            id="activity"
          >
            <Post></Post>
            <Post></Post>
          </div>
          <div
            className={
              activity === "photos" ? "tab-pane active show" : "tab-pane"
            }
            id="photos"
          >
            hello from photos
          </div>

          <div
            className={
              activity === "settings" ? "tab-pane active show" : "tab-pane"
            }
            id="settings"
          >
            <UpdateProfile></UpdateProfile>
            <UpdatePassword></UpdatePassword>
          </div>
        </div>
      </div>
    </div>
  );
}
