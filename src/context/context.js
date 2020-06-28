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
  const [user, setuser] = React.useState(getUserFromSessionStorage);

  //sync user to sessionStorage
  const userLogin = async (user = { token: null, info: {} }) => {
    user.info = await getMe(user.token);
    sessionStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("user", JSON.stringify(user.info._id));
    setuser(user);
  };

  return (
    <FriendZContext.Provider
      value={{
        user,
        userLogin,
      }}
    >
      {children}
    </FriendZContext.Provider>
  );
}

export { FriendZContext, FriendZProvider };
