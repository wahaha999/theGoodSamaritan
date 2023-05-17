import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "src/app/modules/auth/core/_requests";
import { showMessage } from "src/app/store/fuse/messageSlice";

export interface IPostData {
    title: string
    category: Array<any>
    purpose: number
    event_name?: string
    content?: string
    images?: Array<any>
    start?: string
    end?:string
    timezone?: string
}
const initialState:any = [];

export const createPost = createAsyncThunk('dashboard/post/create', async (post: any, { getState, dispatch }) => {
    console.log("🚀 ~ file: postSlice.ts:20 ~ createPost ~ post:", post)
    const formData = new FormData();
    try {
        Object.keys(post).map((item, index) => {
            if (item == 'images' && post['images']) {
                (post['images'] as Array<any>).forEach((item: any, index: number) => {
                    if (typeof item !== 'string') {
                        formData.append(`files[${index}]`, item);
                    }else{
                        formData.append(`images[${index}]`, item);
                    }
                })
            } else {
                if (item == "location") {
                    formData.append('lat',post['location'].lat)
                    formData.append('lng',post['location'].lng)
                } else {
                    if (item == "category") {
                        formData.append('category',JSON.stringify(post['category']))
                    } else {
                        
                        formData.append(item, post[item]);
                    }
                    
                }
                
            }
        })
        const { data } = await axios.post(`${API_URL}/post/create`,formData)
        dispatch(getPosts());
        dispatch(showMessage({ message: 'Successful posted' ,variant:'success'}))
        // return data;
    } catch (error:any) {
        console.log("🚀 ~ file: postSlice.ts:26 ~ createPost ~ error:", error)
        dispatch(showMessage({message:error.response.data.message,variant:'error'}))
    }
});

export const getPosts = createAsyncThunk('dashboard/post/get', async (_, { getState, dispatch }) => {
    try {
        
        const { data } = await axios.get(`${API_URL}/post/get`);
        // console.log("🚀 ~ file: postSlice.ts:48 ~ getPosts ~ data:", data);
        return data;
        
    } catch (error) {
        
    }
})
export const deletePost = createAsyncThunk('dashboard/post/delete', async (id:number, { getState, dispatch }) => {
    try {
        
        const { data } = await axios.delete(`${API_URL}/post/delete/${id}`);
        
        // console.log("🚀 ~ file: postSlice.ts:48 ~ getPosts ~ data:", data);
        dispatch(getPosts());
        dispatch(showMessage({ message: 'Successfully deleted' ,variant:'success'}))
        // return data;
        
    } catch (error:any) {
        console.log('error==',error)
        dispatch(showMessage({message:error.response.data.message,variant:'error'}))
    }
})


const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    // userLoggedOut: (state, action: PayloadAction<void>) => initialState,
  },
    extraReducers: (builder) => {
        
    // [getStates.fulfilled]: (state, action) => action.payload,
    // [updateUserShortcuts.fulfilled]: (state, action) => action.payload,
    builder.addCase(getPosts.fulfilled, (state:any, action) => {
        // console.log('action==', state)
        // state.post = action.payload;
        return action.payload;
    })
        .addCase(createPost.fulfilled, (state: any, action) => {
        console.log('action1==',state)
      return action.payload;
    });
  },
});

// export const { userLoggedOut } = userSlice.actions;

// export const selectUser = ({ user }: RootState) => user;

// export const selectUserShortcuts = ({ user }: RootState) => user.data?.shortcuts;

export default postSlice.reducer;