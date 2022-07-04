import request from"./request"
export async function getUser(name,passWord) {
  return await request.post("/api/login", {
    params: {
      name,
      passWord
    },
  });
}