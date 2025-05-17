import { axiosInstance } from "@/lib/axios";
import axios from "axios";

export const verifyToken = async (token: any) => {
    try {
        const res = await axiosInstance.post("/user/verify-token", token);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const registerNewUser = async (payload: any) => {
    try {
        const res = await axios.post("http://192.168.0.106:5000/user/register", payload);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error;
    }
}

export const updateIncomeAndExpense = async (payload: any) => {
    try {
        const res = await axiosInstance.put("/user/update-income-and-expense-sources", payload);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}