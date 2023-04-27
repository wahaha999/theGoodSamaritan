import axios from 'axios'
import {AuthModel, UserModel} from './_models'
import { UserState } from '../../../store/userSlice'

const API_URL = process.env.REACT_APP_API_URL

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/users/me`
export const LOGIN_URL = `${API_URL}/auth/login`
export const REGISTER_URL = `${API_URL}/auth/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/auth/forgot_password`

// Server should return AuthModel
export function login(email: string, password: string) {
  return axios.post<any>(LOGIN_URL, {
    email,
    password,
  })
}

// Server should return AuthModel
export function register(
  email: string,
  first_name: string,
  last_name: string,
  password: string,
) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: first_name,
    last_name: last_name,
    password,
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {
    email,
  })
}

export function logout() {
  sessionStorage.removeItem('access_token');
  window.location.reload()
}

export function getUserByToken() {
  return axios.get<any>(GET_USER_BY_ACCESSTOKEN_URL)
}
