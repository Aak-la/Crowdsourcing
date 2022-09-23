import request from "./request";
export async function getUser(name, password) {
  return await request.post("/api/login", {
    name: name,
    password: password,
  });
}
