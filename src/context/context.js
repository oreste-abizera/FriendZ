import React from "react";
import { getMe } from "../helpers/functions";
const FriendZContext = React.createContext();

function FriendZProvider({ children }) {
  //get user from sessionStorage
  const getUserFromSessionStorage = () => {
    return sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user"))
      : { token: null, info: {} };
  };

  //state values
  const [controlSidebar, setcontrolSidebar] = React.useState(false);
  const [dropdown, setdropdown] = React.useState("");
  const [sidebarOpen, setsidebarOpen] = React.useState(true);
  const [user, setuser] = React.useState(getUserFromSessionStorage);

  //sync user to sessionStorage
  const userLogin = async (user = { token: null, info: {} }) => {
    user.info = await getMe(user.token);
    sessionStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("user", JSON.stringify(user.info._id));
    setuser(user);
  };

  const userLogout = () => {
    setuser({ token: null, info: {} });
    sessionStorage.clear();
  };

  const toggleControlSidebar = () => {
    setcontrolSidebar(!controlSidebar);
  };

  const handleDropdown = (value) => {
    if (dropdown === value) value = "";
    setdropdown(value);
  };

  const toggleSidebar = () => {
    setsidebarOpen(!sidebarOpen);
  };

  return (
    <FriendZContext.Provider
      value={{
        user,
        userLogin,
        userLogout,
        controlSidebar,
        toggleControlSidebar,
        dropdown,
        handleDropdown,
        sidebarOpen,
        toggleSidebar,
      }}
    >
      {children}
    </FriendZContext.Provider>
  );
}

export { FriendZContext, FriendZProvider };
