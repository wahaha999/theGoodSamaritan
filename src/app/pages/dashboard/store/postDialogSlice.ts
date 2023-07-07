import {PayloadAction, createSlice} from '@reduxjs/toolkit'


type PostDialogBase = {
  open: boolean
  postOption?: any
}

type NewOrEditPost = PostDialogBase & {
  postType: 'new_post' | 'edit_post' | 'edit_comment'
  postId?: never
}

type NewOrEditComment = PostDialogBase & {
  postType: 'new_comment'
  postId: number
}

type NewOrEditReply = PostDialogBase & {
  postType: 'new_reply' | 'edit_reply'
  postId?: number
}

export type IPostDialog = NewOrEditPost | NewOrEditComment | NewOrEditReply

const initialState: IPostDialog = {
  open: false,
  postType: 'new_post',
  postOption: {},
}

export const postDialogSlice = createSlice({
  name: 'postDialog',
  initialState,
  reducers: {
    openPostDialog: (state, action: PayloadAction<IPostDialog>) => {
      if (action.payload.postOption) {
        const updatedPostOption = {
          ...action.payload.postOption,
          category: JSON.parse(action.payload.postOption.category),
          images:JSON.parse(action.payload.postOption.images),
          keyword:JSON.parse(action.payload.postOption.keyword),
        };
        action.payload.postOption = updatedPostOption;
      }
      Object.assign(state, action.payload)
    },
    closePostDialog: () => initialState,
  },
})

export const {openPostDialog, closePostDialog} = postDialogSlice.actions
export default postDialogSlice.reducer
