import {combineReducers} from '@reduxjs/toolkit'
import plan from './planSlice'
import post from './postSlice'
import billing from './billingSlice'
import filter from './filterSlice'
import postDialog from './postDialogSlice'
import checkDialog from './checkDialog'
import connDialog from './connectDialogSlice'
import connections from './connectionSlice'
import reportDialog from './reportDialogSlice'

const reducer = combineReducers({
  plan,
  post,
  billing,
  filter,
  postDialog,
  checkDialog,
  connDialog,
  connections,
  reportDialog,
})

export default reducer
