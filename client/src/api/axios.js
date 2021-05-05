import axios from "axios";
import config from "../config/app";

import store from "../store";

const instance = axios.create({
  baseURL: config.serverUrl,
  headers: {
    "Accept": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const token = store.getState().userAuth.token;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
})

export default instance;
