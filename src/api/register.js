import request from "./request";
export async function register(name, passWord) {
  return await request.post("/api/register", {
    name: name,
    password: passWord,
  });
}
