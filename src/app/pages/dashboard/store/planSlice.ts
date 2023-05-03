import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "src/app/modules/auth/core/_requests";

export interface IState {
  id: number
  State: string
  Description: string
  id_plan_region: number
}
const initialState = {};

export const getStates = createAsyncThunk('dashboard/account/getState', async () => {
    
    const { data } = await axios.get(`${API_URL}/get_state`)
    return data;
});

const planSlice = createSlice({
  name: 'Account',
  initialState,
  reducers: {
    // userLoggedOut: (state, action: PayloadAction<void>) => initialState,
  },
  extraReducers: (builder) => {
    // [getStates.fulfilled]: (state, action) => action.payload,
    // [updateUserShortcuts.fulfilled]: (state, action) => action.payload,
    builder.addCase(getStates.fulfilled, (state, action) => {
      return {...state,state:[...action.payload]};
    });
  },
});

// export const { userLoggedOut } = userSlice.actions;

// export const selectUser = ({ user }: RootState) => user;

// export const selectUserShortcuts = ({ user }: RootState) => user.data?.shortcuts;

export default planSlice.reducer;