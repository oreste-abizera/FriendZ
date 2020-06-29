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
  const [sidebarOpen, setsidebarOpen] = React.useState(false);
  const [user, setuser] = React.useState(getUserFromSessionStorage);

  //sync user to sessionStorage
  const userLogin = async (data = { token: null, info: {} }) => {
    data.info = await getMe(data.token);
    sessionStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("user", JSON.stringify(data.info._id));
    setuser(data);
  };

  const userLogout = () => {
    setuser({ token: null, info: {} });
    sessionStorage.clear();
  };

  const reloadContent = () => {
    if (user.token) {
      userLogin(user);
    }
  };

  //reload content on a page refresh
  // if (user.token) {
  //   reloadContent();
  // }

  const resolveResponse = (response, message) => {
    let { success, error } = response.data;
    if (success) {
      if (message) {
        window.Toast.fire({
          title: message,
        });
      }
      reloadContent();
    } else {
      window.displayError(error || "something went wrong");
    }
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
        resolveResponse,
        reloadContent,
      }}
    >
      {children}
    </FriendZContext.Provider>
  );
}

export { FriendZContext, FriendZProvider };
