/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {useFormik} from 'formik'
import {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {showMessage} from 'src/app/store/fuse/messageSlice'
import * as Yup from 'yup'
import {setUser} from '../../../store/userSlice'
import {login} from '../core/_requests'
// import {useAuth} from '../core/Auth'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Use 8 or more characters with a mix of letters, numbers & symbols.')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

/*
Formik+YUP+Typescript:
https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string>('')
  const dispatch = useDispatch<any>()
  const {state} = useParams()
  const navigate = useNavigate()
  // const {saveAuth, setCurrentUser} = useAuth()
  const initialValues = {
    email: state ?? '',
    password: '',
  }

  useEffect(() => {
    if (localStorage.getItem('email')) {
      setSuccess(
        'Congratulations, you have successfully signed up. Please log in below and complete your registration'
      )
    }
  }, [])

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        const {data: auth} = await login(values.email, values.password)

        if (auth.access_token) {
          sessionStorage.setItem('access_token', auth.access_token)
          localStorage.setItem('email', '')
        }
        const temp = {...auth.user}
        dispatch(
          setUser({
            user: temp,
            states: {...auth.states},
          })
        )
        dispatch(showMessage({message: 'Successful login', variant: 'success'}))
      } catch (error: any) {
        localStorage.setItem('email', '')

        setStatus(
          typeof error.response.data.message == 'string'
            ? error.response.data.message
            : 'The provided combination of email and password is invalid.'
        )
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      {/* begin::Heading */}
      <div className='text-center mb-11'>
        <h1 className='text-dark fw-bolder mb-3'>Sign In</h1>
      </div>

      {formik.status && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      )}

      {success && (
        <div className='mb-lg-15 alert alert-success'>
          <div className='alert-text font-weight-bold'>{success}</div>
        </div>
      )}

      {/* begin::Form group */}
      <div className='fv-row mb-8'>
        <label className='form-label fs-6 fw-bolder text-dark'>Email</label>
        <input
          placeholder='Email'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control bg-transparent',
            {'is-invalid': formik.touched.email && formik.errors.email},
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
          type='email'
          name='email'
          autoComplete='off'
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.email}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-3'>
        <label className='form-label fw-bolder text-dark fs-6 mb-0'>Password</label>
        <input
          type='password'
          autoComplete='off'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.password && formik.errors.password,
            },
            {
              'is-valid': formik.touched.password && !formik.errors.password,
            }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Wrapper */}
      <div className='d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8'>
        <div />

        {/* begin::Link */}
        <Link to='/auth/forgot-password' className='link-primary'>
          Forgot Password ?
        </Link>
        {/* end::Link */}
      </div>
      {/* end::Wrapper */}

      {/* begin::Action */}
      <div className='d-grid mb-10'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-primary'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Continue</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
      {/* end::Action */}

      <div className='text-gray-500 text-center fw-semibold fs-6'>
        Not a Member yet?{' '}
        <Link to='/auth/registration' className='link-primary'>
          Sign up
        </Link>
      </div>
      <div className='mb-10 p-8 rounded'>
        <div className='text-info'>
          This is an exclusive site for non-profit organizations to share resources and network with
          others. To ensure the integrity of this site , when you sign in for the first time we will
          ask you to verify your non-profit status by uploading your non-profit documentation and/or
          supplying us with your EIN number. this information will never be shared with any one and
          will only be used to verify your status.
        </div>
      </div>
    </form>
  )
}
