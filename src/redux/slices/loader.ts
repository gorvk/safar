import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: boolean = false;
export default createSlice({
    name: "loader",
    initialState,
    reducers: {
        setloader: (_, action: PayloadAction<boolean>) => {
            return action.payload;
        },
    }
});