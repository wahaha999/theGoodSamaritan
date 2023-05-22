import { showMessage } from "src/app/store/fuse/messageSlice"
import { logoutUser } from "src/app/store/userSlice"

export default function setupAxios(axios: any, store: any) {
  axios.interceptors.request.use(
    (config: any) => {
      const access_token = sessionStorage.getItem('access_token')
      if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`
      }

      return config
    },
    (err: any) => Promise.reject(err)
  )

  axios.interceptors.response.use(
    (next: any) => {
      return Promise.resolve(next)
    },
    (error: any) => {
      const { status } = error.response

      if (status === 401) {
        delete axios.defaults.headers.common.Authorization;
        
        return Promise.all([
          Promise.reject(error),
          store.dispatch(logoutUser()),
          store.dispatch(showMessage({message:'Token is expired'}))
        ])
        // forceLogout() //TODO: force logout
      }

      return Promise.reject(error)
    }
  )
}
