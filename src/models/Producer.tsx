declare global {
    interface Producer {
        id?: number;
        password?: string;
        email: string;
        business_name: string;
        description?: string;
        longitude?: number;
        latitude?: number;
        address: string;
        rating?: number 
    }
}
export { };