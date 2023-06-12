import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "src/app/modules/auth/core/_requests";
import { showMessage } from "src/app/store/fuse/messageSlice";
import { setLoading } from "./filterSlice";
import _ from "src/app/modules/@lodash/@lodash";

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
        const comm = data.comment;
                const {post} = getState() as any;
        // dispatch(getPosts(state?.post?.filter?.filter));
        dispatch(showMessage({ message: 'Successful comment', variant: 'success' }))

        const updatedPosts = _.map(post.post, (p: any) => {
            if (p.id === comm.post_id) {
                if (p.comments) {
                    const updatedComments = _.map(p.comments, (c: any) => {
                        if (c.id === comm.id) {
                            return comm
                        } else {
                            return c
                        }
                    })

                     if (!_.some(updatedComments, { id: comm.id })) {
                                updatedComments.push(comm);
                        }
                    return {...p,comments:updatedComments,comments_count:p.comments_count+1}
                } else {
                    return {...p,comments: [comm],comments_count:p.comments_count+1}
                }
            } else {
                return p
            }
        })
        return updatedPosts;

    } catch (error: any) {
                dispatch(showMessage({message:error.response.data.message,variant:'error'}))

    }
})

export const createReply = createAsyncThunk('dashboard/replies/create', async (reply: any,{getState,dispatch}) => {
     const formData = new FormData();
    try {
        Object.keys(reply).map((item, index) => {
            if (item == 'images' && reply['images']) {
                (reply['images'] as Array<any>).forEach((item: any, index: number) => {
                    if (typeof item !== 'string') {
                        formData.append(`files[${index}]`, item);
                    } else {
                        formData.append(`images[${index}]`, item);
                    }
                })
            } else {
                            
                formData.append(item, reply[item]);
                       
            }
                
        })
        const { data } = await axios.post(`${API_URL}/replies/create`, formData);
        const rep = data.reply;
        const {post} = getState() as any;
        console.log("🚀 ~ file: postSlice.ts:141 ~ createReply ~ data:", rep)

        dispatch(showMessage({ message: 'Successful reply', variant: 'success' }))
        const updatedPosts = _.map(post.post, (p: any) => {
            if (p.comments) {
                const updatedComments = _.map(p.comments, (c: any) => {
                    if (c.id === rep.comment_id) {
                        if (c.replies) {
                            // Map over the replies, updating the one with the same id as rep.id
                            const updatedReplies = _.map(c.replies, (r: any) => {
                                if (r.id === rep.id) {
                                    return rep;
                                } else {
                                    return r;
                                }
                            });

                            // If the reply wasn't found in the list of replies, add it.
                            if (!_.some(updatedReplies, { id: rep.id })) {
                                updatedReplies.push(rep);
                            }

                            return {...c, replies: updatedReplies, replies_count: c.replies_count + 1};
                        } else {
                            return {...c, replies: [rep], replies_count: c.replies_count + 1};
                        }
                    } else {
                        return c;
                    }
                })
                return { ...p, comments: updatedComments }
            } 
            return p;
        })
        //  const updatedPosts = _.map(post.post, (p: any) => {
        //     if (p.comments) {
        //         const updatedComments = _.map(p.comments, (c: any) => {
        //             if (c.id === rep.comment_id) {
        //                 if (c.replies) {
        //                     return {...c,replies:[...c.replies,rep],replies_count:c.replies_count+1}
        //                 } else {
        //                     return {...c,replies:[rep],replies_count:c.replies_count+1}
        //                 }
        //             } else {
        //                 return c
        //             }
        //         })
        //         return { ...p, comments: updatedComments }
        //     } 
        //     return p;
        // })
        return updatedPosts;

        
        // dispatch(getPosts(state?.post?.filter?.filter));

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

export const deleteReply = createAsyncThunk('dashboard/replies/delete', async (id:number, { getState, dispatch }) => {
    try {
        const { data } = await axios.delete(`${API_URL}/replies/delete/${id}`);  
        const { post } = getState() as any;
        
        dispatch(getPosts(post?.filter?.filter));
        dispatch(showMessage({ message: 'Successfully deleted' ,variant:'success'}))
        // return data;
        
    } catch (error:any) {
        dispatch(showMessage({message:error.response.data.message,variant:'error'}))
    }
})


export const getCommentsByPostId = createAsyncThunk('dashboard/comments/getByPostId', async (post_id: number, { getState, dispatch }) => {
    try {
        dispatch(setLoading(true));
        const { data } = await axios.get(`${API_URL}/comments/get/${post_id}`);
        const { comments, comments_count } = data;
        const {post}:any = getState()
        const updatedPosts = _.map(post.post, (p:any) => p.id === post_id ? {...p, comments,comments_count} : p);
        dispatch(setLoading(false));
        return updatedPosts
    } catch (error:any) {
        dispatch(showMessage({message:error.response.data.message,variant:'error'}))
    }
})

export const getLatestCommentByPostId = createAsyncThunk('dashboard/comments/getLatestCommentByPostId',async (post_id: number, { getState, dispatch }) => {
    try {
        dispatch(setLoading(true));
        const { data } = await axios.get(`${API_URL}/comments/getLatest/${post_id}`);
        const { comment, comments_count } = data;
        const {post}:any = getState()
        const updatedPosts = _.map(post.post, (p:any) => p.id === post_id ? {...p, comments:[comment],comments_count} : p);
        dispatch(setLoading(false));
        return updatedPosts
    } catch (error:any) {
        dispatch(showMessage({message:error.response.data.message,variant:'error'}))
    }
})

export const getRepliesByCommentId = createAsyncThunk('dashboard/replies/getByCommentId', async (comment_id: number, { getState, dispatch }) => {
    try {
        dispatch(setLoading(true));
        const { data } = await axios.get(`${API_URL}/replies/get/${comment_id}`);
        const { replies, replies_count } = data;
        const {post}:any = getState()
         const updatedPosts = _.map(post.post, (p: any) => {
            if (p.comments) {
                const updatedComments = _.map(p.comments, (c: any) => c.id === comment_id ? { ...c, replies,replies_count } : c)
                return { ...p, comments: updatedComments }
            }
            return p;
        })
        dispatch(setLoading(false));
        return updatedPosts
    } catch (error:any) {
        dispatch(showMessage({message:error.response.data.message,variant:'error'}))
    }
})
export const getLatestRepliesByCommentId = createAsyncThunk('dashboard/replies/getLatestRepliesByCommentId', async (comment_id: number, { getState, dispatch }) => {
    try {
        dispatch(setLoading(true));
        const { data } = await axios.get(`${API_URL}/replies/getLatest/${comment_id}`);
        const { reply, replies_count } = data;
        const {post}:any = getState()
        
        const updatedPosts = _.map(post.post, (p: any) => {
            if (p.comments) {
                
                const updatedComments = _.map(p.comments, (c: any) => c.id === comment_id ? { ...c, replies:[reply],replies_count } : c)
                return { ...p, comments: updatedComments }
            }
            return p
        })
        dispatch(setLoading(false));
        return updatedPosts
    } catch (error:any) {
        dispatch(showMessage({message:error.response.data.message,variant:'error'}))
    }
})

export const createLike = createAsyncThunk('dashboard/createLike', async (data: any, { getState, dispatch }) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.post(`${API_URL}/like/create`, data);
        const { like } = response.data;
        const { post }: any = getState();
        

        dispatch(setLoading(false));
        console.log('response===', response);
    } catch (error) {
        console.log('error===', error);
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
        }).addCase(getCommentsByPostId.fulfilled, (state: any, action) => {
            return action.payload;
        }).addCase(getRepliesByCommentId.fulfilled, (state: any, action) => {
            return action.payload;
        }).addCase(createReply.fulfilled, (state: any, action) => action.payload)
        .addCase(getLatestCommentByPostId.fulfilled, (state: any, action) => {
        return action.payload
        }).addCase(getLatestRepliesByCommentId.fulfilled, (state: any, action) => {
            return action.payload
        }).addCase(createComment.fulfilled,(state:any,action) => action.payload);
  },
});

// export const { userLoggedOut } = userSlice.actions;

// export const selectUser = ({ user }: RootState) => user;

// export const selectUserShortcuts = ({ user }: RootState) => user.data?.shortcuts;

export default postSlice.reducer;