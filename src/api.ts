// api.ts
import axios from 'axios';

export const api = axios.create({
    baseURL: "https://chanwi-api2-production.up.railway.app"
    // other global axios settings (headers, interceptors, etc)
});
