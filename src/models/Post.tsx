declare global {
    interface Post {
        id?: number;
        producer_id?: number | string;
        title: string;
        description: string;
        price: number;
        tag: string;
        stock: number;
        start_time: Date;
        end_time: Date;
    }
}
export { };