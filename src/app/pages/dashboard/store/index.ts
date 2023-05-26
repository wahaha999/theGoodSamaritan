import { combineReducers } from '@reduxjs/toolkit';
import plan from './planSlice';
import post from './postSlice'
import billing from './billingSlice';
import filter from './filterSlice'

const reducer = combineReducers({
  plan,
  post,
  billing,
  filter
});

export default reducer;