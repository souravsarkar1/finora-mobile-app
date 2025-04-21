import { axiosInstance } from "@/lib/axios";

export const getMonthWiseReport = async (month: number, year: number) => {
    try {
        const res = await axiosInstance.get(`/expenses/report`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
