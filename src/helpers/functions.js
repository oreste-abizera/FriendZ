import axios from "axios";
import { url } from "./url";
export async function getMe(token) {
  let response = await axios
    .get(`${url}/api/v1/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => (response = err.response));
  return response.data.data;
}

export async function getUser(id, token) {
  let response = await axios
    .get(`${url}/api/v1/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => (response = err.response));
  return response.data.data;
}
