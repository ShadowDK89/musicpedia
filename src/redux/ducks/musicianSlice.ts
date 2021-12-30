import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TMusicianData } from "../../Models/TMusicianData";

type MusicianDataSlice = {
  musicianData: TMusicianData;
};

const initialState: MusicianDataSlice = {
  musicianData: {
    id: "",
    name: "",
    genres: [],
    origin: [],
    shortDesc: "",
    yearsActive: "",
    imgBanner: "",
    imgMusician: "",
    members: [],
    discography: [],
    longDesc: {
      articleSections: [],
    },
    asociatedActs: [],
  },
};

const musicianSlice = createSlice({
  name: "musicianData",
  initialState: initialState,
  reducers: {
    setMusicianData(state, action: PayloadAction<TMusicianData>) {
      return {
        ...state,
        musicianData: action.payload,
      };
    },
  },
});

export const { setMusicianData } = musicianSlice.actions;

export default musicianSlice.reducer;
