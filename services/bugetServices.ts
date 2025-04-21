
import { axiosInstance } from "@/lib/axios";

export const getAllBuget = async (payload: any) => {
    try {
        const data = await axiosInstance.get(`/budget?year=${payload.year}&month=${payload.month}`);
        return data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}




export const addNewBugget = async (payload: any) => {
    try {
        const res = await axiosInstance.post('/budget', payload);
        return res.data;
    } catch (error: any) {
        if (!error.response) {
            // Network error (server unreachable)
            console.error('Network Error: Unable to connect to the server. Please check if the server is running and accessible.');
            throw new Error('Network Error: Server unreachable');
        }
        console.error('Budget API Error:', error.response?.status, error.response?.data);
        throw error;
    }
}
