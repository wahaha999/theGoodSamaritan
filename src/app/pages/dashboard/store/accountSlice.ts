import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "src/app/modules/auth/core/_requests";
import { showMessage } from "src/app/store/fuse/messageSlice";
import { setUser } from "src/app/store/userSlice";

export const updateProfile = createAsyncThunk('dashboard/account/updateProfile', async (data: any,{dispatch,getState}) => {
    
    try {
        const formData = new FormData();
        Object.keys(data).map((item) => {
            if ( item=="doc") {
                data['doc'].forEach((item:any, index:number) => {
                    if (typeof item !== 'string') {
                        formData.append(`files[${index}]`, item.file);
                    }else{
                        formData.append(`docs[${index}]`, item);
                    }
                });
            } else {
                
                formData.append(item, data[item]);
            }
        })
        const response = await axios.post(`${API_URL}/account/update`, formData);
        const temp = { ...response.data}
        // delete temp.account;
        dispatch(setUser({ user: temp }));
        return temp;
    } catch (error:any) {
        console.log('error==',error.response)
    }
    // const data = await reqponse.data
})

export const updateUser = createAsyncThunk('dashboard/user/updateUser', async (data: any, { dispatch, getState }) => {
    try {
        const formData = new FormData();
        Object.keys(data).map((item) => {
             if ( data[item] == undefined) {
                data[item]=''
            }
            formData.append(item, data[item]);
        });
        const response = await axios.post(`${API_URL}/users/update`, formData);
        const temp = { ...response.data };
        // console.log("🚀 ~ file: accountSlice.ts:35 ~ updateUser ~ temp:", temp)
        dispatch(setUser({ user: temp }));
        return temp;
    } catch (error) {
        dispatch(showMessage({message: 'Something wrong', variant: 'error'}))
    }
})