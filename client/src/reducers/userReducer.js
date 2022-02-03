import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null
  },
  reducers: {
    clearUser: (state) => {
      console.log("clearuser reached")
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  }
})

export const {setUser, clearUser} = userSlice.actions

export default userSlice.reducer