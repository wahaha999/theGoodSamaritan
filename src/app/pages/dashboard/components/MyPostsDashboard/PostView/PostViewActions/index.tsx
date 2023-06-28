import {
  CardActions,
  Grid,
  IconButton,
  Button,
  Typography,
  Box,
  Dialog,
  ButtonBase,
  Chip,
  Avatar,
  Tooltip,
} from '@mui/material'
import React, {useMemo, useState} from 'react'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import {useAppDispatch, useAppSelector} from 'src/app/store/hook'
import {
  getLatestCommentByPostId,
  getLatestRepliesByCommentId,
  getLikes,
  savePost,
} from 'src/app/pages/dashboard/store/postSlice'
import LikeHover from './LikeHover'
import LikeInfoDialog from './LikeInfoDialog'
import {setLoading} from 'src/app/pages/dashboard/store/filterSlice'
import {emoji} from 'src/app/constants/emoji'
import _ from 'src/app/modules/@lodash/@lodash'
import {openConnDialog} from 'src/app/pages/dashboard/store/connectDialogSlice'

type Props = {
  setExpand: React.Dispatch<React.SetStateAction<boolean>>
  post: any
  type: 'comment' | 'post' | 'reply'
  comments_count?: number
  replies_count?: number
  expand: boolean
}

const PostViewActions = (props: Props) => {
  const {id} = useAppSelector(({user}) => user.user)

  const {setExpand, post, type, expand} = props
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const [data, setData] = useState([])

  const title = useMemo(() => {
    const likeTypeCount: any = {}

    for (const like of post.likes) {
      const likeType = like.like_type
      likeTypeCount[likeType] = (likeTypeCount[likeType] || 0) + 1
    }
    return likeTypeCount
  }, [post.likes])

  const saved_post = useMemo(() => {
    let filter = _.find(post.post_saves, {user_id: id})
    if (filter) {
      return true
    } else {
      return false
    }
  }, [post.post_saves, id])

  return (
    <>
      <CardActions sx={{mb: 2}}>
        <Grid container justifyContent='space-between' alignItems='center'>
          <Grid item>
            <ButtonBase
              onClick={async () => {
                const data = await dispatch(
                  getLikes({
                    likeable_type: type.charAt(0).toUpperCase() + type.slice(1),
                    likeable_id: post.id,
                  })
                )
                setData(data.payload)
                dispatch(setLoading(false))
                setOpen(true)
              }}
              sx={{cursor: 'pointer'}}
            >
              <Grid container spacing={1} ml={4}>
                {Object.keys(title).map((item: any, index: number) => (
                  <Grid item key={index}>
                    <Chip
                      size='small'
                      color={
                        _.find(post?.likes, {user_id: id})?.like_type === emoji[item - 1].id
                          ? 'secondary'
                          : 'default'
                      }
                      avatar={<Avatar src={emoji[item - 1].url} />}
                      label={<Typography variant='caption'>{title[item]}</Typography>}
                    />
                  </Grid>
                ))}
              </Grid>
            </ButtonBase>
          </Grid>
          <Grid item>
            <Grid container flexDirection='row-reverse'>
              {id !== post.user.id && (
                <Tooltip title='Chat with this organization'>
                  <Button
                    startIcon={<ForumOutlinedIcon />}
                    sx={{mr: 2}}
                    variant='outlined'
                    onClick={() => {
                      dispatch(openConnDialog({open: true, info: post.user}))
                    }}
                  >
                    Chat
                  </Button>
                </Tooltip>
              )}
              {type === 'post' && (
                <Tooltip title='Save this post and follow it for updates.'>
                  <Button
                    startIcon={<ChatBubbleOutlineIcon />}
                    sx={{mr: 2}}
                    variant={saved_post ? 'contained' : 'outlined'}
                    color={saved_post ? 'secondary' : 'primary'}
                    onClick={() => dispatch(savePost({post_id: post.id}))}
                  >
                    {!saved_post ? 'Save Post' : 'Un Save Post'}
                  </Button>
                </Tooltip>
              )}
              <Button
                onClick={() => {
                  if (
                    type === 'post' &&
                    post.comments_count &&
                    post.comments_count > 0 &&
                    !expand
                  ) {
                    dispatch(getLatestCommentByPostId(post.id))
                  }
                  if (
                    type === 'comment' &&
                    post.replies_count &&
                    post.replies_count > 0 &&
                    !expand
                  ) {
                    dispatch(getLatestRepliesByCommentId(post.id))
                  }
                  // if (type === 'comment') {
                  // } else {
                  setExpand(!expand)
                  // }
                }}
                startIcon={<ChatBubbleOutlineIcon />}
                sx={{mr: 2}}
              >
                {type === 'comment' || type === 'reply'
                  ? post.replies_count
                    ? post.replies_count + ' Replies'
                    : 'Reply'
                  : post.comments_count + ' Comments'}
              </Button>
              <LikeHover post={post} type={type} />
            </Grid>
          </Grid>
        </Grid>
      </CardActions>
      <Dialog
        scroll='paper'
        maxWidth='sm'
        fullWidth
        open={open}
        PaperProps={{sx: {height: '400px', overflowY: 'auto'}}}
        onClose={() => {
          setOpen(false)
          setData([])
        }}
      >
        <LikeInfoDialog
          onClose={() => {
            setOpen(false)
            setData([])
          }}
          data={data}
        />
      </Dialog>
    </>
  )
}

export default PostViewActions
