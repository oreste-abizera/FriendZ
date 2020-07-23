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
  return response.data.data || [];
}

export async function getUser(id, token) {
  let response = await axios
    .get(`${url}/api/v1/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => (response = err.response));
  if (!response) return {};
  return response.data.data || {};
}

export async function getUsers(token) {
  let response = await axios
    .get(`${url}/api/v1/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => (response = err.response));
  return response.data.data || [];
}

export async function getLatestMembers(token) {
  let response = await axios
    .get(`${url}/api/v1/users/latest`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => (response = err.response));
  return response.data.data || [];
}

export async function getPosts(token) {
  let response = await axios
    .get(`${url}/api/v1/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => (response = err.response));
  return response.data.data || [];
}

export async function getPost(post, token) {
  let response;
  response = await axios
    .get(`${url}/api/v1/posts/${post}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((err) => (response = err.response));
  return response ? response.data.data || {} : {};
}

export async function getUserPosts(id, token) {
  let response = await axios
    .get(`${url}/api/v1/posts/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => (response = err.response));
  return response.data.data || [];
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

export async function createPost(data, token) {
  let response = await axios
    .post(`${url}/api/v1/posts`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((err) => (response = err.response));
  return response;
}

export async function commentOnPost(comment, post, token) {
  let response = await axios
    .post(
      `${url}/api/v1/posts/${post}/comments`,
      {
        comment,
        createdAt: new Date().toISOString(),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch((err) => (response = err.response));
  return response;
}

export async function getPostComments(post, token) {
  let response;
  response = await axios
    .get(`${url}/api/v1/posts/${post}/comments`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((err) => (response = err.response));
  return response ? response.data.data || [] : [];
}

export async function likePost(post, token) {
  let response;
  response = await axios
    .put(
      `${url}/api/v1/posts/${post}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch((err) => (response = err.response));
  return response;
}

export async function sendMessage(data, user, token) {
  let response;
  response = await axios
    .post(`${url}/api/v1/users/${user}/messages`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((err) => (response = err.response));
  return response;
}

export async function getMessages(user, token) {
  let response;
  response = await axios
    .get(`${url}/api/v1/users/${user}/messages`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((err) => (response = err.response));
  return response ? response.data.data || [] : [];
}

export async function readMessages(user, token) {
  let response;
  response = await axios
    .put(
      `${url}/api/v1/users/${user}/messages`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .catch((err) => (response = err.response));
  return response;
}

export async function getlatestchats(token) {
  let response;
  response = await axios
    .get(`${url}/api/v1/users/me/messages/chats`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((err) => (response = err.response));
  return response ? response.data.data || [] : [];
}
