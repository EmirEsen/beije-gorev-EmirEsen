import { ILogin } from "@/models/ILogin"
import { ILoginResponse } from "@/models/ILoginResponse"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import * as SecureStore from 'expo-secure-store';

export interface IAuthState {
    isLoading: boolean
    token: string
}

const initialAuthState: IAuthState = {
    isLoading: false,
    token: '',
}


export const fetchLogin = createAsyncThunk<ILoginResponse, ILogin, { rejectValue: string }>(
    'auth/login',
    async (payload: ILogin) => {
        try {
            const response = await fetch(`https://96318a87-0588-4da5-9843-b3d7919f1782.mock.pstmn.io/sign-in-request`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'email': payload.email,
                    'password': payload.password
                })
            });

            const data = await response.json();
            console.log('Raw API response:', data);
            return data;
        } catch (error) {
            console.error('Error in fetchLogin:', error);
            throw error;
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.pending, (state) => {
                state.isLoading = true;
                console.log('Login request started');
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log('Login response received:', action.payload);
                if (action.payload.data) {
                    state.token = action.payload.data.token;
                    console.log('About to store token:', action.payload.data.token);
                    SecureStore.setItemAsync('token', action.payload.data.token);
                    // Check if token was stored
                    SecureStore.getItemAsync('token').then(token => {
                        console.log('token stored --> ', token);
                    });
                } else {
                    console.log('No data in payload or no token in data');
                }
            })
            .addCase(fetchLogin.rejected, (state, action) => {
                state.isLoading = false;
                console.log('Login request failed:', action.error);
            })
    }
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;