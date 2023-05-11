import { combineReducers } from '@reduxjs/toolkit';
import plan from './planSlice';
import post from './postSlice'


const reducer = combineReducers({
  plan,
  post
});

export default reducer;