import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentComponent: 'dashboard',
    token: '',
  };

const slice = createSlice({
    name: 'global',
    initialState,
    reducers: {
      setCurrentComponent: (state, action) => {
        state.currentComponent = action.payload;
      },
      setToken:(state, action) => {
        state.token = action.payload;
      }
    },
});


export const { setCurrentComponent, setToken } = slice.actions;
export default slice.reducer;

