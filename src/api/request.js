import axios from "axios";
const ins = axios.create();
ins.interceptors.response.use(function(res) {
  res.headers.Authorization = "Bear " + window.sessionStorage.getItem("token");
  return res;
});

export default ins;
