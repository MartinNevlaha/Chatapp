import axios from "axios";

import store from "../store";

const instance = axios.create({
  baseURL: "http://localhost:8000",
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
