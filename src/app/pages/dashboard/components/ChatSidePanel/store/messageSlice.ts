import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import {API_URL} from 'src/app/modules/auth/core/_requests'
import {selectChatRoom} from './chatRoomSlice'

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
  async (channel_id: number, {getState, dispatch}) => {
    window.Echo.leave('chat.channel.5')
    dispatch(selectChatRoom(channel_id))

    const res = await axios.get(`${API_URL}/getMessages/${channel_id}`)
    dispatch(getMessages(res.data))
    window.Echo.join(`chat.dm.${channel_id}`)
      .listen('MessageSent', (event: any) => {
        console.log('FROM DM USERS EVENT FUNCTION')
        console.log(event)
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
        // return [...messages, event.message]
        // dispatch({type: ADD_MESSAGE, payload: message})
      })
      .listenForWhisper('typing', (event: any) => {
        let timer
        console.log('TYPING')
        console.log(event.name)
        const message = {
          user: event.name,
          type: 'typing',
        }
        // dispatch({type: ADD_TYPING_EVENT, payload: message})

        clearTimeout(timer)

        timer = setTimeout(() => {
          //   dispatch({type: REMOVE_TYPING_EVENT, payload: message})
        }, 2000)
      })
  }
)

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    getMessages: (state, action) => {
      //   console.log('action===', action.payload)
      return action.payload
    },
    addMessage: (state, action) => {
      //   console.log('action===', action.payload)
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
