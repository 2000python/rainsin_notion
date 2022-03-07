/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  pathData: [{
    pathname: '/',
    search: '',
    state: null,
    title: ' 🧠 解忧杂货店',
}]
};

export const pathSlice = createSlice({
  name: 'path',
  initialState,
  reducers: {
    PUSH: (state,action) => {
      state.pathData = [...state.pathData,action.payload]
    },
  },
});

export const { PUSH } = pathSlice.actions;

export const selectCount = (state) => state.value;
export const selectPath = (state) => state.pathData;

export default pathSlice.reducer;
