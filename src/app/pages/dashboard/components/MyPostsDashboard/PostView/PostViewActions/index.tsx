import {CardActions, Grid, IconButton, Button, Popover, Typography} from '@mui/material'
import React from 'react'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import {useAppDispatch} from 'src/app/store/hook'
import {openPostDialog} from 'src/app/pages/dashboard/store/postDialogSlice'
import {
  getLatestCommentByPostId,
  getLatestRepliesByCommentId,
} from 'src/app/pages/dashboard/store/postSlice'

type Props = {
  setExpand: React.Dispatch<React.SetStateAction<boolean>>
  post: any
  type: 'comment' | 'post' | 'reply'
  comments_count?: number
  replies_count?: number
}

const PostViewActions = (props: Props) => {
  const {setExpand, post, type, comments_count, replies_count} = props
  console.log('🚀 ~ file: index.tsx:24 ~ PostViewActions ~ comments_count:', comments_count)
  const dispatch = useAppDispatch()
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setTimeout(() => {
      setAnchorEl(null)
    }, 500)
  }

  const open = Boolean(anchorEl)
  return (
    <CardActions sx={{mb: 2}}>
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
        <Button
          startIcon={<FavoriteBorderIcon />}
          sx={{mr: 2}}
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          Like
        </Button>
        <Popover
          id='mouse-over-popover'
          sx={{
            pointerEvents: 'none',
          }}
          PaperProps={{
            sx: {
              borderRadius: 8,
              display: 'flex',
            },
            onMouseEnter: handlePopoverOpen,
            onMouseLeave: handlePopoverClose,
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          onClose={handlePopoverClose}
          // onMouseEnter={handlePopoverOpen}
          // onMouseLeave={handlePopoverClose}
          disableRestoreFocus
        >
          <>
            <Typography sx={{m: 1}} variant='h4'>
              😍
            </Typography>
            <Typography sx={{m: 1}} variant='h4'>
              😒
            </Typography>
            <Typography sx={{m: 1}} variant='h4'>
              🎉
            </Typography>
            <Typography sx={{m: 1}} variant='h4'>
              💕
            </Typography>
            <Typography sx={{m: 1}} variant='h4'>
              😎
            </Typography>
          </>
        </Popover>
      </Grid>
    </CardActions>
  )
}

export default PostViewActions
