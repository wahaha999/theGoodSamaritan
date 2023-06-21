import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import {API_URL} from 'src/app/modules/auth/core/_requests'

export interface IMessage {
  message: string
  receiver: number
}
const initialState: any = {chatRooms: [], selectedChatRoom: null}

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

export const selectChatRoom = createAsyncThunk(
  'dashboard/chat/selectChatRoom',
  async (channel_id: number, {getState, dispatch}) => {
    // console.log('res==', res.data)
    return {channel_id}
    // return res.data
  }
)

const chatRoomSlice = createSlice({
  name: 'chatRoom',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createChatRoom.fulfilled, (state, action) => {
        // Update the chatRooms array by adding the new chat room
        state.chatRooms.push(action.payload)
      })
      .addCase(getChatRooms.fulfilled, (state, action) => {
        // Replace the existing chatRooms array with the received chat rooms
        state.chatRooms = action.payload
      })
      .addCase(selectChatRoom.fulfilled, (state, action: any) => {
        // Update the selectedChatRoom with the received data
        state.selectedChatRoom = action.payload.channel_id
        // state.selectedChatRoom.messages = action.payload.messages
      })
  },
})

export default chatRoomSlice.reducer
