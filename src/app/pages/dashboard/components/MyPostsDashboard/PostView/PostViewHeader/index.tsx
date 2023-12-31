import {
  Box,
  Button,
  CardHeader,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material'
import moment from 'moment'
import React, {useMemo} from 'react'
import {toServerUrl} from 'src/_metronic/helpers'
import FuseSvgIcon from 'src/app/modules/core/FuseSvgIcon/FuseSvgIcon'
import {labels} from 'src/app/pages/dashboard/Post'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {useAppDispatch, useAppSelector} from 'src/app/store/hook'
import {openPostDialog} from 'src/app/pages/dashboard/store/postDialogSlice'
import {openCheckDialog} from 'src/app/pages/dashboard/store/checkDialog'
import {getCommentsByPostId, getRepliesByCommentId} from 'src/app/pages/dashboard/store/postSlice'
import PostAccountView from './PostAccountViewPopover'
import {createConnection} from 'src/app/pages/dashboard/store/connectionSlice'
import _ from 'src/app/modules/@lodash/@lodash'
import ConnectWithoutContactOutlinedIcon from '@mui/icons-material/ConnectWithoutContactOutlined'
import {openReportDialog} from 'src/app/pages/dashboard/store/reportDialogSlice'

type Props = {
  post: any
  user: any
  handleClick: (event: React.MouseEvent<HTMLButtonElement>, post: any) => void
  anchorEl: HTMLElement | null
  open: boolean
  handleClose: () => void
  type: 'comment' | 'post' | 'reply'
  count?: number
  index?: number
  length?: number
}

const PostViewHeader = (props: Props) => {
  const {post, user, handleClick, anchorEl, open, handleClose, type, count, index, length} = props
  const dispatch = useAppDispatch()
  const {connections} = useAppSelector(({post}) => post)
  const disabled = useMemo(() => {
    let temp = _.find(
      connections,
      (e: any) => e.receiver_id === post.user.id || e.sender_id === post.user.id
    )
    return temp ? temp.status : false
  }, [connections, post])
  return (
    <>
      <CardHeader
        action={
          <>
            {user.id !== post?.user.id && (
              <Button
                variant='outlined'
                sx={{mr: 4}}
                disabled={disabled ? true : false}
                startIcon={<ConnectWithoutContactOutlinedIcon />}
                onClick={() => dispatch(createConnection(post.user.id))}
              >
                {disabled ? `connection ${disabled}` : 'Make A Connection'}
              </Button>
            )}

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
              {(post?.user?.account_dbkey === user.account_dbkey || user.role === 'admin') && (
                <MenuItem
                  onClick={() => {
                    if (type === 'post') {
                      dispatch(openCheckDialog({open: true, checkType: 'post', dialogId: post.id}))
                    } else if (type === 'comment') {
                      dispatch(
                        openCheckDialog({open: true, checkType: 'comment', dialogId: post.id})
                      )
                    } else if (type === 'reply') {
                      dispatch(openCheckDialog({open: true, checkType: 'reply', dialogId: post.id}))
                    }
                    handleClose()
                  }}
                >
                  <FuseSvgIcon sx={{mr: 1}} size={16}>
                    heroicons-outline:trash
                  </FuseSvgIcon>
                  Delete
                </MenuItem>
              )}
              {(post?.user?.account_dbkey === user.account_dbkey || user.role === 'admin') && (
                <MenuItem
                  onClick={() => {
                    handleClose()
                    if (type === 'post') {
                      dispatch(
                        openPostDialog({open: true, postType: 'edit_post', postOption: post})
                      )
                    } else if (type === 'comment') {
                      dispatch(
                        openPostDialog({open: true, postType: 'edit_comment', postOption: post})
                      )
                    } else if (type === 'reply') {
                      dispatch(
                        openPostDialog({open: true, postType: 'edit_reply', postOption: post})
                      )
                    }
                  }}
                >
                  <FuseSvgIcon sx={{mr: 1}} size={16}>
                    heroicons-outline:pencil
                  </FuseSvgIcon>
                  Edit
                </MenuItem>
              )}
              {post?.user?.id !== user.id && (
                <MenuItem
                  onClick={() => {
                    handleClose()
                    dispatch(openReportDialog({open: true, reported_user: post?.user}))
                  }}
                >
                  <FuseSvgIcon sx={{mr: 1}} size={16}>
                    heroicons-outline:flag
                  </FuseSvgIcon>
                  Report
                </MenuItem>
              )}
            </Menu>
          </>
        }
        title={
          <>
            {type === 'comment' ? (
              count && index === 0 && length && length < count && count > 1 ? (
                <Button onClick={() => dispatch(getCommentsByPostId(post.post_id))}>
                  {count} see all comments
                </Button>
              ) : null
            ) : count && index === 0 && length && length < count && count > 1 ? (
              <Button onClick={() => dispatch(getRepliesByCommentId(post.comment_id))}>
                {count} see all replies
              </Button>
            ) : null}
            <Grid container direction='row' alignItems='center'>
              <PostAccountView
                avatar={toServerUrl('/media/account/avatar/' + post?.user.account.avatar)}
                data={post}
                status={disabled}
              />{' '}
              <Typography>
                {`${post?.user?.account?.non_profit_name}${
                  post?.user.role === 'admin' ? `(${post?.user.role})` : ''
                }`}{' '}
                posted on {moment(post?.created_at).format('MM/DD/YY')} at{' '}
                {moment(post?.created_at).format('h:mm A')}
              </Typography>
              {/* <Avatar
              sx={{bgcolor: red[500], mr: 2}}
              aria-label='recipe'
              src={toServerUrl('/media/account/avatar/' + post?.user?.account.avatar)}
            /> */}
              {/* <Typography>{post?.user?.account.non_profit_name}</Typography> */}
              {/* <Divider
              orientation='vertical'
              flexItem
              sx={{border: '1px solid black', mx: 2, my: 1}}
            />
            <Avatar sx={{mr: 2}} src={toServerUrl('/media/user/avatar/' + post?.user?.avatar)} /> */}
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
          </>
        }
      />
      <div
        className='!min-h-0 ck-content p-6'
        dangerouslySetInnerHTML={{__html: post?.content}}
      ></div>
    </>
  )
}

export default PostViewHeader
