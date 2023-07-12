import React from 'react'
import {Stack, Grid, Typography, IconButton, Badge} from '@mui/material'
import {toAbsoluteUrl, toServerUrl} from '../../../../../_metronic/helpers'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import {useAppDispatch} from 'src/app/store/hook'
import {updateConnection} from '../../store/connectionSlice'
import PostAccountView from '../MyPostsDashboard/PostView/PostViewHeader/PostAccountViewPopover'
type Props = {
  title: string
  img: string
  pending?: boolean
  request?: boolean
  connection_id: number
  data?: any
  status?: string
}

const PostTitleItem = (props: Props) => {
  const {title, img, data, request, pending, connection_id, status} = props
  const dispatch = useAppDispatch()
  return (
    <Stack sx={{my: 1}}>
      <Grid container alignItems='center' justifyContent='space-between'>
        <Grid item>
          <Grid container alignItems='center'>
            {request ? (
              <Badge
                anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                badgeContent={<NotificationsActiveIcon color='secondary' />}
              >
                <PostAccountView
                  avatar={toServerUrl(`/media/user/avatar/${img}`)}
                  data={data}
                  status={status}
                  width='30px'
                  height='30px'
                />
                {/* <img
                  width='30px'
                  height='30px'
                  style={{borderRadius: '6px'}}
                  src={toServerUrl(`/media/user/avatar/${img}`)}
                  alt=''
                /> */}
              </Badge>
            ) : (
              <PostAccountView
                avatar={toServerUrl(`/media/user/avatar/${img}`)}
                data={data}
                status={status}
                width='30px'
                height='30px'
              />

              // <img
              //   width='30px'
              //   height='30px'
              //   style={{borderRadius: '6px'}}
              //   src={toServerUrl(`/media/user/avatar/${img}`)}
              //   alt=''
              // />
            )}

            <Typography sx={{pl: 4}}>{title}</Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container alignItems='center'>
            {pending && (
              <IconButton
                sx={{color: 'green'}}
                onClick={() => dispatch(updateConnection({status: 1, connection_id}))}
              >
                <CheckCircleOutlineIcon />
              </IconButton>
            )}
            <IconButton
              sx={{color: 'red'}}
              onClick={() => dispatch(updateConnection({status: 0, connection_id}))}
            >
              <HighlightOffIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default PostTitleItem
