import React, {useEffect, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {verifyEmail} from '../core/_requests'
import {Card, CircularProgress, Grid, Typography} from '@mui/material'
import {Button} from 'react-bootstrap'

type Props = {}

const VerifyEmail = (props: Props) => {
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState('')
  const useQuery = () => {
    return new URLSearchParams(useLocation().search)
  }

  const queryParams: any = useQuery()
  const token = queryParams.get('token')

  useEffect(() => {
    if (token) {
      verifyEmail(token)
        .then((res: any) => {
          console.log('res==', res)
          setLoading(false)
          setSuccess(true)
          setMessage(res.data.message)
        })
        .catch((err) => {
          setLoading(false)
          console.log('err=', err.data)
          setMessage(err.data?.message)
          setSuccess(false)
        })
    }
  }, [token])

  return (
    <Grid container justifyContent='center' alignItems='center'>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className='flex flex-col align-items-center'>
          <Typography>{message}</Typography>
          <Link to='/auth/login'>
            <Button>Sign In</Button>
          </Link>
        </div>
      )}
    </Grid>
  )
}

export default VerifyEmail
