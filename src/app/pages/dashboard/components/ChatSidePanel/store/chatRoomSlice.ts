import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import _ from 'src/app/modules/@lodash/@lodash'
import {API_URL} from 'src/app/modules/auth/core/_requests'
import {showMessage} from 'src/app/store/fuse/messageSlice'

export interface IMessage {
  message?: string
  receiver: number
}
const initialState: any = {
  chatRooms: [],
  selectedChatRoom: null,
  filteredChannels: [],
  chatRoomInfo: {},
  onlineUsers: [],
}

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

export const getFilteredChannels = createAsyncThunk(
  'dashboard/chat/getFilteredChannels',
  async (searchText: string, {getState, dispatch}) => {
    const {chat}: any = getState()
    const channelIds = chat.chatRoom.chatRooms.map((channel: any) => channel.id)

    const res = await axios.get(
      `${API_URL}/getFilteredChannels?searchText=${searchText}&channelIds=${channelIds}`
    )

    return res.data
  }
)

export const selectChatRoom = createAsyncThunk(
  'dashboard/chat/selectChatRoom',
  async (data: any, {getState, dispatch}) => {
    console.log('selectChatRoom==', data)
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
        foundChannel.updated_at = action.payload.updated_at
        if (state.selectedChatRoom !== action.payload.channel_id) {
          foundChannel.unread_count += 1
        }
      }
    },
    addUnreadMessage: (state, action) => {
      let {channel_id} = action.payload.message
      let {id} = action.payload.receiver
      state.total_unread_count += 1
      // console.log('state==', state, id, message)
      const foundChannel = _.find(state.chatRooms, {id: channel_id})
      console.log('f===', foundChannel)

      if (foundChannel) {
        foundChannel.updated_at = action.payload.updated_at
        //   //   // foundChannel.last_message = action.payload.message
        //   //   state.total_unread_count += 1
        // } else {
        //   getChatRooms(id)
      }
    },
    readMarkMessage: (state, action) => {
      const foundChannel = _.find(state.chatRooms, {id: action.payload.channel_id})
      let read_count = foundChannel.unread_count
      let total = state.total_unread_count - read_count
      state.total_unread_count = total < 0 ? 0 : total
      if (foundChannel) {
        foundChannel.unread_count = 0
      }
    },
    deselectChatRoom: (state) => {
      state.selectedChatRoom = null
      state.chatRoomInfo = {}
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
        let chatRooms = action.payload
        state.chatRooms = chatRooms
        let total_unread_count = 0
        _.map(chatRooms, (e: any, index: number) => {
          total_unread_count += e.unread_count
        })
        state.total_unread_count = total_unread_count
      })
      .addCase(selectChatRoom.fulfilled, (state, action: any) => {
        // Update the selectedChatRoom with the received data
        state.selectedChatRoom = action.payload.channel_id
        state.chatRoomInfo = action.payload.info
        // state.selectedChatRoom.messages = action.payload.messages
      })
      .addCase(getFilteredChannels.fulfilled, (state, action) => {
        state.filteredChannels = action.payload
      })
  },
})
export const {
  addOnlineUser,
  removeOnlineUser,
  addLastMessage,
  readMarkMessage,
  deselectChatRoom,
  addUnreadMessage,
} = chatRoomSlice.actions

export default chatRoomSlice.reducer
