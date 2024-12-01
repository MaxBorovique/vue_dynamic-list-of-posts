import { client } from "@/utils/fetchClient"


export const getPostComments = (postId) => (
  client.get(`/comments?postId=${postId}`)

)
