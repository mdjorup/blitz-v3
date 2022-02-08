import {configureStore} from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import logosReducer from './reducers/logosReducer';
import seasonReducer from './reducers/seasonReducer';

export default configureStore({
  reducer: {
    user: userReducer,
    logos: logosReducer,
    season: seasonReducer,
  }
})