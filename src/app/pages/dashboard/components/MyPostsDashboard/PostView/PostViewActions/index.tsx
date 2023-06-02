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
}

const PostViewActions = (props: Props) => {
  const {setExpand} = props
  const dispatch = useAppDispatch()
  return (
    <CardActions disableSpacing>
      <Grid container flexDirection='row-reverse'>
        <IconButton sx={{color: 'purple'}}>
          <ForumOutlinedIcon />
        </IconButton>
        <Button startIcon={<SaveOutlinedIcon />} sx={{mr: 2}} variant='outlined'>
          Save Post
        </Button>
        <Button
          onClick={() =>
            // setExpand(true)
            dispatch(openPostDialog({open: true, postType: 'new_comment'}))
          }
          startIcon={<ChatBubbleOutlineIcon />}
          sx={{mr: 2}}
        >
          Comment
        </Button>
        <Button startIcon={<FavoriteBorderIcon />} sx={{mr: 2}}>
          Like
        </Button>
      </Grid>
    </CardActions>
  )
}

export default PostViewActions
