import {createSlice} from '@reduxjs/toolkit'

export interface IUploadDialog {
  progress: number
  open: boolean
}

const initialState: IUploadDialog = {
  progress: 0,
  open: false,
}

const uploadDialogSlice = createSlice({
  name: 'uploadDialog',
  initialState,
  reducers: {
    updateUploadProgress: (state, action) => {
      state.progress = action.payload
      state.open = true
    },
    initialUploadDialog: (state) => initialState,
  },
})

export const {updateUploadProgress, initialUploadDialog} = uploadDialogSlice.actions
export default uploadDialogSlice.reducer
