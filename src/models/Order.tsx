declare global {
    interface Order {
        id: number;
        producer: Producer;
        consumer: Consumer;
        quantity:number;
        received: boolean;
    }
}
export { };