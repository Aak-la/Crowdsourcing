import request from "./request";
const md5 = require("md5");
export async function getUser(data) {
  let { username, password } = data;
  let passwordMd5 = md5(password);
  return await request.post("/api/login", {
    name: username,
    password: passwordMd5,
  });
}

export async function logout(token) {
  return await request.post("/api/logout", { token });
}
