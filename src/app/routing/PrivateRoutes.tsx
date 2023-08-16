import {FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import TopBarProgress from 'react-topbar-progress-indicator'
import DashboardWrapper from '../pages/dashboard/DashboardWrapper'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import {useAppSelector} from '../store/hook'
import Account from '../pages/dashboard/Account'
import AccountPage from '../modules/accounts/AccountPage'
import Billing from '../pages/dashboard/Billing'
import AppLayout from 'src/_metronic/layout/AppLayout'
import YoutubePage from '../pages/youtube'
import Subscription from '../pages/dashboard/Subscription'
import SubscriptionMiddleware from '../pages/dashboard/SubscriptionMiddleware'
import Support from '../pages/dashboard/Support'

const PrivateRoutes = () => {
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
              <Route
                path='dashboard'
                element={<SubscriptionMiddleware element={<DashboardWrapper />} />}
              />
              <Route path='youtube' element={<YoutubePage />} />
              <Route
                path='account/*'
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
                  // <SuspensedView>
                  <Subscription />
                  // </SuspensedView>
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
              <Route
                path='support'
                element={
                  // <SuspensedView>
                  <Support />
                  // </SuspensedView>
                }
              />

              {/* Page Not Found */}
              {/* <Route path='*' element={<Navigate to='/error/404' />} /> */}
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
          <>
            <Route path='*' element={<Navigate to='/subscription' />} />
            <Route
              path='subscription'
              element={
                // <SuspensedView>
                <Subscription />
                // </SuspensedView>
              }
            />
          </>
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
