import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "src/app/modules/auth/core/_requests";
import { setUser } from "src/app/store/userSlice";

export const updateProfile = createAsyncThunk('dashboard/account/updateProfile', async (data: any,{dispatch,getState}) => {
    
    try {
        const formData = new FormData();
        Object.keys(data).map((item) => {
            if ( data[item] == 'null') {
                data[item]=''
            }
            formData.append(item, data[item]);
        })
        const response = await axios.post(`${API_URL}/account/update`, formData);
        console.log('data==', response.data);
        const temp = { ...response.data, ...response.data.account }
        delete temp.account;
        console.log('data==', temp);
        dispatch(setUser({ user: temp }));
        return temp;
    } catch (error:any) {
        console.log('error==',error.response)
    }
    // const data = await reqponse.data
})