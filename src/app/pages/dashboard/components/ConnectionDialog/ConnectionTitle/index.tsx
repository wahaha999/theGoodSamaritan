import {Avatar, Grid, Typography} from '@mui/material'
import React from 'react'
import {toServerUrl} from 'src/_metronic/helpers'
import {useAppSelector} from 'src/app/store/hook'

type Props = {
  info: any
}

const ConnectionTitle = (props: Props) => {
  const {account} = useAppSelector(({user}) => user.user)
  const {info} = props
  return (
    <div>
      <Grid container justifyContent='center' alignItems='center' columnGap={1}>
        <Typography>Send a Message to</Typography>
        <Avatar
          src={toServerUrl('/media/user/avatar/' + info?.avatar)}
          sx={{width: 30, height: 30}}
        />
        <Typography>
          {info.first_name} {info.last_name}
        </Typography>
        <Typography>From </Typography>
        <Avatar
          src={toServerUrl('/media/account/avatar/' + account?.avatar)}
          sx={{width: 30, height: 30}}
        />
        <Typography>{account.non_profit_name}</Typography>
      </Grid>
      <Grid container justifyContent='center' alignItems='center' columnGap={1}></Grid>
    </div>
  )
}

export default ConnectionTitle
