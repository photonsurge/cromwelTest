import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwt_decode, { JwtPayload } from "jwt-decode";

// Define a type for the slice state
export interface AuthState {
    loggedIn: boolean;
    name: string;
    token?: string;
    iat?: Date;
    exp?: number
}


interface JwtExtend extends JwtPayload {
    loggedIn: boolean;
    name: string;
    token?: string;
}

// Define the initial state using that type
const initialState: AuthState = {
    name: '',
    loggedIn: false,
}

export const counterSlice = createSlice({
    name: 'auth',

    initialState,
    reducers: {

        loginToken: (state, action: PayloadAction<string>) => {
            try {
                const decodedToken = jwt_decode<JwtExtend>(action.payload);
                if (decodedToken && decodedToken.name) {
                    state.token = action.payload;
                    state.loggedIn = true;


                    if (decodedToken && decodedToken.exp) {
                        state.exp = decodedToken.exp;

                    }
                    state.name = decodedToken.name;
                }
            } catch {

            }


        },

        logoutNow: (state) => {
            state.token = undefined;
            state.name = '';
            state.loggedIn = false;
        }
    },
})

export const { loginToken, logoutNow } = counterSlice.actions


export default counterSlice.reducer