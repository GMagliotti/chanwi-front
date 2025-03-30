declare global {
    interface Login {
        id?: number;
        password: string;
        email: string;
        role: string;
        user_id?: string;
    }
}
export { };