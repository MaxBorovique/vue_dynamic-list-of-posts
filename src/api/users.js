import { client } from "@/utils/fetchClient";

export const getExsistingUser = userEmail => client.get(`/users?email=${userEmail}`);

export const createUser = data => client.post("/users", data);
