import {combineReducers} from '@reduxjs/toolkit'
import plan from './planSlice'
import post from './postSlice'
import billing from './billingSlice'
import filter from './filterSlice'
import postDialog from './postDialogSlice'
import checkDialog from './checkDialog'
import connDialog from './connectDialogSlice'
import connections from './connectionSlice'

const reducer = combineReducers({
  plan,
  post,
  billing,
  filter,
  postDialog,
  checkDialog,
  connDialog,
  connections,
})

export default reducer
