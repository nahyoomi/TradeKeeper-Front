import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentComponent: 'dashboard',
    user: {},
  };

const slice = createSlice({
    name: 'global',
    initialState,
    reducers: {
      setCurrentComponent: (state, action) => {
        state.currentComponent = action.payload;
      },
      setUser:(state, action) => {
        state.user = action.payload;
      }
    },
});

export const { setCurrentComponent, setUser } = slice.actions;
export default slice.reducer;

