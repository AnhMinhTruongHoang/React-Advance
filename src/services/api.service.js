import axios from "./axios.customize";

const fetchAllUserApi = () => {
  const URL_BACKEND = "/api/v1/user";
  return axios.get(URL_BACKEND);
};

const createUserApi = (fullName, email, password, phone) => {
  const URL_BACKEND = "/api/v1/user";
  const data = {
    fullName: fullName,
    email: email,
    password: password,
    phone: phone,
  };
  return axios.post(URL_BACKEND, data);
};
const updateUserApi = (_id, fullName, phone) => {
  const URL_BACKEND = "/api/v1/user";
  const data = {
    _id: _id,
    fullName: fullName,
    phone: phone,
  };
  return axios.put(URL_BACKEND, data);
};

const deleteUserApi = (id) => {
  const URL_BACKEND = `/api/v1/user/${id}`;

  return axios.delete(URL_BACKEND);
};

const handleUpdateFileApi = (file, folder) => {
  const URL_BACKEND = "/api/v1/file/upload";
  let config = {
    headers: {
      "upload-type": folder,
      "Content-Type": "multipart/form-data",
    },
  };
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", file);
  return axios.post(URL_BACKEND, bodyFormData, config);
};

const updateUserAvatarApi = (avatar, _id, fullName, phone) => {
  const URL_BACKEND = "/api/v1/user";
  const data = {
    _id: _id,
    avatar: avatar,
    fullName: fullName,
    phone: phone,
  };
  return axios.put(URL_BACKEND, data);
};

const registerApi = (fullName, email, password, phone) => {
  const URL_BACKEND = "/api/v1/user/register";
  const data = {
    fullName: fullName,
    email: email,
    password: password,
    phone: phone,
  };
  return axios.post(URL_BACKEND, data);
};
const loginApi = (email, password) => {
  const URL_BACKEND = "/api/v1/auth/login";
  const data = {
    username: email,
    password: password,
    delay: 2000,
  };
  return axios.post(URL_BACKEND, data);
};
const logoutApi = () => {
  const URL_BACKEND = "/api/v1/auth/logout";

  return axios.post(URL_BACKEND);
};

const getAccountApi = () => {
  const URL_BACKEND = "/api/v1/auth/account";

  return axios.get(URL_BACKEND);
};
//////////////// book
const fetchAllBookApi = () => {
  const URL_BACKEND = "/api/v1/book";

  return axios.get(URL_BACKEND);
};
const BookCreatorApi = (
  thumbnail,
  mainText,
  author,
  price,
  quantity,
  category
) => {
  const URL_BACKEND = "/api/v1/book";
  const data = {
    thumbnail: thumbnail,
    mainText: mainText,
    author: author,
    price: price,
    quantity: quantity,
    category: category,
  };
  return axios.post(URL_BACKEND, data);
};

const updateBookApi = (
  _id,
  thumbnail,
  mainText,
  author,
  price,
  quantity,
  category
) => {
  const URL_BACKEND = "/api/v1/book";
  const data = {
    _id: _id,
    thumbnail: thumbnail,
    mainText: mainText,
    author: author,
    price: price,
    quantity: quantity,
    category: category,
  };
  return axios.put(URL_BACKEND, data);
};

const deleteBookApi = (id) => {
  const URL_BACKEND = `/api/v1/book/${id}`;

  return axios.delete(URL_BACKEND);
};

export {
  fetchAllUserApi,
  createUserApi,
  updateUserApi,
  deleteUserApi,
  handleUpdateFileApi,
  updateUserAvatarApi,
  registerApi,
  loginApi,
  logoutApi,
  getAccountApi,
  fetchAllBookApi,
  BookCreatorApi,
  updateBookApi,
  deleteBookApi,
};
