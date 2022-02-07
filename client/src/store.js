import {configureStore} from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import logosReducer from './reducers/logosReducer';

export default configureStore({
  reducer: {
    user: userReducer,
    logos: logosReducer,
  }
})