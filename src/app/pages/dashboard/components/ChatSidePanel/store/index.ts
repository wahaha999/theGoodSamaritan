import {combineReducers} from '@reduxjs/toolkit'
import chatRoom from './chatRoomSlice'
import messages from './messageSlice'
const reducer = combineReducers({
  chatRoom,
  messages,
})

export default reducer
