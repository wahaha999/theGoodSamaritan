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
      let updatedPostOption
      if (action.payload.postOption) {
        if (
          action.payload.postType.includes('comment') ||
          action.payload.postType.includes('reply')
        ) {
          updatedPostOption = {
            ...action.payload.postOption,

            // category:action.payload.postOption.category ? JSON.parse(action.payload.postOption.category):[],
            images:
              typeof action.payload.postOption.images === 'string'
                ? JSON.parse(action.payload.postOption.images)
                : action.payload.postOption.images,
            // keyword:JSON.parse(action.payload.postOption.keyword),
          }
        } else {
          updatedPostOption = {
            ...action.payload.postOption,

            category: action.payload.postOption.category
              ? JSON.parse(action.payload.postOption.category)
              : [],
            images:
              typeof action.payload.postOption.images === 'string'
                ? JSON.parse(action.payload.postOption.images)
                : action.payload.postOption.images,
            keyword: JSON.parse(action.payload.postOption.keyword),
          }
        }

        action.payload.postOption = updatedPostOption
      }
      Object.assign(state, action.payload)
    },
    closePostDialog: () => initialState,
  },
})

export const {openPostDialog, closePostDialog} = postDialogSlice.actions
export default postDialogSlice.reducer
