import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TReference, TSources } from "../../Models/TSources";

export type SourcesDataSlice = {
  id: string;
  sources: TReference[];
};

const initialState: SourcesDataSlice = {
  id: "",
  sources: [],
};

const sourcesSlice = createSlice({
  name: "referenceData",
  initialState: initialState,
  reducers: {
    setReferencesData(state, action: PayloadAction<TSources>) {
      return {
        ...state,
        id: action.payload.id,
        sources: action.payload.refs,
      };
    },
  },
});

export const { setReferencesData } = sourcesSlice.actions;

export default sourcesSlice.reducer;
