import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import {API_URL} from 'src/app/modules/auth/core/_requests'
import {addLastMessage, readMarkMessage, selectChatRoom} from './chatRoomSlice'

export interface IMessage {
  message: string
  receiver: number
}

const initialState: any = {messages: [], typeEvent: null, searchText: '', searchMode: 1}

export const sendMessage = createAsyncThunk(
  'dashboard/chat/sendMessage',
  async (data: any, {getState, dispatch}) => {
    const res = await axios.post(`${API_URL}/messages`, data)
  }
)

export const dmSelect = createAsyncThunk(
  'dashboard/chat/dmselect',
  async (data: any, {getState, dispatch}: any) => {
    const {channel_id} = data
    const {selectedChatRoom} = getState().chat.chatRoom
    window.Echo.leave('chat.channel.5')
    if (selectedChatRoom) {
      window.Echo.leave(`chat.dm.${selectedChatRoom}`)
    } else {
      window.Echo.leave(`chat.dm.${channel_id}`)
    }
    dispatch(selectChatRoom(data))
    const res = await axios.get(`${API_URL}/getMessages/${channel_id}`)
    dispatch(getMessages(res.data))
    dispatch(readMarkMessage({channel_id}))
    window.Echo.join(`chat.dm.${channel_id}`)
      .here((users: any) => {})
      .joining((user: any) => {})
      .leaving((user: any) => {
        const message = {
          user: user,
          message: 'Left',
          status: true,
        }
        // if (selectedChannelInState.type === "channel") {
        //     dispatch({ type: ADD_MESSAGE, payload: message });
        // }
      })
      .listen('MessageSent', (event: any) => {
        const typingEvent = {
          user: event.user,
          type: 'typing',
        }
        // dispatch({type: REMOVE_TYPING_EVENT, payload: typingEvent})
        const message = {
          user: event.user,
          message: event.message.message,
        }
        dispatch(addMessage(event.message))
        dispatch(addLastMessage(event.message))
      })
      .listenForWhisper('typing', (event: any) => {
        let timer
        // const message = {
        //   user: event.name,
        //   type: 'typing',
        // }
        dispatch(addTypingEvent(event))

        clearTimeout(timer)

        timer = setTimeout(() => {
          dispatch(removeTypingEvent())
        }, 2000)
      })
  }
)

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    getMessages: (state, action) => {
      return {
        ...state,
        messages: action.payload,
      }
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload)
    },
    addTypingEvent: (state, action) => {
      state.typeEvent = {...action.payload}
    },
    removeTypingEvent: (state) => {
      state.typeEvent = null
    },
    removeMessage: (state, action) => {
      const index = state.messages.findIndex((msg: any) => msg.id === action.payload)
      state.messages.splice(index, 1)
    },
    removeMessages: (state) => {
      state.messages = []
    },
    handleSearch: (state, action) => {
      state.searchText = action.payload
    },
    handleSearchMode: (state, action) => {
      state.searchMode = action.payload
    },
  },
  // extraReducers(builder) {
  //   builder.addCase(dmSelect.fulfilled, (state, action) => {
  //     return state.messages = action.payload
  //   })
  // },
})

export const {
  getMessages,
  addMessage,
  addTypingEvent,
  removeTypingEvent,
  removeMessages,
  removeMessage,
  handleSearch,
  handleSearchMode,
} = messageSlice.actions

export default messageSlice.reducer
