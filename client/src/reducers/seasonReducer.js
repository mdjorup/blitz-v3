import { createSlice } from "@reduxjs/toolkit";
import {API_KEY} from '../admin.js'
import axios from 'axios';

export const seasonSlice = createSlice({
  name: 'season',
  initialState: {
    year: '2021',
    type: 'REG',
    week: '1',

  },
  reducers: {
    setCurrentYear: (state, action) => {
      state.year = action.payload
    },
    setCurrentType: (state, action) => {
      state.type = action.payload
    },
    setCurrentWeek: (state, action) => {
      state.week = action.payload
    },
    

  }
})

export const {setCurrentType, setCurrentWeek, setCurrentYear} = seasonSlice.actions

export default seasonSlice.reducer