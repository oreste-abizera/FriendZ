import React from "react";
import { getMe, getUsers } from "../helpers/functions";
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
  const [users, setusers] = React.useState([]);
  const [reload, setreload] = React.useState(false);

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
    setreload(!reload);
  };
  const mount = async () => {
    if (user.token) {
      setusers(await getUsers(user.token));
    }
  };

  React.useEffect(() => {
    if (user.token) {
      userLogin(user);
    }
    mount();
  }, [user, reload]);

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

  const formatTime = (timeToFormat) => {
    let today = new Date().toISOString();
    let time = new Date(timeToFormat).toISOString();
    let date = time.split("T")[0];
    let rest = time.split("T")[1];

    let hours = rest.split(":")[0];
    let minutes = rest.split(":")[1];

    let finalDate;
    if (date === today.split("T")[0]) {
      finalDate = "today";
    } else {
      finalDate =
        date.split("-")[2] +
        "/" +
        date.split("-")[1] +
        "/" +
        date.split("-")[0];
    }
    time = hours + ":" + minutes + " " + finalDate;
    return time;
  };

  return (
    <FriendZContext.Provider
      value={{
        user,
        users,
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
        formatTime,
      }}
    >
      {children}
    </FriendZContext.Provider>
  );
}

export { FriendZContext, FriendZProvider };
