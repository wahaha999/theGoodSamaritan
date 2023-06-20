import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {API_URL} from 'src/app/modules/auth/core/_requests'

export interface IMessage {
  message: string
  receiver: number
}

const initialState: IMessage = {
  message: '',
  receiver: NaN,
}

export const directMessage = createAsyncThunk(
  'dashboard/chat/directMessage',
  async (data: IMessage, {getState, dispatch}) => {
    const res = await axios.post(`${API_URL}/directMessage`, data)
    console.log('message===', res)
    // const {data} = await getUserByToken()
    // const temp = {...data.user}
    // delete temp.account
    // if (temp.email) {
    //   dispatch(setUser({user: temp, states: data.states}))
    // }
    // return res.data
  }
)

export const sendMessage = createAsyncThunk(
  'dashboard/chat/sendMessage',
  async (data: any, {getState, dispatch}) => {
    const res = await axios.post(`${API_URL}/messages`, data)
    console.log('message===', res)
  }
)

export const dmSelect = createAsyncThunk(
  'dashboard/chat/dmselect',
  async (data: any, {getState, dispatch}) => {
    const {channel_id} = data
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
