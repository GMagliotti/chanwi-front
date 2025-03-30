// ProducerService.tsx
import { api } from '../api.ts';

// Create a new Producer
export async function createProducer(producer: Omit<Producer, "id">): Promise<Producer> {
    const response = await api.post<Producer>("/producers/", producer);
    return response.data;
}

// Get producers with user location as query params
export async function getProducers(user_latitude: number, user_longitude: number): Promise<Producer[]> {
    const response = await api.get<Producer[]>("/producers/", {
        params: {
            user_latitude,
            user_longitude,
        },
    });
    return response.data;
}

export async function getProducer(producerId: number): Promise<Producer> {
    const response = await api.get<Producer>("/producers/" + producerId);
    return response.data;
}
