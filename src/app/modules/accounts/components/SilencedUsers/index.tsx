import {Grid} from '@mui/material'
import React, {useEffect, useMemo} from 'react'
import SilenceUserList from './components/SilenceUserList'
import SilenceUserItem from './components/SilenceUserItem'
import {useAppDispatch, useAppSelector} from 'src/app/store/hook'
import {getReportedUsers} from 'src/app/pages/dashboard/store/reportDialogSlice'

type Props = {}

const SilencedUsers = (props: Props) => {
  const dispatch = useAppDispatch()
  const {reported_users} = useAppSelector(({post}) => post.reportDialog)
  useEffect(() => {
    dispatch(getReportedUsers())
  }, [dispatch])

  const {users, profits} = useMemo(() => {
    let profits = reported_users.filter((item: any) => JSON.parse(item.want)[2] === 'true')
    let users = reported_users.filter((item: any) => JSON.parse(item.want)[2] !== 'true')
    return {users, profits}
  }, [reported_users])
  return (
    <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
      <div className='card-header cursor-pointer'>
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Silenced Users</h3>
        </div>
        <div className='align-self-center'>
          {/* <Button onClick={() => handleSubmit(onSubmit)()} variant='contained'>
            Change Password
          </Button> */}
        </div>
      </div>
      <div className='card-body p-9'>
        <Grid container spacing={4}>
          <Grid item md={6} sm={12}>
            <SilenceUserList title='Silenced Users'>
              {users?.map((item: any, index: number) => (
                <SilenceUserItem type='user' key={index} data={item} />
              ))}
            </SilenceUserList>
          </Grid>
          <Grid item md={6} sm={12}>
            <SilenceUserList title='Silenced Non-Profit'>
              {profits?.map((item: any, index: number) => (
                <SilenceUserItem type='non_profit' key={index} data={item} />
              ))}
            </SilenceUserList>
          </Grid>
        </Grid>
        {/* <Grid container spacing={2}>
          <Grid item md={4}>
            <StyledTextFiled
              show={show}
              setShow={setShow}
              label='Current Password'
              placeholder='Current Password'
              name='current_password'
            />
          </Grid>
          <Grid item md={4}>
            <StyledTextFiled
              show={show}
              setShow={setShow}
              label='New Password'
              placeholder='New Password'
              name='password'
            />
          </Grid>
          <Grid item md={4}>
            <StyledTextFiled
              show={show}
              setShow={setShow}
              label='Confirm Password'
              placeholder='Confirm Password'
              name='password_confirmation'
            />
          </Grid>
        </Grid> */}
      </div>
    </div>
  )
}

export default SilencedUsers
