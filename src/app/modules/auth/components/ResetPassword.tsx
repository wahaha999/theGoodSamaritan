/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {useNavigate, useLocation} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
// import {resetPassword, validatePasswordResetToken} from '../redux/AuthCRUD'
// import toast from 'react-hot-toast'
// import {USER_TYPES} from '../../../../data/constants'
// import {IconButton} from '@/core'
import {KTSVG, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {useAppDispatch} from 'src/app/store/hook'
import {showMessage} from 'src/app/store/fuse/messageSlice'
import {resetPassword, validatePasswordResetToken} from '../core/_requests'

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Minimum 8 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  confirmpassword: Yup.string()
    .min(8, 'Minimum 8 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password confirmation is required')
    .oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
})

export function ResetPassword() {
  const history = useNavigate()
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  const [title, setTitle] = useState('Reset Password')
  const [show, setShow] = useState<boolean>(false)
  const [show1, setShow1] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmpassword: '',
    },
    validationSchema: resetPasswordSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      setHasErrors(undefined)
      resetPassword(token, values.password)
        .then(({data: {result}}) => {
          setHasErrors(false)
          setLoading(false)
          dispatch(showMessage({message: 'Password has been set', variant: 'success'}))

          history('/auth/login')
        })
        .catch(() => {
          setHasErrors(true)
          setLoading(false)
          setSubmitting(false)
          setStatus('The token is invalid')
          dispatch(showMessage({message: 'Token is invalid', variant: 'error'}))
        })
    },
  })

  const useQuery = () => {
    return new URLSearchParams(useLocation().search)
  }

  const queryParams: any = useQuery()
  const token = queryParams.get('token')
  //   const isNBS = queryParams.get('type') === USER_TYPES.NBS
  //   const isInvite = Boolean(queryParams.get('invite'))

  useEffect(() => {
    if (!token) {
      dispatch(showMessage({message: 'Token is invalid', variant: 'error'}))
      history('/auth/login')
    }
    validatePasswordResetToken(token)
      .then((response: any) => {
        if (response.data.valid === false) {
          dispatch(showMessage({message: 'Token is invalid', variant: 'error'}))
          history('/auth/login')
        } else {
          dispatch(showMessage({message: 'Token is valid', variant: 'success'}))
        }
      })
      .catch(() => {
        dispatch(showMessage({message: 'Token is invalid', variant: 'error'}))
        history('/auth/login')
      })
  }, [token])

  return (
    <>
      <form
        className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
        noValidate
        id='kt_login_password_reset_form'
        onSubmit={formik.handleSubmit}
      >
        <div className='text-center mb-10'>
          {/* begin::Title */}
          <h1 className='text-dark mb-3'>{title}</h1>
          {/* end::Title */}

          {/* begin::Link */}
          <div className='text-dark fw-bold fs-4'>'Enter your password</div>
          {/* end::Link */}
        </div>

        {/* begin::Title */}
        {hasErrors === true && (
          <div className='mb-lg-15 alert alert-danger'>
            <div className='alert-text font-weight-bold'>
              Sorry, looks like there are some errors detected, please try again.
            </div>
          </div>
        )}

        {hasErrors === false && (
          <div className='mb-10 bg-light-info p-8 rounded'>
            <div className='text-info'>
              Password has reset. Please <Link to='/auth/login'>login</Link>
            </div>
          </div>
        )}
        {/* end::Title */}

        {/* begin::Form group */}
        <label className='form-label fw-bolder text-gray-900 fs-6'>Password</label>
        <div className='fv-row mb-10 inner-password'>
          <input
            type={show ? 'text' : 'password'}
            placeholder=''
            autoComplete='off'
            {...formik.getFieldProps('password')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {'is-invalid': formik.touched.password && formik.errors.password},
              {
                'is-valid': formik.touched.password && !formik.errors.password,
              }
            )}
          />
          {/* <IconButton
            className='inner-icon'
            size='small'
            onClick={() => {
              setShow(!show)
            }}
          >
            {show ? (
              <KTSVG path={toAbsoluteUrl('/media/icons/duotone/General/Eye-slash.svg')} />
            ) : (
              <KTSVG path={toAbsoluteUrl('/media/icons/duotone/General/Eye.svg')} />
            )}
          </IconButton> */}
          {formik.touched.password && formik.errors.password && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.password}</span>
              </div>
            </div>
          )}
        </div>

        {/* end::Form group */}

        {/* begin::Form group */}
        <label className='form-label fw-bolder text-gray-900 fs-6'>Confirm password</label>
        <div className='fv-row mb-10 inner-password'>
          <input
            type={show1 ? 'text' : 'password'}
            placeholder=''
            autoComplete='off'
            {...formik.getFieldProps('confirmpassword')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {'is-invalid': formik.touched.confirmpassword && formik.errors.confirmpassword},
              {
                'is-valid': formik.touched.confirmpassword && !formik.errors.confirmpassword,
              }
            )}
          />
          {/* <IconButton
            className='inner-icon'
            size='small'
            onClick={() => {
              setShow1(!show1)
            }}
          >
            {show1 ? (
              <KTSVG path={toAbsoluteUrl('/media/icons/duotone/General/Eye-slash.svg')} />
            ) : (
              <KTSVG path={toAbsoluteUrl('/media/icons/duotone/General/Eye.svg')} />
            )}
          </IconButton> */}
          {formik.touched.confirmpassword && formik.errors.confirmpassword && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.confirmpassword}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
          <button
            type='submit'
            id='kt_password_reset_submit'
            className='btn btn-lg btn-primary fw-bolder me-4'
          >
            <span className='indicator-label'>Submit</span>
            {loading && (
              <span className='indicator-progress'>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
          <Link to='/auth/login'>
            <button
              type='button'
              id='kt_login_password_reset_form_cancel_button'
              className='btn btn-lg btn-light-primary fw-bolder'
              disabled={formik.isSubmitting || !formik.isValid}
            >
              Cancel
            </button>
          </Link>{' '}
        </div>
        {/* end::Form group */}
      </form>
    </>
  )
}
