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

export async function updateMyProfile(updates, token) {
  let response = await axios
    .put(
      `${url}/api/v1/auth/updateProfile`,
      { ...updates },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .catch((err) => (response = err.response));
  return response;
}

export async function updateMyPassword(data, token) {
  let response = await axios
    .put(`${url}/api/v1/auth/updatePassword`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((err) => (response = err.response));
  return response;
}

export async function updateMyProfilePicture(data, token) {
  let response = await axios
    .put(`${url}/api/v1/auth/updatePicture/profile`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((err) => (response = err.response));
  return response;
}

export async function updateMyCoverPicture(data, token) {
  let response = await axios
    .put(`${url}/api/v1/auth/updatePicture/cover`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((err) => (response = err.response));
  return response;
}
