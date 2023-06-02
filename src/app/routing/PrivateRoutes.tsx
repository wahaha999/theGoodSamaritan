import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import TopBarProgress from 'react-topbar-progress-indicator'
import DashboardWrapper from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import {useAppSelector} from '../store/hook'
import Account from '../pages/dashboard/Account'
import AccountPage from '../modules/accounts/AccountPage'
import Billing from '../pages/dashboard/Billing'
import AppLayout from 'src/_metronic/layout/AppLayout'
import YoutubePage from '../pages/youtube'

const PrivateRoutes = () => {
  const Subscription = lazy(() => import('../pages/dashboard/Subscription/index'))

  const user = useAppSelector(({user}) => {
    return user.user
  })
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        {user.account?.customer_id ? (
          user.account?.non_profit_name ? (
            <>
              <Route path='auth/*' element={<Navigate to='/dashboard' />} />
              {/* Pages */}
              <Route path='dashboard' element={<DashboardWrapper />} />
              <Route path='youtube' element={<YoutubePage />} />
              <Route
                path='account/info'
                element={
                  // <SuspensedView>
                  <Account />
                  // </SuspensedView>
                }
              />
              <Route
                path='account/billing'
                element={
                  // <SuspensedView>
                  <Billing />
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
                path='crafted/account/*'
                element={
                  // <SuspensedView>
                  <AccountPage />
                  // </SuspensedView>
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
