import { createSlice } from "@reduxjs/toolkit";

export const logosSlice = createSlice({
  name: 'logos',
  initialState: {
    data: null,
  },
  reducers: {
    setLogos: (state, action) => {
      state.data = action.payload;
    }

  }
})

export const {setLogos} = logosSlice.actions

export default logosSlice.reducer

