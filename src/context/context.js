import React from "react";
import {
  getMe,
  getUsers,
  readMessages,
  getlatestchats,
} from "../helpers/functions";
import { Link } from "react-router-dom";
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
  const [latestchats, setlatestchats] = React.useState([]);
  const [currentchat, setcurrentchat] = React.useState({
    user: null,
    state: "collapse",
  });
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

  async function readmessages() {
    await readMessages(currentchat.user, user.token);
    setreload(!reload);
  }

  React.useEffect(() => {
    if (user.token) {
      userLogin(user);
    }
    mount();
  }, [user, reload]);

  React.useEffect(() => {
    if (currentchat.user && currentchat.state !== "closed") {
      readmessages();
    }
  }, [currentchat]);

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

  const changecurrentchat = ({ state, user }) => {
    let tempchat = { ...currentchat };
    tempchat.state = state || tempchat.state;
    if (state === "shown") {
      tempchat.user = user || tempchat.user;
    }
    setcurrentchat(tempchat);
  };

  const closeChat = () => {
    changecurrentchat({ state: "closed", user: null });
  };

  const collapseChat = () => {
    changecurrentchat({ state: "collapse" });
  };

  const openChat = (user) => {
    changecurrentchat({ state: "shown", user });
  };

  const loadlatestchats = async () => {
    setlatestchats(await getlatestchats(user.token));
  };

  const formatTime = (timeToFormat) => {
    let today = new Date().toISOString();
    let time = new Date(timeToFormat).toISOString();
    let date = time.split("T")[0];
    let rest = time.split("T")[1];

    let hours = rest.split(":")[0];
    let minutes = rest.split(":")[1];

    let finalDate;
    let todayDate = today.split("T")[0];
    if (date === todayDate) {
      finalDate = "today";
    } else if (
      todayDate.split("-")[0] === date.split("-")[0] &&
      todayDate.split("-")[1] === date.split("-")[1] &&
      parseInt(todayDate.split("-")[2]) - 1 === parseInt(date.split("-")[2])
    ) {
      finalDate = "yesterday";
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

  const formatText = (text) => {
    let finaltext;
    if (text) {
      text = text.split("#");
      for (let i = 0; i < text.length; i++) {
        if (i === 0) {
          finaltext = <span>{text[i]}</span>;
        } else {
          let hash = text[i].split(" ");
          finaltext = (
            <span>
              {finaltext}{" "}
              <b>
                <Link to={`/hashtags/${hash[0]}`} className="text-dark">
                  {"#" + hash[0]}
                </Link>
              </b>
              {hash.map((item, index) => {
                return (
                  <span key={index}>{index !== 0 && " " + item + " "}</span>
                );
              })}
            </span>
          );
        }
      }
    }

    return finaltext;
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
        currentchat,
        closeChat,
        collapseChat,
        openChat,
        formatText,
        latestchats,
        loadlatestchats,
      }}
    >
      {children}
    </FriendZContext.Provider>
  );
}

export { FriendZContext, FriendZProvider };
