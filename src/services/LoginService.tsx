import { api } from "../api.ts";

export async function postLogin(login: Login): Promise<Login> {
    const response = await api.post<Login>("/login/", login);
    return response.data;
}
