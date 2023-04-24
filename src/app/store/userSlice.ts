/* eslint import/no-extraneous-dependencies: off */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import history from '../modules/@history';
import _ from '../modules/@lodash';
// import { setInitialSettings } from 'app/store/fuse/settingsSlice';
// import { showMessage } from 'app/store/fuse/messageSlice';
// import settingsConfig from 'app/configs/settingsConfig';
// import jwtService from '../auth/services/jwtService';

export interface UserState {
  email: string
  first_name: string
  last_name: string
  avatar: string
  non_profit_name?: string
  id: number
}
export interface IAuthState {
  user: UserState,
  access_token?:string|null
}

const initialState: IAuthState = {
  user:{
    email: '',
    first_name: '',
    last_name: '',
    avatar: '',
    non_profit_name: '',
    id: 0,
  },
  access_token: sessionStorage.getItem('access_token')
};

export const setUser = createAsyncThunk('user/setUser', async (user: IAuthState, { dispatch, getState }) => {
  /*
    You can redirect the logged-in user to a specific route depending on his role
    */
  // if (user.loginRedirectUrl) {
  //   settingsConfig.loginRedirectUrl = user.loginRedirectUrl; // for example 'apps/academy'
  // }

  return user;
});

// export const updateUserSettings = createAsyncThunk(
//   'user/updateSettings',
//   async (settings, { dispatch, getState }) => {
//     const { user } = getState();
//     const newUser = _.merge({}, user, { data: { settings } });

//     dispatch(updateUserData(newUser));

//     return newUser;
//   }
// );

// export const updateUserShortcuts = createAsyncThunk(
//   'user/updateShortucts',
//   async (shortcuts, { dispatch, getState }) => {
//     const { user } = getState();
//     const newUser = {
//       ...user,
//       data: {
//         ...user.data,
//         shortcuts,
//       },
//     };

//     dispatch(updateUserData(newUser));

//     return newUser;
//   }
// );

// export const logoutUser = () => async (dispatch: any, getState: () => RootState) => {
//   const { user } = getState();

//   if (!user.role || user.role.length === 0) {
//     // is guest
//     return null;
//   }

//   history.push({
//     pathname: '/',
//   });

//   // dispatch(setInitialSettings());

//   return dispatch(userLoggedOut());
// };

// export const updateUserData = (user) => async (dispatch, getState) => {
//   if (!user.role || user.role.length === 0) {
//     // is guest
//     return;
//   }

//   jwtService
//     .updateUserData(user)
//     .then(() => {
//       dispatch(showMessage({ message: 'User data saved with api' }));
//     })
//     .catch((error) => {
//       dispatch(showMessage({ message: error.message }));
//     });
// };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLoggedOut: (state, action: PayloadAction<void>) => initialState,
  },
  extraReducers: (builder) => {
    // [updateUserSettings.fulfilled]: (state, action) => action.payload,
    // [updateUserShortcuts.fulfilled]: (state, action) => action.payload,
    builder.addCase(setUser.fulfilled, (state, action) => {
      return {...initialState, ...action.payload};
    });
  },
});

export const { userLoggedOut } = userSlice.actions;

// export const selectUser = ({ user }: RootState) => user;

// export const selectUserShortcuts = ({ user }: RootState) => user.data?.shortcuts;

export default userSlice.reducer;
