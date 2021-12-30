import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TSearchResult } from "../../Models/TSearchResult";

type SearchResultSlice = {
  searchResult: TSearchResult[];
};

const initialState: SearchResultSlice = {
  searchResult: [],
};

const searchResultSlice = createSlice({
  name: "searchResult",
  initialState: initialState,
  reducers: {
    getSearchData(state) {
      return state;
    },
    setSearchData(state, action: PayloadAction<TSearchResult[]>) {
      return {
        ...state,
        searchResult: action.payload,
      };
    },
  },
});

export const { getSearchData, setSearchData } = searchResultSlice.actions;

export default searchResultSlice.reducer;
