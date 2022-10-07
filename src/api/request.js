import axios from "axios";
const token = localStorage.getItem("token");
const ins = axios.create({
  headers: {
    Authorization: "Bearer " + token,
  },
});
ins.interceptors.response.use(function(res) {
  return res;
});

export default ins;
