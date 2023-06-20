import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import {API_URL} from 'src/app/modules/auth/core/_requests'

export interface IMessage {
  message: string
  receiver: number
}
const initialState: any = []

export const createChatRoom = createAsyncThunk(
  'dashboard/chat/createChatRoom',
  async (data: IMessage, {getState, dispatch}) => {
    const res = await axios.post(`${API_URL}/directMessage`, data)
    console.log('message===', res)

    return res.data
  }
)
export const getChatRooms = createAsyncThunk(
  'dashboard/chat/getChatRooms',
  async (id: number, {getState, dispatch}) => {
    const res = await axios.get(`${API_URL}/getChatRooms/${id}`)
    // console.log('message===', res)

    return res.data
  }
)

const chatRoomSlice = createSlice({
  name: 'chatRoom',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createChatRoom.fulfilled, (state: any, action) => {
        return [...state, action.payload]
      })
      .addCase(getChatRooms.fulfilled, (state: any, action) => {
        return action.payload
      })
  },
})

export default chatRoomSlice.reducer
