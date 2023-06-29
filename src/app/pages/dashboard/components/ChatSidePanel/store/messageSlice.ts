import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import {API_URL} from 'src/app/modules/auth/core/_requests'
import {addLastMessage, selectChatRoom} from './chatRoomSlice'

export interface IMessage {
  message: string
  receiver: number
}

const initialState: any = []

export const sendMessage = createAsyncThunk(
  'dashboard/chat/sendMessage',
  async (data: any, {getState, dispatch}) => {
    const res = await axios.post(`${API_URL}/messages`, data)
    console.log('message===', res)
  }
)

export const dmSelect = createAsyncThunk(
  'dashboard/chat/dmselect',
  async (data: any, {getState, dispatch}: any) => {
    const {channel_id} = data
    const {selectedChatRoom} = getState().chat.chatRoom
    window.Echo.leave('chat.channel.5')
    window.Echo.leave(`chat.dm.${selectedChatRoom}`)
    dispatch(selectChatRoom(data))

    const res = await axios.get(`${API_URL}/getMessages/${channel_id}`)
    dispatch(getMessages(res.data))
    window.Echo.join(`chat.dm.${channel_id}`)
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
        console.log('event==', event)
        dispatch(addMessage(event.message))
        dispatch(addLastMessage(event.message))
      })
      .listenForWhisper('typing', (event: any) => {
        let timer
        console.log('TYPING')
        console.log(event.name)
        const message = {
          user: event.name,
          type: 'typing',
        }

        clearTimeout(timer)

        timer = setTimeout(() => {
          // dispatch({type: REMOVE_TYPING_EVENT, payload: message});
        }, 2000)
      })
  }
)

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    getMessages: (state, action) => {
      return action.payload
    },
    addMessage: (state, action) => {
      state.push(action.payload)
    },
  },
  extraReducers(builder) {
    builder.addCase(dmSelect.fulfilled, (state, action) => {
      return action.payload
    })
  },
})

export const {getMessages, addMessage} = messageSlice.actions

export default messageSlice.reducer
