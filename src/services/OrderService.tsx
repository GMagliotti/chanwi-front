import { api } from "../api.ts";

export async function createOrder(order: Order): Promise<Order> {
    const response = await api.post<Order>("/orders/", order);
    return response.data;
}

export async function getOrders(): Promise<Order[]> {
    const response = await api.get<Order[]>("/orders/");
    return response.data;
}
