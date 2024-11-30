import { client } from "@/utils/fetchClient"


export const userPosts = (userId) => {
  return client.get(`/posts?userId=${userId}`);
}