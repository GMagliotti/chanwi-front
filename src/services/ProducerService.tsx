// ProducerService.tsx
import axios from "axios";

// Create a new Producer
export async function createProducer(producer: Omit<Producer, "id">): Promise<Producer> {
    const response = await axios.post<Producer>("/producer/producers/", producer);
    return response.data;
}

// Get producers with user location as query params
export async function getProducers(userLatitude: number, userLongitude: number): Promise<Producer[]> {
    const response = await axios.get<Producer[]>("/producer/producers/", {
        params: {
            userLatitude,
            userLongitude,
        },
    });
    return response.data;
}
