import Echo from 'laravel-echo'
import axios from 'axios'
import {API_URL} from '../modules/auth/core/_requests'

declare global {
  interface Window {
    Pusher: any
    Echo: any
  }
}

export const echoInit = (token: string) => {
  window.Pusher = require('pusher-js')

  window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.REACT_APP_MIX_PUSHER_APP_KEY,
    wsHost: process.env.REACT_APP_MIX_WS_HOST_URL,
    cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
    wsPort: 6001,
    wssPort: 6001,
    disableStats: true,
    forceTLS: false,
    authEndpoint: process.env.REACT_APP_MIX_AUTH_ENDPOINT,
  })

  window.Echo.connector.options.auth.headers['Authorization'] = 'Bearer ' + token
  window.Echo.options.auth = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }

  console.log('echo==', window.Echo)
  window.Echo.join('chat')
    .here((users: any) => {
      console.log(' IN HERE INSIDE ECHOHELPERS CHAT')
      console.log('users==', users)
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

      console.log('IN LEAVING ')
      axios.get(`${API_URL}/offline/${user.id}`, headersObj)
    })
    .listen('UserOnline', (event: any) => {
      console.log(event.user.name + ' IS ONLINE ')
      console.log(event.user)
      //  store.dispatch({type: IS_ONLINE, payload: event.user.id})
    })
    .listen('UserOffline', (event: any) => {
      console.log(event.user.name + ' IS OFFLINE ')
      console.log(event.user)
      //  store.dispatch({type: IS_OFFLINE, payload: event.user.id})
    })
}
