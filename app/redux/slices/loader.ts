import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: boolean = true;
export default createSlice({
    name: "loader",
    initialState,
    reducers: {
        setloader: (_, action: PayloadAction<boolean>) => {
            return action.payload;
        },
    }
});