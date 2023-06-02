import {CardActions, Grid, IconButton, Button} from '@mui/material'
import React from 'react'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import {useAppDispatch} from 'src/app/store/hook'
import {openPostDialog} from 'src/app/pages/dashboard/store/postDialogSlice'

type Props = {
  setExpand: React.Dispatch<React.SetStateAction<boolean>>
  post: any
  type: 'comment' | 'post'
}

const PostViewActions = (props: Props) => {
  const {setExpand, post, type} = props
  const dispatch = useAppDispatch()
  return (
    <CardActions disableSpacing>
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
            if (type === 'comment') {
            } else {
              setExpand(true)
            }
          }}
          startIcon={<ChatBubbleOutlineIcon />}
          sx={{mr: 2}}
        >
          {type === 'comment' ? 'Reply' : 'Comment'}
        </Button>
        <Button startIcon={<FavoriteBorderIcon />} sx={{mr: 2}}>
          Like
        </Button>
      </Grid>
    </CardActions>
  )
}

export default PostViewActions
