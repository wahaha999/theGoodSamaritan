import {useEffect, useRef, useState} from 'react'
import {LayoutSplashScreen} from '../../../../_metronic/layout/core'
import {useAppDispatch, useAppSelector} from '../../../store/hook'
import {IAuthState, logoutUser, setUser} from '../../../store/userSlice'
import {getUserByToken} from './_requests'

// type AuthContextProps = {
//   auth: AuthModel | undefined
//   saveAuth: (auth: AuthModel | undefined) => void
//   currentUser: UserModel | undefined
//   setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>
//   logout: () => void
// }

// const initAuthContextPropsState = {
//   auth: authHelper.getAuth(),
//   saveAuth: () => {},
//   currentUser: undefined,
//   setCurrentUser: () => {},
//   logout: () => {},
// }

// const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

// const useAuth = () => {
//   return useContext(AuthContext)
// }

// const AuthProvider: FC<WithChildren> = ({children}) => {
//   const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth())
//   const [currentUser, setCurrentUser] = useState<UserModel | undefined>()
//   const saveAuth = (auth: AuthModel | undefined) => {
//     setAuth(auth)
//     if (auth) {
//       authHelper.setAuth(auth)
//     } else {
//       authHelper.removeAuth()
//     }
//   }

//   const logout = () => {
//     saveAuth(undefined)
//     setCurrentUser(undefined)
//   }

//   return (
//     <AuthContext.Provider value={{auth, saveAuth, currentUser, setCurrentUser, logout}}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

const AuthInit = ({children}: any) => {
  // const {auth, logout, setCurrentUser} = useAuth()
  const didRequest = useRef(false)
  const [showSplashScreen, setShowSplashScreen] = useState(true)
  const dispatch = useAppDispatch()
  const {access_token} = useAppSelector(({user}) => user)
  // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
  useEffect(() => {
    const requestUser = async () => {
      try {
        if (!didRequest.current) {
          const {data} = await getUserByToken()
          const temp = {...data, ...data.account}
          delete temp.account
          if (temp.email) {
            dispatch(setUser({user: temp}))
          } else {
            dispatch(logoutUser())
          }
        }
      } catch (error) {
        console.error(error)
        if (!didRequest.current) {
          dispatch(logoutUser())
          // logout()
        }
      } finally {
        setShowSplashScreen(false)
      }

      return () => (didRequest.current = true)
    }

    if (access_token) {
      requestUser()
    } else {
      // logout()
      setShowSplashScreen(false)
    }
    // eslint-disable-next-line
  }, [])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
}

export default AuthInit
