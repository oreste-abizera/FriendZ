import axios from "axios";
import { url } from "../helpers/url";

export default async function registerUser(user) {
  let response = await axios
    .post(`${url}/api/v1/auth/register`, {
      ...user,
    })
    .catch((err) => (response = err.response));
  return response;
}
