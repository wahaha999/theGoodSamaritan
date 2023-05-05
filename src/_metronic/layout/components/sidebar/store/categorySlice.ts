import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "src/app/modules/auth/core/_requests";
import { showMessage } from "src/app/store/fuse/messageSlice";

export const getCategories = createAsyncThunk('sidebar/category/getCategory', async (_,{dispatch,getState}) => {
    try {
        const {data} = await axios.get(`${API_URL}/category/get`);
        return data;
    } catch (error: any) {
        dispatch(showMessage({message:'something is wrong for category', variant:'error'}))
    }
})

const initialState:any = [];

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    // userLoggedOut: (state, action: PayloadAction<void>) => initialState,
  },
  extraReducers: (builder) => {
        builder
            .addCase(getCategories.fulfilled, (state: any, action: any) => {
                return action.payload;
            });
        // [updateUserShortcuts.fulfilled]: (state, action) => action.payload,
        // builder.addCase(getStates.fulfilled, (state, action) => {
        //   return {...state,state:[...action.payload]};
        // });
    },
});

export default categorySlice.reducer