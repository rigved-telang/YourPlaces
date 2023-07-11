import axios from "axios";

const instance = (token) =>
  axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}/places/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

export default instance;
