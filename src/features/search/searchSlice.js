import { createSlice } from "@reduxjs/toolkit";
import { getSearchThunk } from "./searchThunk";



export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        status: 'idle',
        error: null,
        data: []
    },
    reducers: {
        newPetition: (state, action) => {
            
            state.status = "idle"
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getSearchThunk.pending, (state, action) => {
            state.status = "pending";
        }).addCase(getSearchThunk.rejected,(state,action) => {
            state.status = "rejected"
            state.error = action.error
        }).addCase(getSearchThunk.fulfilled,(state,action) => {
            state.status ="fulfilled"
            state.data = action.payload
        })
    }
})

export const { newPetition } = searchSlice.actions

export const searchList = (state) => state.search.data
export const searchListStatus = (state) => state.search.status