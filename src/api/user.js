import request from "./request";
const md5 = require("md5");
export async function UserLogin(data) {
  let { username, password } = data;
  let passwordMd5 = md5(password);
  return await request.post("/api/user/login", {
    name: username,
    password: passwordMd5,
  });
}

export async function logout(token) {
  return await request.post("/api/user/logout", { token });
}

export async function updateTheUserData(data) {
  return await request.post("/api/user/updateTheUserData", data);
}

export async function getAllUserData() {
  return await request.get("/api/user/getAllUserData");
}

export async function DeleteTheUserData(data) {
  return await request.post("/api/user/deleteTheUserData", data);
}
