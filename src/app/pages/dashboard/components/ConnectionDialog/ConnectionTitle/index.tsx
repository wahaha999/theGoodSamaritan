import {Avatar, Grid, Typography} from '@mui/material'
import {toServerUrl} from 'src/_metronic/helpers'

type Props = {
  info: any
}

const ConnectionTitle = (props: Props) => {
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
        <Typography>With </Typography>
        {/* <Avatar
          src={toServerUrl('/media/account/avatar/' + account?.avatar)}
          sx={{width: 30, height: 30}}
        /> */}
        <Typography>{info?.account?.non_profit_name}</Typography>
      </Grid>
      <Grid container justifyContent='center' alignItems='center' columnGap={1}></Grid>
    </div>
  )
}

export default ConnectionTitle
