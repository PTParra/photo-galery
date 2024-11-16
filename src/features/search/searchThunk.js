import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSearchThunk = createAsyncThunk('search/getSearchList', async (params = "") =>{

    const baseURL = 'https://api.unsplash.com/';
    
    let urlToUse;

    if(params === ""){
        urlToUse = baseURL + `/photos/random?count=20`;
    }else{
        urlToUse = baseURL + `/search/photos?query=${params}&per_page=20`;
    }

    try {
        const response = await fetch(urlToUse, {
            method: 'GET',
            headers: {
                'Authorization': `Client-ID ${import.meta.env.VITE_UNSPLASH_KEY}`
            }
        });
        if(response.ok){
            const data = await response.json();
            return params === "" ? data : data.results;
        }
    } catch (error) {
        throw Error("ERROR: " + error)
    }

})