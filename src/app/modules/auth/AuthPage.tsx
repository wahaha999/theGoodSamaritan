/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect} from 'react'
import {Outlet, Route, Routes} from 'react-router-dom'
import {Registration} from './components/Registration'
import {ForgotPassword} from './components/ForgotPassword'
import {Login} from './components/Login'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import StripePricingTable from './components/StripePricingTable'
import {ResetPassword} from './components/ResetPassword'
import OTPpage from './components/OTPpage'

const AuthLayout = () => {
  useEffect(() => {
    document.body.classList.add('bg-body')
    return () => {
      document.body.classList.remove('bg-body')
    }
  }, [])

  return (
    <div
      className='d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed'
      style={{
       // backgroundImage: `url(${toAbsoluteUrl('/media/illustrations/sketchy-1/14.png')})`,
      }}
    >
      {/* begin::Content */}
      <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20'>
        {/* begin::Logo */}
        <a href='#' className='mb-12'>
          <img alt='Logo' src={toAbsoluteUrl('/media/logos/logo.png')} className='h-45px' />
        </a>
        {/* end::Logo */}
        {/* begin::Wrapper */}
        <div className='w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto'>
          <Outlet />
        </div>
        {/* end::Wrapper */}
      </div>
      {/* end::Content */}
      {/* begin::Footer */}
      <div className='d-flex flex-center flex-column-auto p-10'>
        <div className='d-flex align-items-center fw-bold fs-6'>
          <a  href='https://www.samaritanmarketplace.com/about'   className='text-muted text-hover-primary px-2'>
            About
          </a>

          <a
              href='/media/policy/Terms_and_Services.pdf'
              target='_blank'
              className='text-muted text-hover-primary px-2'
            >
              Terms & Services, 
            </a>
            <a
              href='/media/policy/Privacy_Policy.pdf'
              target='_blank'
              className='text-muted text-hover-primary px-2'
            >
              Privacy Policy
            </a>
        </div>
      </div>
      {/* end::Footer */}
    </div>
  )
}

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path='login' element={<Login />} />
      <Route path='registration' element={<Registration />} />
      <Route path='forgot-password' element={<ForgotPassword />} />
      <Route path='reset-password' element={<ResetPassword />} />
      <Route path='verify' element={<OTPpage />} />

      <Route index element={<Login />} />
    </Route>
    <Route path='subscription' element={<StripePricingTable />} />
  </Routes>
)

export {AuthPage}
