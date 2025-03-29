declare global {
    interface Producer {
        id: number;
        email: string;
        businessName: string;
        description?: string;
        location: string;
        address: string;
    }
}
export { };