import {combineReducers} from '@reduxjs/toolkit'
import chatRoom from './chatRoomSlice'
const reducer = combineReducers({
  chatRoom,
})

export default reducer
