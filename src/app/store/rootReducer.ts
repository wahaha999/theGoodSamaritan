import { combineReducers, Reducer } from '@reduxjs/toolkit';
import fuse from './fuse';
import user from './userSlice';

export type RootState = ReturnType<typeof createReducer>;

const createReducer = (asyncReducers?: {[key: string]: Reducer}): Reducer => (state, action) => {
  const combinedReducer = combineReducers({
    fuse,
    user,
    ...asyncReducers,
  });

  /*
  Reset the redux store when user logged out
   */

  return combinedReducer(state, action);
};

export default createReducer;
