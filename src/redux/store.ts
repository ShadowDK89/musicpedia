import {
  ThunkAction,
  Action,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import musicianSlice from "../redux/ducks/musicianSlice";
import sourcesSlice from "../redux/ducks/referencesSlice";
import searchResultSlice from "../redux/ducks/searchResultSlice";

const reducer = combineReducers({
  musicianData: musicianSlice,
  sources: sourcesSlice,
  searchResult: searchResultSlice,
});

const store = configureStore({
  reducer,
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
