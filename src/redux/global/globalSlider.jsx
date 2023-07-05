import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    currentComponent: 'dashboard',
  };

const slice = createSlice({
    name: 'global',
    initialState,
    reducers: {
      setCurrentComponent: (state, action) => {
        state.currentComponent = action.payload;
      },
    },
});

export const { setCurrentComponent } = slice.actions;
export default slice.reducer;

  