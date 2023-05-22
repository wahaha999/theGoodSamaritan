/* eslint import/no-extraneous-dependencies: off */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';
import history from '../modules/@history';

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
  id: number,
  account_dbkey?: number
  subscription?: string | null
  customer_id?: string
  city?: string
  fax_number?: string
  phone_number?: string
  mission?:string
  organize?:number
  state?: string
  status?: string
  address?: string
  doc?:string
  
}
export interface IAuthState {
  user: UserState,
  access_token?: string | null,
  states:object
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
  access_token: sessionStorage.getItem('access_token'),
  states:{}
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

export const logoutUser = createAsyncThunk('user/logout', async (_, { dispatch, getState }) => {
  
  // if (!user.role || user.role.length === 0) {
  //   // is guest
  //   return null;
  // }
  sessionStorage.removeItem('access_token');

  history.push({
    pathname: '/auth',
  });

  // dispatch(setInitialSettings());

  return dispatch(userLoggedOut());
})

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
      return {...state, ...action.payload,access_token: sessionStorage.getItem('access_token')};
    });
  },
});

export const { userLoggedOut } = userSlice.actions;

// export const selectUser = ({ user }: RootState) => user;

// export const selectUserShortcuts = ({ user }: RootState) => user.data?.shortcuts;

export default userSlice.reducer;
