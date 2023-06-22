import {PayloadAction, createSlice} from '@reduxjs/toolkit'

export type IConnDialog = {
  open: boolean
  info: any
}

const initialState: IConnDialog = {
  open: false,
  info: {},
}

export const connectDialogSlice = createSlice({
  name: 'connDialog',
  initialState,
  reducers: {
    openConnDialog: (state, action: PayloadAction<IConnDialog>) => {
      Object.assign(state, action.payload)
    },
    closeConnDialog: () => initialState,
  },
})

export const {openConnDialog, closeConnDialog} = connectDialogSlice.actions
export default connectDialogSlice.reducer
