import axios from "axios";

const instance = axios.create({
  baseURL: "https://api-cartao-node.onrender.com",
  timeout: 5000,
});

export default instance;