import React from "react";
import { getUser } from "../../helpers/functions";
import { FriendZContext } from "../../context/context";
import Link from "react-router-dom/Link";
import ProfileInfo from "../../Components/ProfilePage/ProfileInfo";
import Activity from "../../Components/ProfilePage/Activity";

export default function ProfilePage(props) {
  const [user, setuser] = React.useState({});
  const { user: me } = React.useContext(FriendZContext);
  const { id } = props.match.params;

  //function to load user info
  const loadInfo = async () => {
    let userInfo = await getUser(id, me.token);
    setuser(userInfo);
  };

  React.useEffect(() => {
    loadInfo();
    return () => {};
  }, [id, me]);
  return (
    <div className="content-wrapper">
      {/* <!-- Content Header (Page header) --> */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Profile</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item active">User Profile</li>
              </ol>
            </div>
          </div>
        </div>
        {/* <!-- /.container-fluid --> */}
      </section>

      {/* <!-- Main content --> */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              <ProfileInfo user={user}></ProfileInfo>
            </div>
            <div className="col-md-8">
              <Activity
                id={id}
                history={props.history}
                settings={id === me.info._id.toString() ? true : false}
              ></Activity>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
