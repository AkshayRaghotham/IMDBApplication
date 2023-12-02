import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productReducer";
import favouriteSlice from "./favouriteReducer";

export default configureStore({
    reducer:{
        products:productReducer,
        favourites:favouriteSlice,
    }
});