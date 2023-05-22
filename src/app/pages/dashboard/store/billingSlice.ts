import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "src/app/modules/auth/core/_requests";

export const getBillingInfo = createAsyncThunk('dashboard/billing/getBillingInfo', async () => {
    
    const { data } = await axios.get(`${API_URL}/billing/get`)
    return data;
});
const initialState = {}

const billingSlice = createSlice({
    name: 'billing',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getBillingInfo.fulfilled, (state, action) => {
            return action.payload
        })
    },
})

export default billingSlice.reducer