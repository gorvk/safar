import { configureStore } from "@reduxjs/toolkit";
import loaderSlice from "./slices/loader"
import authSlice from "./slices/auth"
import feedSlice from "./slices/feed"
import { TAppState } from "../types";

export const store = configureStore<TAppState>({
    reducer: {
        loader: loaderSlice.reducer,
        auth: authSlice.reducer,
        feed: feedSlice.reducer,
    }
});
