import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import {useAppSelector} from '../store/hook'
import Account from '../pages/dashboard/Account'
import AccountPage from '../modules/accounts/AccountPage'

const PrivateRoutes = () => {
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  // const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))
  const Subscription = lazy(() => import('../pages/dashboard/Subscription/index'))
  // const Account = lazy(() => import('../pages/dashboard/Account'))

  const user = useAppSelector(({user}) => {
    return user.user
  })
  // console.log('🚀 ~ file: PrivateRoutes.tsx:22 ~ PrivateRoutes ~ user:', user)
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        {user.account?.status ? (
          user.account?.non_profit_name ? (
            <>
              <Route path='auth/*' element={<Navigate to='/dashboard' />} />
              {/* Pages */}
              <Route path='dashboard' element={<DashboardWrapper />} />
              <Route path='builder' element={<BuilderPageWrapper />} />
              <Route path='menu-test' element={<MenuTestPage />} />
              <Route
                path='account/*'
                element={
                  // <SuspensedView>
                  <Account />
                  // </SuspensedView>
                }
              />
              <Route
                path='subscription'
                element={
                  <SuspensedView>
                    <Subscription />
                  </SuspensedView>
                }
              />
              {/* Lazy Modules */}
              <Route
                path='crafted/pages/profile/*'
                element={
                  <SuspensedView>
                    <ProfilePage />
                  </SuspensedView>
                }
              />
              <Route
                path='crafted/pages/wizards/*'
                element={
                  <SuspensedView>
                    <WizardsPage />
                  </SuspensedView>
                }
              />
              <Route
                path='crafted/widgets/*'
                element={
                  <SuspensedView>
                    <WidgetsPage />
                  </SuspensedView>
                }
              />
              <Route
                path='crafted/account/*'
                element={
                  // <SuspensedView>
                  <AccountPage />
                  // </SuspensedView>
                }
              />
              <Route
                path='apps/chat/*'
                element={
                  <SuspensedView>
                    <ChatPage />
                  </SuspensedView>
                }
              />
              <Route
                path='apps/user-management/*'
                element={
                  <SuspensedView>
                    <UsersPage />
                  </SuspensedView>
                }
              />
              {/* Page Not Found */}
              <Route path='*' element={<Navigate to='/error/404' />} />
            </>
          ) : (
            <>
              <Route path='auth/*' element={<Navigate to='/account' />} />
              <Route path='*' element={<Navigate to='/account' />} />
              <Route
                path='account/*'
                element={
                  <SuspensedView>
                    <Account />
                  </SuspensedView>
                }
              />
            </>
          )
        ) : (
          <Route path='auth/*' element={<Navigate to='/subscription' />} />
        )}
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
