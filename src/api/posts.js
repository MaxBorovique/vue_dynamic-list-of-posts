import { client } from "@/utils/fetchClient";

export const userPosts = userId => client.get(`/posts?userId=${userId}`);

export const deletePost = postId => client.delete(`/posts/${postId}`);

export const createPost = data => client.post('/posts', data);
