import { combineReducers } from '@reduxjs/toolkit';
import dialog from './dialogSlice';
import message from './messageSlice';


const fuseReducers = combineReducers({
  // navigation,
  // settings,
  // navbar,
  message,
  dialog,
});

export default fuseReducers;
