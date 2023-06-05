import {Collapse, Divider} from '@mui/material'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import {Variants, motion} from 'framer-motion'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import {useAppSelector} from 'src/app/store/hook'
import React, {memo} from 'react'
import PostViewHeader from './PostViewHeader'
import PostViewMedia from './PostViewMedia'
import PostViewContent from './PostViewContent'
import PostViewActions from './PostViewActions'
import PostInput from '../PostInput'

type Props = {
  post: any
  type: 'comment' | 'post' | 'reply'
  comment?: any
  comments_count?: number
  replies_count?: number
}

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {type: 'spring', stiffness: 300, damping: 24},
  },
  closed: {opacity: 0, y: 20, transition: {duration: 0.2}},
}

const PostView = (props: Props) => {
  const {post, type, comment, comments_count, replies_count} = props
  const [popup, setPopup] = React.useState(false)

  const user = useAppSelector(({user}) => user.user)
  const [postData, setPostData] = React.useState<any>({})
  const [confirm, setConfirm] = React.useState(false)
  const [edit, setEdit] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [expanded, setExpand] = React.useState(false)

  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, post: any) => {
    setAnchorEl(event.currentTarget)
    let tempPost = {...post}
    if (type === 'post') {
      tempPost.category = JSON.parse(tempPost.category)
    }
    setPostData(tempPost)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setEdit(false)
  }
  return (
    <motion.div variants={itemVariants} style={{marginLeft: type === 'reply' ? 50 : '0px'}}>
      {/* <Card sx={{width: '100%', margin: '16px 0px', border: '1px solid #D5DBDB'}}> */}
      {/* {type === 'reply' && <Divider orientation='vertical' flexItem />} */}
      <Divider sx={{border: '1px solid'}} />
      <PostViewHeader
        count={type === 'comment' ? comments_count : replies_count}
        type={type}
        post={post}
        user={user}
        handleClick={handleClick}
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
      />
      <CardMedia component='div'>
        <PostViewMedia post={post} type={type} />
      </CardMedia>
      {/* )} */}
      <PostViewContent post={post} type={type} />
      <PostViewActions
        comments_count={comments_count}
        replies_count={replies_count}
        setExpand={setExpand}
        post={post}
        type={type}
      />
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        {type === 'post' && post.comments
          ? post.comments?.map((comment: any, index: number) => (
              <PostView type='comment' post={comment} key={index} />
            ))
          : post.latest_comment && (
              <PostView
                comments_count={post.comments_count}
                type='comment'
                post={post.latest_comment}
              />
            )}
        {type === 'comment' && post.replies
          ? post.replies?.map((reply: any, index: number) => (
              <PostView type='reply' comment={post} post={reply} key={index} />
            ))
          : post.latest_reply && (
              <PostView
                // comments_count={post.comments_count}
                replies_count={post.replies_count}
                type='reply'
                post={post.latest_reply}
              />
            )}
        {
          <PostInput
            type={type === 'post' ? 'comment' : 'reply'}
            post={type === 'reply' ? comment : post}
          />
        }
      </Collapse>
      {/* </Card> */}
    </motion.div>
  )
}

export default memo(PostView)
