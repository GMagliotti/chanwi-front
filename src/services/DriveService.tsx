import { api } from "../api.ts";
import { ActiveDrive } from "../models/ActiveEvents.tsx";

export async function createDrive(userId: string, drive: ActiveDrive): Promise<ActiveDrive> {
    const response = await api.post<ActiveDrive>("/receivers/" + userId + "/drives", drive);
    return response.data;
}

export async function getDrives(userId: string): Promise<ActiveDrive[]> {
    const response = await api.get<ActiveDrive[]>("/receivers/" + userId + "/drives");
    return response.data;
}
