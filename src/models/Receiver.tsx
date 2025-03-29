declare global {
    interface Receiver {
        id: number;
        email: string;
        password: string;
        organizationName: string;
        latitude: number;
        longitude: number;
        address: string;
    }
}
export { };