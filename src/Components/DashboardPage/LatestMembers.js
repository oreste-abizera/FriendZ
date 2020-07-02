import React from "react";
import { FaMinus, FaTimes } from "react-icons/fa";
import { FriendZContext } from "../../context/context";
import { getLatestMembers } from "../../helpers/functions";
import { url, defaultImage } from "../../helpers/url";
import Link from "react-router-dom/Link";

export default function LatestMembers() {
  const { user } = React.useContext(FriendZContext);
  const [latestMembers, setlatestMembers] = React.useState([]);
  async function getMembers() {
    let members = await getLatestMembers(user.token);
    setlatestMembers(members || []);
  }
  React.useEffect(() => {
    getMembers();
    return () => {};
  }, []);
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">New Members</h3>

        <div className="card-tools">
          <span className="badge badge-danger">
            {latestMembers.length} New Members
          </span>
          <button type="button" className="btn btn-tool" data-widget="collapse">
            <FaMinus></FaMinus>
          </button>
          <button type="button" className="btn btn-tool" data-widget="remove">
            <FaTimes></FaTimes>
          </button>
        </div>
      </div>
      {/* <!-- /.card-header --> */}
      <div className="card-body p-0">
        <ul className="users-list clearfix">
          {latestMembers.map((item) => {
            let date = item.createdAt.split("T")[0];
            date = date.split("-")[2] + "/" + date.split("-")[1];
            return (
              <li key={item._id}>
                <img
                  src={`${
                    item.image ? `${url}/uploads/${item.image}` : defaultImage
                  }`}
                  alt="User"
                  style={{ minHeight: "5rem", maxHeight: "5rem" }}
                />
                <Link className="users-list-name" to={`/profile/${item._id}`}>
                  {item.firstName + " " + item.lastName}
                </Link>
                <span className="users-list-date">{date}</span>
              </li>
            );
          })}
        </ul>
        {/* <!-- /.users-list --> */}
      </div>
      {/* <!-- /.card-body --> */}
      <div className="card-footer text-center">
        <Link to="/users">View All Users</Link>
      </div>
      {/* <!-- /.card-footer --> */}
    </div>
  );
}
