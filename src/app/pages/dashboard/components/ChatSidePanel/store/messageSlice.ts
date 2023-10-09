import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import {API_URL} from 'src/app/modules/auth/core/_requests'
import {addLastMessage, readMarkMessage, selectChatRoom} from './chatRoomSlice'

export interface IMessage {
  message: string
  receiver: number
}

const initialState: any = {
  messages: [],
  typeEvent: null,
  searchText: '',
  searchMode: 1,
  current_page: 1,
  loading_messages: false,
}

export const sendMessage = createAsyncThunk(
  'dashboard/chat/sendMessage',
  async (data: any, {getState, dispatch}) => {
    await axios.post(`${API_URL}/messages`, data)
  }
)

export const getPageMessages = createAsyncThunk(
  'dashboard/chat/getMessages',
  async (channel_id: any, {getState, dispatch}) => {
    dispatch(setLoading(true))
    const {chat} = getState() as any
    const {current_page} = chat.messages
    if (channel_id) {
      const res = await axios.get(`${API_URL}/getMessages/${channel_id}?page=${current_page + 1}`)
      dispatch(setLoading(false))

      dispatch(getMessages(res.data))
    } 
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
    dispatch(setLoading(true))

    const res = await axios.get(`${API_URL}/getMessages/${channel_id}`)
    dispatch(setLoading(false))

    dispatch(emptyMessage(1))
    dispatch(getMessages(res.data))
    dispatch(readMarkMessage({channel_id}))
    window.Echo.join(`chat.dm.${channel_id}`)
      .here((users: any) => {})
      .joining((user: any) => {})
      .leaving((user: any) => {
        // const message = {
        //   user: user,
        //   message: 'Left',
        //   status: true,
        // }
        // if (selectedChannelInState.type === "channel") {
        //     dispatch({ type: ADD_MESSAGE, payload: message });
        // }
      })
      .listen('MessageSent', (event: any) => {
        // const typingEvent = {
        //   user: event.user,
        //   type: 'typing',
        // }
        // dispatch({type: REMOVE_TYPING_EVENT, payload: typingEvent})
        // const message = {
        //   user: event.user,
        //   message: event.message.message,
        // }
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
    emptyMessage: (state, action) => {
      return {
        ...state,
        messages: [],
        current_page: 1,
      }
    },
    getMessages: (state, action) => {
      const allMessages = [...action.payload.data, ...state.messages]

      // Sort the messages by the 'created_at' timestamp in descending order
      const sortedMessages: any = allMessages.sort((a: any, b: any) => {
        const dateA = new Date(a.created_at) as any
        const dateB = new Date(b.created_at) as any
        return dateA - dateB // Descending order (most recent first)
      })

      return {
        ...state,
        messages: sortedMessages,
        loading_messages: false,
        current_page: action.payload.current_page,
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
    setLoading: (state, action) => {
      state.loading_messages = action.payload
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
  emptyMessage,
  setLoading,
} = messageSlice.actions

export default messageSlice.reducer
