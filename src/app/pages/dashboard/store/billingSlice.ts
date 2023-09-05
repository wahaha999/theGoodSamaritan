import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import {API_URL, getUserByToken} from 'src/app/modules/auth/core/_requests'
import {showMessage} from 'src/app/store/fuse/messageSlice'
import {setUser} from 'src/app/store/userSlice'

export const getBillingInfo = createAsyncThunk(
  'dashboard/billing/getBillingInfo',
  async (_, {getState, dispatch}) => {
    try {
      const res = await axios.get(`${API_URL}/billing/get`)
      const {data} = await getUserByToken()
      const temp = {...data.user}
      // delete temp.account
      if (temp.email) {
        dispatch(setUser({user: temp, states: data.states}))
      }
      return res.data
    } catch (error) {
      dispatch(
        showMessage({message: 'You seem to be offline. Please try again later.', variant: 'error'})
      )
    }
  }
)
const initialState = {}

const billingSlice = createSlice({
  name: 'billing',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getBillingInfo.fulfilled, (state, action) => {
      return action.payload
    })
  },
})

export default billingSlice.reducer
