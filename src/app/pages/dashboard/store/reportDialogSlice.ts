import {PayloadAction, createSlice} from '@reduxjs/toolkit'

type IReportDialog = {
  open: boolean
  reported_user: any
}

const initialState: IReportDialog = {
  open: false,
  reported_user: null,
}

export const reportDialogSlice = createSlice({
  name: 'reportDialog',
  initialState,
  reducers: {
    openReportDialog: (state, action: PayloadAction<IReportDialog>) => {
      state.open = true
      state.reported_user = action.payload.reported_user
    },
    closeReportDialog: (state, action: PayloadAction) => {
      state.open = false
      state.reported_user = null
    },
  },
})

export const {openReportDialog, closeReportDialog} = reportDialogSlice.actions

export default reportDialogSlice.reducer
