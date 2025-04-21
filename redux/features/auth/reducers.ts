import { AnyAction } from '@reduxjs/toolkit';

interface AuthState {
    loginIsLoading: boolean;
    loginError: string | null;
    token: string | null;
    user: any | null;
}

// Make AuthAction extend AnyAction
interface AuthAction extends AnyAction {
    type: string;
    payload?: {
        token?: string;
        user?: any;
        error?: string;
    };
}

const initialState: AuthState = {
    loginIsLoading: false,
    loginError: null,
    token: null,
    user: null,
}

const authReducer = (state: AuthState = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {
                ...state,
                loginIsLoading: true,
                loginError: null,
            };
        case 'LOGIN_SUCCESS':
            console.log(action.payload, "action.payload");
            return {
                ...state,
                loginIsLoading: false,
                token: action.payload?.token || null,
                user: action.payload?.user || null,
                loginError: null,
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                loginIsLoading: false,
                loginError: action.payload?.error || null,
                token: null,
                user: null,
            };
        default:
            return state;
    }
};

export default authReducer;
