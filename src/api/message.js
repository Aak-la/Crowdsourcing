import request from "./request";

export async function getMessages(id) {
  return await request.get("/api/message", {
    params: {
      id,
    },
  });
}

export async function postComment(msgInfo) {
  console.log(msgInfo);
  return await request.post("/api/comment", msgInfo);
}
