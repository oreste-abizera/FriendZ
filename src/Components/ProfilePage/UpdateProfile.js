import React from "react";
import { FriendZContext } from "../../context/context";
import Link from "react-router-dom/Link";
import { updateMyProfile } from "../../helpers/functions";

export default function UpdateProfile() {
  const { user, resolveResponse } = React.useContext(FriendZContext);
  const { info } = user;

  const [firstName, setfirstName] = React.useState(info.firstName || "");
  const [lastName, setlastName] = React.useState(info.lastName || "");
  const [email, setemail] = React.useState(info.email || "");
  const [location, setlocation] = React.useState(info.location || "");
  const [skills, setskills] = React.useState(info.skills || "");
  const [education, seteducation] = React.useState(info.education || "");
  const [notes, setnotes] = React.useState(info.notes || "");

  const handlefirstName = (e) => {
    setfirstName(e.target.value);
  };
  const handlelastName = (e) => {
    setlastName(e.target.value);
  };
  const handleemail = (e) => {
    setemail(e.target.value);
  };
  const handlelocation = (e) => {
    setlocation(e.target.value);
  };
  const handleskills = (e) => {
    setskills(e.target.value);
  };
  const handleeducation = (e) => {
    seteducation(e.target.value);
  };
  const handlenotes = (e) => {
    setnotes(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let updates = {
      firstName,
      lastName,
      email,
      location,
      skills,
      education,
      notes,
    };
    let response = await updateMyProfile(updates, user.token);
    resolveResponse(response, "Profile info successifully updated.");
  };
  return (
    <form className="form-horizontal" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="fname" className="col-sm-2 control-label">
          First Name
        </label>

        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="fname"
            placeholder="First Name"
            value={firstName}
            onChange={handlefirstName}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="lname" className="col-sm-2 control-label">
          Last Name
        </label>

        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="lname"
            placeholder="Last Name"
            value={lastName}
            onChange={handlelastName}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="inputEmail" className="col-sm-2 control-label">
          Email
        </label>

        <div className="col-sm-10">
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            placeholder="Email"
            value={email}
            onChange={handleemail}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="location" className="col-sm-2 control-label">
          Location
        </label>

        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="location"
            placeholder="Location"
            value={location}
            onChange={handlelocation}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="education" className="col-sm-2 control-label">
          Education
        </label>

        <div className="col-sm-10">
          <textarea
            className="form-control"
            id="education"
            placeholder="Education"
            value={education}
            onChange={handleeducation}
          ></textarea>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="inputSkills" className="col-sm-2 control-label">
          Skills
        </label>

        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="inputSkills"
            placeholder="Skills"
            value={skills}
            onChange={handleskills}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="notes" className="col-sm-2 control-label">
          Notes
        </label>

        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="notes"
            placeholder="Notes"
            value={notes}
            onChange={handlenotes}
          />
        </div>
      </div>
      <div className="form-group">
        <div className="col-sm-offset-2 col-sm-10">
          <div className="checkbox">
            <label>
              <input type="checkbox" /> I agree to the{" "}
              <Link to="#">terms and conditions</Link>
            </label>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="col-sm-offset-2 col-sm-10">
          <button type="submit" className="btn btn-danger">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
