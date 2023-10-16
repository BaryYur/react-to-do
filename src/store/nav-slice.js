import { createSlice } from "@reduxjs/toolkit";
// const initialVisibleState = { visibility: false };

const navSlice = createSlice({
    name: "visibility",
    initialState: {
        visibility: false,
        activeItems: [],
        completedItems: [],
    },
    reducers: {
        visible(state) {
            state.visibility = true;
        },
        inVisible(state) {
            state.visibility = false;
        },
        completeItems(state) {
            state.completedItems = JSON.parse(localStorage.getItem("items")).filter(item => item.completed === true);
        },
        notCompleteItems(state) {
            state.activeItems = JSON.parse(localStorage.getItem("items")).filter(item => item.completed === false);
        }
    },
});

export const navActions = navSlice.actions;

export default navSlice.reducer;