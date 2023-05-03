import { combineReducers } from '@reduxjs/toolkit';
import plan from './planSlice';


const reducer = combineReducers({
  plan
});

export default reducer;