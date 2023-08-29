import {Collapse, Divider} from '@mui/material'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import {Variants, motion} from 'framer-motion'
import {useAppSelector} from 'src/app/store/hook'
import React, {memo, useEffect, useRef, useState} from 'react'
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
  index?: number
  length?: number
  forunread?: any
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
  const parentRef = useRef(null)
  // const [innerWidth, setInnerWidth] = useState<number>(700)
  // useEffect(() => {
  //   const parentDiv: any = parentRef.current
  //   let resizeObserver: any

  //   const handleResize = () => {
  //     const parentWidth = parentDiv.offsetWidth
  //     setInnerWidth(parentWidth)
  //     // console.log('Parent width:', parentWidth)
  //     // Perform any other actions based on the updated width
  //   }

  //   if (parentDiv) {
  //     resizeObserver = new ResizeObserver(handleResize)
  //     resizeObserver.observe(parentDiv)
  //   }

  //   return () => {
  //     if (resizeObserver) {
  //       resizeObserver.disconnect()
  //     }
  //   }
  // }, [])
  const {post, type, comment, comments_count, replies_count, index, length, forunread} = props
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
    <motion.div
      ref={parentRef}
      variants={itemVariants}
      style={{marginLeft: type === 'reply' ? 50 : '0px', paddingTop: '20px'}}
    >
      {/* <Card sx={{width: '100%', margin: '16px 0px', border: '1px solid #D5DBDB'}}> */}
      {/* {type === 'reply' && <Divider orientation='vertical' flexItem />} */}
      <PostViewHeader
        count={type === 'comment' ? comments_count : replies_count}
        type={type}
        post={post}
        index={index}
        length={length}
        user={user}
        handleClick={handleClick}
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
      />
      {JSON.parse(post.images).length > 0 && <PostViewMedia post={post} type={type} />}
      {/* <CardMedia component='div'> */}
      {/* </CardMedia> */}
      {/* )} */}
      <PostViewContent post={post} type={type} />
      <PostViewActions
        comments_count={comments_count}
        replies_count={replies_count}
        setExpand={setExpand}
        expand={expanded}
        forunread={forunread}
        post={post}
        type={type}
      />

      <Collapse in={expanded} timeout='auto' unmountOnExit>
        {type === 'post' && (
          <Divider variant='middle' sx={{mx: 2}}>
            Comments
          </Divider>
        )}
        {type === 'post' &&
          post.comments &&
          post.comments?.map((comment: any, index: number) => (
            <PostView
              type='comment'
              length={post.comments.length}
              index={index}
              comments_count={post.comments_count ? post.comments_count : 0}
              post={comment}
              forunread={post}
              comment={comment}
              key={index}
            />
          ))}
        {type === 'comment' &&
          comment.replies &&
          comment.replies?.map((reply: any, index: number) => (
            <PostView
              type='reply'
              comment={comment}
              index={index}
              replies_count={comment.replies_count ? comment.replies_count : 0}
              length={comment.replies.length}
              post={reply}
              key={index}
            />
          ))}
        {
          <PostInput
            type={type === 'post' ? 'comment' : 'reply'}
            post={type === 'reply' || type === 'comment' ? comment : post}
          />
        }
      </Collapse>
      {/* </Card> */}
    </motion.div>
  )
}

export default memo(PostView)
