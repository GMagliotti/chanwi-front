import { api } from "../api.ts";

export async function createPost(userId: string, post: Post): Promise<Post> {
    const response = await api.post<Post>("/producer/" + userId + "/posts", post);
    return response.data;
}

export async function getPosts(userId: string): Promise<Post[]> {
    const response = await api.get<Post[]>("/producer/" + userId + "/posts");
    return response.data;
}
