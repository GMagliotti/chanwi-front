import { api } from "../api.ts";

export async function createReceiver(receiver: Omit<Receiver, "id">): Promise<Receiver> {
    const response = await api.post<Receiver>("/receivers", receiver);
    return response.data;
}

export async function getReceivers(userLatitude: number, userLongitude: number): Promise<Receiver[]> {
    const response = await api.get<Receiver[]>("/receivers/", {
        params: {
            userLatitude,
            userLongitude,
        },
    });
    return response.data;
}
