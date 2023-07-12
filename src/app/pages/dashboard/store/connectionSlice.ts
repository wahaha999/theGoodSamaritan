import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import {API_URL} from 'src/app/modules/auth/core/_requests'
import {showMessage} from 'src/app/store/fuse/messageSlice'

const initialState: any = []

export const createConnection = createAsyncThunk(
  'dashboard/post/connection/create',
  async (receiver_id: number, {dispatch, getState}) => {
    const res = await axios.post(`${API_URL}/connection/create`, {receiver_id})
    if (res.data.status === 'success') {
      dispatch(showMessage({message: 'You requested connection successfully', variant: 'success'}))
      dispatch(getConnections())
    } else {
      dispatch(showMessage({message: 'Something wrong', variant: 'error'}))
    }
  }
)

export const getConnections = createAsyncThunk(
  'dashboard/post/connection/get',
  async (_, {dispatch, getState}) => {
    const res = await axios.get(`${API_URL}/connection/get`)
    return res.data
  }
)

export const updateConnection = createAsyncThunk(
  'dashboard/post/connection/update',
  async (data: any, {dispatch, getState}) => {
    const res = await axios.put(`${API_URL}/connection/update`, data)
    if (res.data.status === 'success') {
      dispatch(showMessage({message: 'Updated', variant: 'success'}))
      dispatch(getConnections())
    } else {
      dispatch(showMessage({message: 'Something wrong', variant: 'error'}))
    }
  }
)

const connectionSlice = createSlice({
  name: 'connections',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getConnections.fulfilled, (state, action) => action.payload)
  },
})

export default connectionSlice.reducer
