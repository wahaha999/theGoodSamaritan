import {
  CardActions,
  Grid,
  IconButton,
  Button,
  Typography,
  Box,
  Dialog,
  ButtonBase,
} from '@mui/material'
import React, {useState} from 'react'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import {useAppDispatch} from 'src/app/store/hook'
import {
  getLatestCommentByPostId,
  getLatestRepliesByCommentId,
  getLikes,
} from 'src/app/pages/dashboard/store/postSlice'
import LikeHover from './LikeHover'
import LikeInfoDialog from './LikeInfoDialog'
import {setLoading} from 'src/app/pages/dashboard/store/filterSlice'

type Props = {
  setExpand: React.Dispatch<React.SetStateAction<boolean>>
  post: any
  type: 'comment' | 'post' | 'reply'
  comments_count?: number
  replies_count?: number
}

export const emoji = ['😍', '😒', '🎉', '💕', '😎']

const PostViewActions = (props: Props) => {
  const {setExpand, post, type} = props
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const [data, setData] = useState([])

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
              <Typography variant='h6' ml={4} sx={{display: 'inline'}}>
                {post?.likes.length > 0 && ` ${emoji[post?.likes[0]?.like_type - 1]}  `}
              </Typography>
              <Typography sx={{display: 'inline'}}>
                {post?.likes.length === 0 ? '' : post?.likes.length}
              </Typography>
            </ButtonBase>
          </Grid>
          <Grid item>
            <Grid container flexDirection='row-reverse'>
              <IconButton sx={{color: 'purple'}}>
                <ForumOutlinedIcon />
              </IconButton>
              {type === 'post' && (
                <Button startIcon={<SaveOutlinedIcon />} sx={{mr: 2}} variant='outlined'>
                  Save Post
                </Button>
              )}
              <Button
                onClick={() => {
                  if (type === 'post' && post.comments_count && post.comments_count > 0) {
                    dispatch(getLatestCommentByPostId(post.id))
                  }
                  if (type === 'comment' && post.replies_count && post.replies_count > 0) {
                    dispatch(getLatestRepliesByCommentId(post.id))
                  }
                  // if (type === 'comment') {
                  // } else {
                  setExpand(true)
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
        onClose={() => {
          setOpen(false)
          setData([])
        }}
      >
        <LikeInfoDialog data={data} />
      </Dialog>
    </>
  )
}

export default PostViewActions
