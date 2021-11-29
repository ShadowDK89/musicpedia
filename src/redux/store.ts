import { ThunkAction, Action, combineReducers, configureStore } from '@reduxjs/toolkit';
import musicianSlice from '../redux/ducks/musicianSlice';


const reducer = combineReducers({
    musicianData: musicianSlice
  });

const store = configureStore({
    reducer
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