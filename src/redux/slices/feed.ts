import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TFeedState } from "../../types";

const initialState: TFeedState = {
    searchQuery: "",
    count: 0,
    pageNumber: 0,
};

export default createSlice({
    name: "feed",
    initialState,
    reducers: {
        setFeed: (state, action: PayloadAction<TFeedState>) => {
            return { ...state, ...action.payload };
        },
    }
});