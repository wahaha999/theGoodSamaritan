import {Button, Typography, Paper, Avatar, Grid} from '@mui/material'
import React, {useMemo, useState} from 'react'
import {Manager, Popper, Reference} from 'react-popper'
import {useDebounce} from 'src/app/modules/hooks'
import * as ReactDOM from 'react-dom'
import {red} from '@mui/material/colors'
import {motion, AnimatePresence} from 'framer-motion'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import ConnectWithoutContactOutlinedIcon from '@mui/icons-material/ConnectWithoutContactOutlined'
import {toServerUrl} from 'src/_metronic/helpers'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import {useAppDispatch} from 'src/app/store/hook'
import {createLike} from 'src/app/pages/dashboard/store/postSlice'

const params = ['0~50', '51~100', '101~200', '201~500', '501~1000', '1000~']

const LikeHover = (props) => {
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
              startIcon={<FavoriteBorderIcon />}
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
                      <motion.h2
                        whileHover={{scale: 1.2}}
                        onClick={() =>
                          dispatch(
                            createLike({
                              likeable_type: type.charAt(0).toUpperCase() + type.slice(1),
                              like_type: 1,
                              likable_id: post.id,
                            })
                          )
                        }
                        className='text-20 mx-2 cursor-pointer'
                      >
                        😍
                      </motion.h2>
                      <motion.h2
                        whileHover={{scale: 1.2}}
                        onClick={() =>
                          dispatch(
                            createLike({
                              likeable_type: type.charAt(0).toUpperCase() + type.slice(1),
                              like_type: 2,
                              likable_id: post.id,
                            })
                          )
                        }
                        className='text-20 mx-2 cursor-pointer'
                      >
                        😒
                      </motion.h2>
                      <motion.h2
                        whileHover={{scale: 1.2}}
                        onClick={() =>
                          dispatch(
                            createLike({
                              likeable_type: type.charAt(0).toUpperCase() + type.slice(1),
                              like_type: 3,
                              likable_id: post.id,
                            })
                          )
                        }
                        className='text-20 mx-2 cursor-pointer'
                      >
                        🎉
                      </motion.h2>
                      <motion.h2
                        whileHover={{scale: 1.2}}
                        onClick={() =>
                          dispatch(
                            createLike({
                              likeable_type: type.charAt(0).toUpperCase() + type.slice(1),
                              like_type: 4,
                              likable_id: post.id,
                            })
                          )
                        }
                        className='text-20 mx-2 cursor-pointer'
                      >
                        💕
                      </motion.h2>
                      <motion.h2
                        whileHover={{scale: 1.2}}
                        onClick={() =>
                          dispatch(
                            createLike({
                              likeable_type: type.charAt(0).toUpperCase() + type.slice(1),
                              like_type: 5,
                              likable_id: post.id,
                            })
                          )
                        }
                        className='text-20 mx-2 cursor-pointer'
                      >
                        😎
                      </motion.h2>
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
  }, [open])
}

export default LikeHover
