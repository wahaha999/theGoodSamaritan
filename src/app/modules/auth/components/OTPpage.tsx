import {Grid, Typography} from '@mui/material'
import {useState} from 'react'
import OTPInput from 'react-otp-input'
import {useLocation, useNavigate} from 'react-router-dom'
import {sendOTP, verifyEmail} from '../core/_requests'
import {useDispatch} from 'react-redux'
import {showMessage} from 'src/app/store/fuse/messageSlice'
import LoadingButton from '@mui/lab/LoadingButton'
type Props = {}

const OTPpage = (props: Props) => {
  const {state} = useLocation() as any
  const navigate = useNavigate()
  const account_dbkey = state?.account_dbkey
  const email = state?.email
  const [otp, setOtp] = useState('')
  const dispatch = useDispatch()
  const [loading1, setLoading1] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [sent, setSent] = useState(false)
  return (
    <>
      <Grid container flexDirection='column' justifyContent='center' alignItems='center' gap={3}>
        <Typography>Verify Email Address</Typography>
        <Typography>To verify your email, we've sent a One Time Password(OTP) {email}</Typography>
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span> - </span>}
          renderInput={(props) => (
            <input
              {...props}
              style={{
                width: '4rem',
                height: '4rem',
                border: 'solid 0.5px grey',
                borderRadius: '4px',
                padding: '20px',
              }}
            />
          )}
        />
        <LoadingButton
          fullWidth
          disabled={!otp}
          loading={loading1}
          variant='contained'
          onClick={() => {
            setLoading1(true)
            verifyEmail(email, Number(otp))
              .then(() => {
                setLoading1(false)

                dispatch(
                  showMessage({
                    message: 'Your email is verified. You can log in now',
                    variant: 'success',
                  })
                )
                navigate('/auth/subscription', {
                  state: {account_dbkey, email},
                })
              })
              .catch((err) => {
                dispatch(
                  showMessage({
                    message: err.response.data.message,
                    variant: 'error',
                  })
                )
                setLoading1(false)
              })
          }}
        >
          {' '}
          Verify
        </LoadingButton>
        <LoadingButton
          fullWidth
          loading={loading2}
          onClick={() => {
            setSent(false)
            setLoading2(true)
            sendOTP(email)
              .then(() => {
                setLoading2(false)
                setSent(true)
              })
              .catch((err) => {
                setLoading2(false)
                dispatch(
                  showMessage({
                    message: 'Something is wrong',
                    variant: 'error',
                  })
                )
              })
          }}
        >
          Resend OTP
        </LoadingButton>
        {sent && (
          <Typography variant='caption' color='green'>
            We just sent OTP code in your email. Please check your email
          </Typography>
        )}
      </Grid>
    </>
  )
}

export default OTPpage
