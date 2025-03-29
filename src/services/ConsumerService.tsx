// ReceiverService.tsx
import axios from "axios";

// Create a new Receiver
export async function createReceiver(receiver: Omit<Receiver, "id">): Promise<Receiver> {
    const response = await axios.post<Receiver>("/receivers", receiver);
    return response.data;
}

// Get all Receivers
export async function getReceivers(): Promise<Receiver[]> {
    const response = await axios.get<Receiver[]>("/receivers");
    return response.data;
}
