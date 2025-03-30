declare global {
    interface Receiver {
        id?: number;
        password?: string;
        email: string;
        organization_name: string;
        latitude: number;
        longitude: number;
        address: string;
    }
}
export { };