import axios from "axios";
import { url } from "../helpers/url";

export default async function loginUser(email, password) {
  let response = await axios
    .post(`${url}/api/v1/auth/login`, {
      identifier: email,
      password,
    })
    .catch((err) => (response = err.response));
  return response;
}
