import {
  Avatar,
  Box,
  Button,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material'
import {red} from '@mui/material/colors'
import moment from 'moment'
import React from 'react'
import {toServerUrl} from 'src/_metronic/helpers'
import FuseSvgIcon from 'src/app/modules/core/FuseSvgIcon/FuseSvgIcon'
import {labels} from 'src/app/pages/dashboard/Post'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {useAppDispatch} from 'src/app/store/hook'
import {openPostDialog} from 'src/app/pages/dashboard/store/postDialogSlice'
import {openCheckDialog} from 'src/app/pages/dashboard/store/checkDialog'

type Props = {
  post: any
  user: any
  handleClick: (event: React.MouseEvent<HTMLButtonElement>, post: any) => void
  anchorEl: HTMLElement | null
  open: boolean
  handleClose: () => void
  type: 'comment' | 'post'
}

const PostViewHeader = (props: Props) => {
  const {post, user, handleClick, anchorEl, open, handleClose, type} = props
  const dispatch = useAppDispatch()
  return (
    <CardHeader
      action={
        <>
          <Button variant='outlined' sx={{mr: 4}}>
            Make A Connection
          </Button>
          {post?.user?.account_dbkey == user.account_dbkey && (
            <>
              <IconButton aria-label='settings' onClick={(e) => handleClick(e, post)}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                elevation={1}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                id='basic-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem
                  onClick={() => {
                    if (type === 'post') {
                      dispatch(openCheckDialog({open: true, checkType: 'post', dialogId: post.id}))
                    } else {
                      dispatch(
                        openCheckDialog({open: true, checkType: 'comment', dialogId: post.id})
                      )
                    }
                    handleClose()
                  }}
                >
                  <FuseSvgIcon sx={{mr: 1}} size={16}>
                    heroicons-outline:trash
                  </FuseSvgIcon>
                  Delete
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose()
                    if (type === 'post') {
                      dispatch(
                        openPostDialog({open: true, postType: 'edit_post', postOption: post})
                      )
                    } else {
                      dispatch(
                        openPostDialog({open: true, postType: 'edit_comment', postOption: post})
                      )
                    }
                  }}
                >
                  <FuseSvgIcon sx={{mr: 1}} size={16}>
                    heroicons-outline:pencil
                  </FuseSvgIcon>
                  Edit
                </MenuItem>
              </Menu>
            </>
          )}
        </>
      }
      title={
        <>
          <Grid container direction='row' alignItems='center'>
            <Avatar
              sx={{bgcolor: red[500], mr: 2}}
              aria-label='recipe'
              src={toServerUrl('/media/account/avatar/' + post?.user?.account.avatar)}
            />
            <Typography>{post?.user?.account.non_profit_name}</Typography>
            <Divider
              orientation='vertical'
              flexItem
              sx={{border: '1px solid black', mx: 2, my: 1}}
            />
            <Avatar sx={{mr: 2}} src={toServerUrl('/media/user/avatar/' + post?.user?.avatar)} />
            <Typography>
              {`${post?.user?.first_name} ${post?.user?.last_name}`} posted on{' '}
              {moment(post?.created_at).format('MM/DD/YY')} at{' '}
              {moment(post?.created_at).format('h:mm A')}
            </Typography>
            {type === 'post' && (
              <Tooltip title={labels[Number(post?.purpose) - 1].title} arrow>
                {post?.purpose && labels[Number(post?.purpose) - 1].icon}
              </Tooltip>
            )}
          </Grid>
        </>
      }
      subheader={
        <>
          {type === 'post' && post?.event_name && (
            <Grid container mt={1}>
              <Typography sx={{mr: 2}}>Event Name: {post?.event_name}</Typography>
              <Typography>
                Starts on {moment(post?.start).format('MM/DD/YY')} at{' '}
                {moment(post?.start).format('h:mm A')} and end on{' '}
                {moment(post?.end).format('MM/DD/YY')} at {moment(post?.end).format('h:mm A')}
              </Typography>
            </Grid>
          )}
          <Box sx={{my: 2}} />
          <div
            className='ck-blurred ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline'
            dangerouslySetInnerHTML={{__html: post?.content}}
          ></div>
        </>
      }
    />
  )
}

export default PostViewHeader
