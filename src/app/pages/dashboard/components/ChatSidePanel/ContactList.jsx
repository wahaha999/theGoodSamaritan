import React, {useEffect, useMemo, useRef} from 'react'
import {styled} from '@mui/material/styles'
import FuseScrollbars from 'src/app/modules/core/FuseScrollbars/FuseScrollbars'
import {motion} from 'framer-motion'
import ContactButton from './ContactButton'
import {useAppDispatch, useAppSelector} from 'src/app/store/hook'
import {getChatRooms} from './store/chatRoomSlice'
const Root = styled(FuseScrollbars)(({theme}) => ({
  background: theme.palette.background.paper,
}))

const ContactList = (props) => {
  const {id} = useAppSelector(({user}) => user.user)
  const {chatRoom} = useAppSelector(({chat}) => chat)
  console.log('🚀 ~ file: ContactList.jsx:15 ~ ContactList ~ chatRoom:', chatRoom)
  const contactListScroll = useRef(null)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getChatRooms(id))
  }, [dispatch])

  return (
    <Root
      className='flex shrink-0 flex-col overflow-y-auto overscroll-contain h-screen'
      ref={contactListScroll}
      option={{suppressScrollX: true, wheelPropagation: false}}
    >
      {useMemo(() => {
        const container = {
          show: {
            transition: {
              staggerChildren: 0.05,
            },
          },
        }
        const variant = {
          hidden: {opacity: 0, scale: 0.6},
          show: {opacity: 1, scale: 1},
        }
        return (
          <>
            <motion.div
              variants={container}
              initial='hidden'
              animate='show'
              className='flex flex-col shrink-0'
            >
              {chatRoom?.map((item, index) => (
                <motion.div variants={variant} key={index}>
                  <ContactButton info={item.sender.id === id ? item.receiver : item.sender} />
                </motion.div>
              ))}
            </motion.div>
          </>
        )
      }, [chatRoom])}
    </Root>
  )
}

export default ContactList
