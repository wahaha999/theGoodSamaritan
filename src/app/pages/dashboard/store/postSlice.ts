import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "src/app/modules/auth/core/_requests";
import { showMessage } from "src/app/store/fuse/messageSlice";
import { setLoading } from "./filterSlice";

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
                        if (item == "keyword") {
                            formData.append('keyword',JSON.stringify(post['keyword']))
                            
                        } else {
                            
                            formData.append(item, post[item]);
                        }
                        
                    }
                    
                }
                
            }
        })
        const { data } = await axios.post(`${API_URL}/post/create`,formData)
        const state = getState() as any;
        dispatch(getPosts(state?.post?.filter?.filter));
        dispatch(showMessage({ message: 'Successful posted', variant: 'success' }))
        // return data;
    } catch (error:any) {
        dispatch(showMessage({message:error.response.data.message,variant:'error'}))
    }
});

export const getPosts = createAsyncThunk('dashboard/post/get', async (searchFilter:any, { getState, dispatch }) => {
    try {
        dispatch(setLoading(true));
        const { data } = await axios.get(`${API_URL}/post/get`,{params:{...searchFilter}});
        dispatch(setLoading(false));
        return data;
        
    } catch (error) {
        
    }
})
export const deletePost = createAsyncThunk('dashboard/post/delete', async (id:number, { getState, dispatch }) => {
    try {
        const { data } = await axios.delete(`${API_URL}/post/delete/${id}`);  
        const { post } = getState() as any;
        
        dispatch(getPosts(post?.filter?.filter));
        dispatch(showMessage({ message: 'Successfully deleted' ,variant:'success'}))
        // return data;
        
    } catch (error:any) {
        dispatch(showMessage({message:error.response.data.message,variant:'error'}))
    }
})

export const createComment = createAsyncThunk('dashboard/comments/create', async (comment: any,{getState,dispatch}) => {
     const formData = new FormData();
    try {
        Object.keys(comment).map((item, index) => {
            if (item == 'images' && comment['images']) {
                (comment['images'] as Array<any>).forEach((item: any, index: number) => {
                    if (typeof item !== 'string') {
                        formData.append(`files[${index}]`, item);
                    } else {
                        formData.append(`images[${index}]`, item);
                    }
                })
            } else {
                            
                formData.append(item, comment[item]);
                       
            }
                
        })
        const { data } = await axios.post(`${API_URL}/comments/create`, formData);
                const state = getState() as any;
        console.log("🚀 ~ file: postSlice.ts:110 ~ createComment ~ data:", data)
        dispatch(getPosts(state?.post?.filter?.filter));
        dispatch(showMessage({ message: 'Successful comment', variant: 'success' }))

    } catch (error: any) {
                dispatch(showMessage({message:error.response.data.message,variant:'error'}))

    }
})


export const deleteComment = createAsyncThunk('dashboard/comments/delete', async (id:number, { getState, dispatch }) => {
    try {
        const { data } = await axios.delete(`${API_URL}/comments/delete/${id}`);  
        const { post } = getState() as any;
        
        dispatch(getPosts(post?.filter?.filter));
        dispatch(showMessage({ message: 'Successfully deleted' ,variant:'success'}))
        // return data;
        
    } catch (error:any) {
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
        return action.payload;
    })
        .addCase(createPost.fulfilled, (state: any, action) => {
      return action.payload;
    });
  },
});

// export const { userLoggedOut } = userSlice.actions;

// export const selectUser = ({ user }: RootState) => user;

// export const selectUserShortcuts = ({ user }: RootState) => user.data?.shortcuts;

export default postSlice.reducer;