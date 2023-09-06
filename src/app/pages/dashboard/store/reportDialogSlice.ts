import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import {API_URL} from 'src/app/modules/auth/core/_requests'

type IReportDialog = {
  open: boolean
  reported_user: any
  reported_users?: Array<any>
}

const initialState: IReportDialog = {
  open: false,
  reported_user: null,
  reported_users: [],
}

export const getReportedUsers = createAsyncThunk(
  'account/profile/silence/get',
  async (_, {dispatch, getState}) => {
    const res = await axios.get(`${API_URL}/report/get`)
    return res.data
  }
)

export const deleteReportUser = createAsyncThunk(
  'account/profile/silence/delete',
  async (report_id: number, {dispatch, getState}) => {
    const res = await axios.delete(`${API_URL}/report/delete/${report_id}`)
    dispatch(getReportedUsers())
  }
)

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
  extraReducers(builder) {
    builder.addCase(getReportedUsers.fulfilled, (state, action) => {
      state.reported_users = action.payload
    })
  },
})

export const {openReportDialog, closeReportDialog} = reportDialogSlice.actions

export default reportDialogSlice.reducer
