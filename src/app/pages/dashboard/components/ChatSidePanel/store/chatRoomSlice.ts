import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import _ from 'src/app/modules/@lodash/@lodash'
import {API_URL} from 'src/app/modules/auth/core/_requests'
import {showMessage} from 'src/app/store/fuse/messageSlice'

export interface IMessage {
  message: string
  receiver: number
}
const initialState: any = {chatRooms: [], selectedChatRoom: null, chatRoomInfo: {}, onlineUsers: []}

export const createChatRoom = createAsyncThunk(
  'dashboard/chat/createChatRoom',
  async (data: IMessage, {getState, dispatch}) => {
    const res = await axios.post(`${API_URL}/directMessage`, data)
    if (res.data.message) {
      dispatch(showMessage({message: res.data.message}))
    } else {
      dispatch(showMessage({message: 'Something is wrong'}))
    }
    return res.data.channel
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
  async (data: any, {getState, dispatch}) => {
    // console.log('res==', res.data)
    return data
    // return res.data
  }
)

const chatRoomSlice = createSlice({
  name: 'chatRoom',
  initialState,
  reducers: {
    addOnlineUser: (state, action) => {
      let users = [...state.onlineUsers, ...action.payload]
      state.onlineUsers = _.union(users)
    },
    removeOnlineUser: (state, action) => {
      state.onlineUsers = _.filter(state.onlineUsers, (e: any) => e !== action.payload)
    },
    addLastMessage: (state, action) => {
      const foundChannel = _.find(state.chatRooms, {id: action.payload.channel_id})

      if (foundChannel) {
        foundChannel.last_message = action.payload.message
      }
    },
    readMarkMessage: (state, action) => {
      const foundChannel = _.find(state.chatRooms, {id: action.payload.channel_id})
      if (foundChannel) {
        foundChannel.unread_count = 0
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createChatRoom.fulfilled, (state, action) => {
        let find = _.find(state.chatRooms, {id: action.payload.id})
        if (find) {
          state.chatRooms = state.chatRooms
        } else {
          let chatRooms = [...state.chatRooms, action.payload]

          // Update the chatRooms array by adding the new chat room
          state.chatRooms = _.union(chatRooms)
        }
      })
      .addCase(getChatRooms.fulfilled, (state, action) => {
        // Replace the existing chatRooms array with the received chat rooms
        state.chatRooms = action.payload
      })
      .addCase(selectChatRoom.fulfilled, (state, action: any) => {
        // Update the selectedChatRoom with the received data
        state.selectedChatRoom = action.payload.channel_id
        state.chatRoomInfo = action.payload.info
        // state.selectedChatRoom.messages = action.payload.messages
      })
  },
})
export const {addOnlineUser, removeOnlineUser, addLastMessage, readMarkMessage} =
  chatRoomSlice.actions

export default chatRoomSlice.reducer
