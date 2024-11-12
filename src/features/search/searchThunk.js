import { createAsyncThunk } from "@reduxjs/toolkit";

const key = '8-DERz12s0jDsyXe9fdk2kd9TpI9LPO7dK-aV3FCqYg';

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
                'Authorization': `Client-ID ${key}`
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