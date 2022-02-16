import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwt_decode, { JwtPayload } from "jwt-decode";

// Define a type for the slice state
export interface AuthState {
    loggedIn: boolean;
    name: string;
    token?: string;
    iat?: Date;
    exp?: number
    expires?: Date;
    expires1?: Date;
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
    expires: undefined
}

export const counterSlice = createSlice({
    name: 'auth',

    initialState,
    reducers: {

        loginToken: (state, action: PayloadAction<string>) => {

            const decodedToken = jwt_decode<JwtExtend>(action.payload);
            console.log(decodedToken)
            if (decodedToken && decodedToken.name) {
                state.token = action.payload;
                state.loggedIn = true;


                if (decodedToken && decodedToken.exp) {
                    state.exp = decodedToken.exp;
                    state.expires = new Date(decodedToken.exp * 1000);

                }
                state.name = decodedToken.name;
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