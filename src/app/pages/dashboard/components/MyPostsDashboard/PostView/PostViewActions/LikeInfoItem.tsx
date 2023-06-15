import React, {memo} from 'react'
import {Grid, Badge, Typography, Avatar, Button} from '@mui/material'
import {toServerUrl} from 'src/_metronic/helpers'
import BluetoothConnectedOutlinedIcon from '@mui/icons-material/BluetoothConnectedOutlined'
import {emoji} from 'src/app/constants/emoji'
type Props = {
  info: any
}

const LikeInfoItem = (props: Props) => {
  const {info} = props
  return (
    <Grid container alignItems='center' gap={2} my={2}>
      <Grid item>
        <Badge
          overlap='circular'
          anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
          badgeContent={<img src={emoji[info.like_type - 1].url} />}
        >
          <Avatar
            sx={{width: 70, height: 70}}
            alt=''
            src={toServerUrl('/media/user/avatar/' + info.user?.avatar)}
          />
        </Badge>
      </Grid>
      <Grid item flexGrow={1}>
        <Typography>{info.user.email}</Typography>
      </Grid>
      <Grid item>
        <Button startIcon={<BluetoothConnectedOutlinedIcon />}>Connect</Button>
      </Grid>
    </Grid>
  )
}

export default memo(LikeInfoItem)
