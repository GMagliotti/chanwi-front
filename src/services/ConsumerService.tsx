import { api } from "../api.ts";

export async function createConsumer(Consumer: Consumer): Promise<Consumer> {
    const response = await api.post<Consumer>("/consumers", Consumer);
    return response.data;
}
