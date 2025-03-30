import { api } from "../api.ts";

export async function createProducer(producer: Omit<Producer, "id">): Promise<Producer> {
    const response = await api.post<Producer>("/producers/", producer);
    return response.data;
}

export async function getProducers(userLatitude: number, userLongitude: number): Promise<Producer[]> {
    const response = await api.get<Producer[]>("/producers/", {
        params: {
            userLatitude,
            userLongitude,
        },
    });
    return response.data;
}
