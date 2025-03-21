import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import authSlice from "./feature/AuthSlice";
import profileSlice from "./feature/ProfileSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        profile: profileSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
        }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector = useSelector.withTypes<RootState>()
export default store;