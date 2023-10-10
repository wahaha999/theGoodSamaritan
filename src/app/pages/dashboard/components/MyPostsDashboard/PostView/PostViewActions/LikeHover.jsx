import {Button} from '@mui/material'
import {useMemo, useState} from 'react'
import {Manager, Popper, Reference} from 'react-popper'
import {useDebounce} from 'src/app/modules/hooks'
import * as ReactDOM from 'react-dom'
import {motion, AnimatePresence} from 'framer-motion'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import {useAppDispatch, useAppSelector} from 'src/app/store/hook'
import {createLike} from 'src/app/pages/dashboard/store/postSlice'
import {emoji} from 'src/app/constants/emoji'
import _ from 'src/app/modules/@lodash/@lodash'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined'
const LikeHover = (props) => {
  const {id} = useAppSelector(({user}) => user.user)
  const {post, type} = props
  const [open, setOpened] = useState(false)
  const handleToggle = useDebounce((open) => {
    setOpened(open)
  }, 150)
  const dispatch = useAppDispatch()

  return useMemo(() => {
    return (
      <Manager>
        <Reference>
          {({ref}) => (
            <Button
              ref={ref}
              startIcon={
                _.find(post?.likes, {user_id: id}) ? (
                  <ThumbUpAltIcon />
                ) : (
                  <ThumbUpOffAltOutlinedIcon />
                )
              }
              sx={{mr: 2}}
              onMouseEnter={() => handleToggle(true)}
              onMouseLeave={() => handleToggle(false)}
            >
              Like
            </Button>
          )}
        </Reference>
        {ReactDOM.createPortal(
          <Popper placement='top' eventsEnabled={open} positionFixed>
            {({ref, style, placement}) => {
              return (
                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{opacity: 0}}
                      animate={{opacity: 1}}
                      exit={{opacity: 0}}
                      transition={{duration: 0.3}}
                      // transition={{duration: 1}}
                      ref={ref}
                      style={{
                        ...style,
                        borderRadius: '28px',
                        background: '#fff',
                        display: 'flex',
                        padding: '4px',
                        boxShadow: '0px 1px 60px -9px rgba(0,0,0,0.47)',
                      }}
                      data-placement={placement}
                      className='z-1000'
                      onMouseEnter={() => handleToggle(true)}
                      onMouseLeave={() => handleToggle(false)}
                    >
                      {emoji.map((item, index) => (
                        <motion.img
                          initial={{y: 10, opacity: 0}}
                          animate={{y: 0, opacity: 1}}
                          transition={{delay: index * 0.05}}
                          key={index}
                          whileHover={{scale: 1.2}}
                          whileTap={{scale: 0.9}}
                          style={{
                            boxShadow:
                              _.find(post?.likes, {user_id: id})?.like_type === item.id
                                ? '0px 1px 10px 1px rgba(0,0,0,0.7)'
                                : 'none',
                          }}
                          src={item.url}
                          onClick={() =>
                            dispatch(
                              createLike({
                                likeable_type: type.charAt(0).toUpperCase() + type.slice(1),
                                like_type: item.id,
                                likable_id: post.id,
                              })
                            )
                          }
                          className='mx-2 w-24 h-24 cursor-pointer rounded-12'
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )
            }}
          </Popper>,
          document.querySelector('#root')
        )}
      </Manager>
    )
  }, [open, dispatch, handleToggle, id, post.id, post?.likes, type])
}

export default LikeHover
