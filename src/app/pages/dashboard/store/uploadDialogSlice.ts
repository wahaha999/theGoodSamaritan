import {createSlice} from '@reduxjs/toolkit'

export interface IUploadDialog {
  progress: number
  open: boolean
  fileSize: number
}

const initialState: IUploadDialog = {
  progress: 0,
  open: false,
  fileSize: 0,
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
    changeFileSize: (state, action) => {
      state.fileSize += action.payload
    },
  },
})

export const {updateUploadProgress, initialUploadDialog, changeFileSize} = uploadDialogSlice.actions
export default uploadDialogSlice.reducer
