import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Accept": "application/json",
    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
  },
});

export default instance;
