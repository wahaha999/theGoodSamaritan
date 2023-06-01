import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface IPostDialog {
    open: boolean
    postType: 'new_post' | 'edit_post' | 'new_comment' | 'edit_comment',
    postOption?:object
}

const initialState:IPostDialog = {
    open: false,
    postType: 'new_post',
    postOption:{}
    
}

export const postDialogSlice = createSlice({
    name:'postDialog',
    initialState,
    reducers: {
        openPostDialog: (state, action: PayloadAction<IPostDialog>) => {
              Object.assign(state, action.payload);
        },
        closePostDialog: () => initialState
    }
})

export const { openPostDialog,closePostDialog } = postDialogSlice.actions;
export default postDialogSlice.reducer;