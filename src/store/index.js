import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./nav-slice";

const store = configureStore({
    reducer: {
        visibility: navReducer,
    }
});

export default store;