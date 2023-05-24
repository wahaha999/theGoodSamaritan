import axios from 'axios'

export const API_URL = process.env.REACT_APP_API_URL
export const APP_PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/users/me`
export const LOGIN_URL = `${API_URL}/auth/login`
export const REGISTER_URL = `${API_URL}/auth/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/auth/forgot_password`
export const VALIDATE_PASSWORD_RESET_TOKEN = `${API_URL}/auth/validate-token`
export const RESET_PASSWORD_URL = `${API_URL}/auth/reset-password`
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

export function validatePasswordResetToken(token: string, isInvite = false) {
  return axios.post(VALIDATE_PASSWORD_RESET_TOKEN, { token, isInvite })
}

export function resetPassword(token: string, password: string) {
  return axios.post<{ result: boolean }>(RESET_PASSWORD_URL, { token, password })
}



export function logout() {
  sessionStorage.removeItem('access_token');
  window.location.reload()
}

export function getUserByToken() {
  return axios.get<any>(GET_USER_BY_ACCESSTOKEN_URL)
}
