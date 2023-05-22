import { combineReducers } from '@reduxjs/toolkit';
import plan from './planSlice';
import post from './postSlice'
import billing from './billingSlice';

const reducer = combineReducers({
  plan,
  post,
  billing
});

export default reducer;