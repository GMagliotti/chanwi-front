declare global {
    interface Order {
        id?: number;
        post_id: number;
        consumer_id: number;
        quantity: number;
        received: boolean;
    }
}
export { };