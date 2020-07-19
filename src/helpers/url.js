export const url2 = "http://localhost:5000";
export const url =
  process.env.NODE_ENV === "development"
    ? url2
    : "https://friendz-api.herokuapp.com";
export const defaultImage = `${url}/defaults/avatar.jpg`;
export const defaultBg = `${url}/defaults/background.png`;
export const logo = `${url}/defaults/logo.gif`;
