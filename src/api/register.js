import request from "./request";
export async function register(data) {
  return await request.post("/api/register", {
    ...data,
  });
}
