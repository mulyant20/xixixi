import { configureStore } from "@reduxjs/toolkit";
import jokesSlice from "./slice/jokesSlice";

export const store = configureStore({
    reducer: {
        jokes: jokesSlice
    }
})

