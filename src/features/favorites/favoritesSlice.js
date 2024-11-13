import { createSlice } from "@reduxjs/toolkit";
import { updateLocalStorage } from "../localStorage/updateLocalStorage";


export const favoritesSlice = createSlice({
    name: 'favorite',
    initialState: {
        data: localStorage.getItem('favorites') ?  Array.from(JSON.parse(localStorage.getItem('favorites'))) : []
    },
    reducers: {
        addFavorite: (state, action) => {
            state.data.push(action.payload);
            updateLocalStorage(state.data);
        },
        editFavorite: (state, action) => {
            let indexToModify = state.data.indexOf(action.payload);
            state.data[indexToModify].description = action.payload.description;
            updateLocalStorage(state.data);
        },
        removeFavorite: (state, action) => {
            state.data = state.data.filter(photo => photo.id !== action.payload);
            updateLocalStorage(state.data);
        }
    }
})

export const { addFavorite, editFavorite, removeFavorite } = favoritesSlice.actions

export const favouriteList = (state) => state.favorite.data