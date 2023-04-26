import {
  FC,
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react'
import {LayoutSplashScreen} from '../../../../_metronic/layout/core'
import {AuthModel, UserModel} from './_models'
import * as authHelper from './AuthHelpers'
import { getUserByToken, logout } from './_requests'
import { IAuthState, UserState } from '../../../store/userSlice'
import { WithChildren } from '../../../../_metronic/helpers'
import { useDispatch } from 'react-redux';
import { setUser } from '../../../store/userSlice'
import withReducer from '../../../store/withReducer'
import createReducer from '../../../store/rootReducer'
import { useAppDispatch, useAppSelector } from '../../../store/hook'

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

const AuthInit = ({children}:any) => {
  // const {auth, logout, setCurrentUser} = useAuth()
  const didRequest = useRef(false)
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const dispatch = useAppDispatch();
  const {access_token} = useAppSelector(({user}) => user)
  // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
  useEffect(() => {
    const requestUser = async () => {
      try {
        if (!didRequest.current) {
          const {data} = await getUserByToken();
          if (data.email) {
            const user: IAuthState = {
              user: {
                email: data.email,
                last_name: data.last_name,
                first_name: data.first_name,
                id: data.id,
                avatar:data.avatar
              }
            }
            dispatch(setUser(user))
          }
          
          // if (user) {
          //   // setCurrentUser(data)
          //   // dispatch(setUser(user))
          // }
        }
      } catch (error) {
        console.error(error)
        if (!didRequest.current) {
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

export default AuthInit;
