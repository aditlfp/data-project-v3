import Axios from "axios";

const axios = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

export default axios;
