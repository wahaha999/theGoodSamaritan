import Echo from 'laravel-echo'
import axios from 'axios'
import {API_URL} from '../modules/auth/core/_requests'
import {useAppDispatch} from '../store/hook'
import {
  addOnlineUser,
  removeOnlineUser,
} from '../pages/dashboard/components/ChatSidePanel/store/chatRoomSlice'
import {createAsyncThunk} from '@reduxjs/toolkit'

declare global {
  interface Window {
    Pusher: any
    Echo: any
  }
}

export const echoInit = createAsyncThunk('dashboard/echoinit', (token: string, {dispatch}) => {
  // const dispatch = useAppDispatch()
  window.Pusher = require('pusher-js')

  window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.REACT_APP_MIX_PUSHER_APP_KEY || 'websocketkey',
    wsHost: process.env.REACT_APP_MIX_WS_HOST_URL||window.location.hostname,
    cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER || 'mt1',
    wsPort: 6001,
    wssPort: 443,
    disableStats: true,
    forceTLS: false,
    authEndpoint:
      process.env.REACT_APP_MIX_AUTH_ENDPOINT ||
      'https://apiportal.samaritanmarketplace.com/broadcasting/auth',
  })

  window.Echo.connector.options.auth.headers['Authorization'] = 'Bearer ' + token
  window.Echo.options.auth = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }

  window.Echo.join('chat')
    .here((users: any) => {
      let users_id: any = []
      for (let i = 0; i < users.length; i++) {
        const element = users[i]
        users_id.push(users[i].id)
      }

      dispatch(addOnlineUser(users_id))
    })
    .joining((user: any) => {
      const headersObj = {
        headers: {
          'Content-type': 'application/json',
        },
      }

      axios.get(`${API_URL}/online/${user.id}`, headersObj)
    })
    .leaving((user: any) => {
      const headersObj = {
        headers: {
          'Content-type': 'application/json',
        },
      }

      axios.get(`${API_URL}/offline/${user.id}`, headersObj)
    })
    .listen('UserOnline', (event: any) => {
      dispatch(addOnlineUser([Number(event.user.id)]))
    })
    .listen('UserOffline', (event: any) => {
      dispatch(removeOnlineUser(Number(event.user.id)))
    })
})
