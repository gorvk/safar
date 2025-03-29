import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TAuthState } from "../../types";

const initialState: TAuthState = { user: null };
export default createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (_, action: PayloadAction<TAuthState>) => {
            return action.payload;
        },
    }
});