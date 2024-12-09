import { client } from "@/utils/fetchClient";

export const getexistingUser = (userEmail) =>
  client.get(`/users?email=${userEmail}`);

export const createUser = (data) => client.post("/users", data);
