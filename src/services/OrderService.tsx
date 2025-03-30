import { api } from "../api.ts";

export async function createOrder(order: Order): Promise<Order> {
    const response = await api.post<Order>("/orders/", order);
    return response.data;
}

export async function getOrders(id?: string): Promise<Order[]> {
    const response = await api.get<Order[]>("/orders/", {
        params: {
            post_id: id,
            incompleted_orders_only: true
        },
    });
    return response.data;
}

export async function fulfillOrder(orderId: number): Promise<void> {
    await api.post(`/orders/${orderId}`);
}