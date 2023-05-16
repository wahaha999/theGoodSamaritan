import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {API_URL} from 'src/app/modules/auth/core/_requests'
import {showMessage} from 'src/app/store/fuse/messageSlice'
import {setUser} from 'src/app/store/userSlice'

export const updateProfile = createAsyncThunk(
  'dashboard/account/updateProfile',
  async (data: any, {dispatch, getState}) => {
    try {
      const formData = new FormData()
      Object.keys(data).map((item) => {
        if (item == 'doc') {
          if (data['doc']) {
              
            let temp_doc = [];
            if (typeof data['doc'] == 'string') {
              temp_doc = JSON.parse(data['doc'])
            } else {
              temp_doc = data['doc'];
            }
            temp_doc.forEach((item: any, index: number) => {
              if (typeof item !== 'string') {
                formData.append(`files[${index}]`, item.file)
              } else {
                formData.append(`docs[${index}]`, item)
         
              }
            })
          }
    } else {
        formData.append(item, data[item])
    }
})
      const response = await axios.post(`${API_URL}/account/update`, formData)
      const temp = {...response.data}
        // delete temp.account;
        Promise.all([
            dispatch(setUser({user: temp})),
            dispatch(showMessage({message: 'Successfully updated', variant: 'success'}))
        ])

      return temp
    } catch (error: any) {
      console.log('error==', error.response)
      dispatch(showMessage({message: 'Something is wrong', variant: 'error'}))
    }
    // const data = await reqponse.data
  }
)

export const updateUser = createAsyncThunk(
  'dashboard/user/updateUser',
  async (data: any, {dispatch, getState}) => {
    try {
      const formData = new FormData()
      Object.keys(data).map((item) => {
        if (data[item] == undefined) {
          data[item] = ''
        }
        formData.append(item, data[item])
      })
      const response = await axios.post(`${API_URL}/users/update`, formData)
      const temp = {...response.data}
      dispatch(setUser({user: temp}))
      return temp
    } catch (error) {
      dispatch(showMessage({message: 'Something wrong', variant: 'error'}))
    }
  }
)

export const updatePassword = createAsyncThunk(
  'dashboard/user/updatePassword',
  async (data: any, {dispatch, getState}) => {
    try {
      const response = await axios.post(`${API_URL}/users/update-password`, data)
      dispatch(showMessage({message: 'Password is changed successfully', variant: 'success'}))
    } catch (error: any) {
      dispatch(showMessage({message: error.response.data?.message, variant: 'error'}))
    }
  }
)
