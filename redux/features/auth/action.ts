import { AppDispatch } from "@/redux/store/store";
import axios from "axios";

export const loginuUser = (payload: any) => async (dispatch: AppDispatch) => {
    try {
        dispatch({ type: 'LOGIN_REQUEST' });
        const res = await axios.post('http://192.168.31.5:5000/user/login', payload);
        console.log(res);
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
        return res.data;
    } catch (error: any) {
        dispatch({ type: 'LOGIN_FAILURE', payload: { error: error.message } });
    }

}