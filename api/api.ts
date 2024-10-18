import { client } from "../httpClient"

export const getPosts = () => {
  return client.get('/posts')
}