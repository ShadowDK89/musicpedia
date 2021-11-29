import { createSlice } from "@reduxjs/toolkit";
import { TMusicianData } from "../../Models/TMusicianData";

const musicianSlice = createSlice({
    name:'musicianData',
    initialState: <TMusicianData>{},
    reducers:{
        getMusicianData() {},
        setMusicianData(state, action){
            const userData = action.payload;
            return {...state, ...userData};
        }
    }
})

export const { getMusicianData, setMusicianData} = musicianSlice.actions;

export default musicianSlice.reducer;