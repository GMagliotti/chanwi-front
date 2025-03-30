declare global {
    interface Post {
        id?: number;
        producerId?: number | string;
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