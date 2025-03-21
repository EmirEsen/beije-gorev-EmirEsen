import { IInsightResponse } from "@/models/IInsightResponse";
import { IMenstrationResponse } from "@/models/IMenstrationResponse";
import { IProfile, IProfileResponse } from "@/models/IProfile"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as SecureStore from 'expo-secure-store';

export interface IProfileState {
    isLoading: boolean;
    profile: IProfile | null;
    menstrationDays: IMenstrationResponse | null;
    insights: IInsightResponse | null;
    error: string | null;
}

const initialProfileState: IProfileState = {
    isLoading: false,
    profile: null,
    menstrationDays: null,
    insights: null,
    error: null
}

export const getProfile = createAsyncThunk<IProfileResponse, void, { rejectValue: string }>(
    'profile/getProfile',
    async () => {
        try {
            const token = await SecureStore.getItemAsync('token');

            if (!token) {
                console.warn('No token available for profile fetch');
            }

            const response = await fetch("https://96318a87-0588-4da5-9843-b3d7919f1782.mock.pstmn.io/profile", {
                // method: 'GET',
                // headers: {
                //     "Content-Type": "application/json",
                //     "x-auth-token": `${token}`
                // }
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Failed to fetch profile:', errorText);
                throw new Error(`Failed to fetch profile: ${response.status} ${errorText}`);
            }

            const data = await response.json();
            console.log('Profile data received:', data);
            return data;
        } catch (error) {
            console.error('Error in getProfile:', error);
            throw error;
        }
    }
);

export const getMenstrationDays = createAsyncThunk<IMenstrationResponse, void, { rejectValue: string }>(
    'profile/getMenstrationDays',
    async (_, { rejectWithValue }) => {
        try {
            console.log('getMenstrationDays thunk started');
            const token = await SecureStore.getItemAsync('token');

            if (!token) {
                console.warn('No token available for menstruation days fetch');
                return rejectWithValue('No authentication token found');
            }

            const response = await fetch("https://96318a87-0588-4da5-9843-b3d7919f1782.mock.pstmn.io/menstruation-days", {
                // method: 'GET',
                // headers: {
                //     "Content-Type": "application/json",
                //     "x-auth-token": `${token}`
                // }
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Failed to fetch menstruation days:', errorText);
                return rejectWithValue(`Failed to fetch menstruation days: ${response.status} ${errorText}`);
            }

            const data = await response.json();
            console.log('Menstruation days data received:', data);
            return data;
        } catch (error: any) {
            console.error('Error in getMenstrationDays:', error);
            return rejectWithValue(error.message || 'An unexpected error occurred');
        }
    }
);

export const getInsights = createAsyncThunk<IInsightResponse, void, { rejectValue: string }>(
    'profile/getInsights',
    async (_, { rejectWithValue }) => {
        try {
            console.log('getInsights thunk started');
            const token = await SecureStore.getItemAsync('token');

            if (!token) {
                console.warn('No token available for insights fetch');
                return rejectWithValue('No authentication token found');
            }

            const response = await fetch("https://96318a87-0588-4da5-9843-b3d7919f1782.mock.pstmn.io/insights", {
                // method: 'GET',
                // headers: {
                //     "Content-Type": "application/json",
                //     "x-auth-token": `${token}`
                // }
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Failed to fetch insights:', errorText);
                return rejectWithValue(`Failed to fetch insights: ${response.status} ${errorText}`);
            }

            const data = await response.json();
            console.log('Insights data received:', data);
            return data;
        } catch (error: any) {
            console.error('Error in getInsights:', error);
            return rejectWithValue(error.message || 'An unexpected error occurred');
        }
    }
);

const profileSlice = createSlice({
    name: 'profile',
    initialState: initialProfileState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Profile thunk cases
            .addCase(getProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.profile = action.payload.data;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch profile';
            })

            // Menstruation days thunk cases
            .addCase(getMenstrationDays.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getMenstrationDays.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload.success === true) {
                    state.menstrationDays = action.payload;
                }
            })
            .addCase(getMenstrationDays.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch menstruation days';
            })

            // Insights thunk cases
            .addCase(getInsights.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getInsights.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload.success === true) {
                    state.insights = action.payload;
                    console.log('insights ---->', state.insights.data)
                }
            })
            .addCase(getInsights.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch insights';
            });
    }
});

export default profileSlice.reducer;