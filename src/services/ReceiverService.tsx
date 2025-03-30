import { api } from "../api.ts";

export async function createReceiver(receiver: Omit<Receiver, "id">): Promise<Receiver> {
    const response = await api.post<Receiver>("/receivers", receiver);
    return response.data;
}

export async function getReceivers(user_latitude: number, user_longitude: number): Promise<Receiver[]> {
    const response = await api.get<Receiver[]>("/receivers/", {
        params: {
            user_latitude: user_latitude,
            user_longitude: user_longitude,
        },
    });
    return response.data;
}
