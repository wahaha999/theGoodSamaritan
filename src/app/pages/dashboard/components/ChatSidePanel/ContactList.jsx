import React, {useEffect, useMemo, useRef, useState} from 'react'
import {styled} from '@mui/material/styles'
import FuseScrollbars from 'src/app/modules/core/FuseScrollbars/FuseScrollbars'
import {motion} from 'framer-motion'
import ContactButton from './ContactButton'
import {useAppDispatch, useAppSelector} from 'src/app/store/hook'
import {getChatRooms, getFilteredChannels} from './store/chatRoomSlice'
import _ from 'src/app/modules/@lodash/@lodash'
import {FormControlLabel, Grid, Hidden, Radio, RadioGroup, Tooltip} from '@mui/material'

const Root = styled(FuseScrollbars)(({theme}) => ({
  background: theme.palette.background.paper,
}))

const ContactList = (props) => {
  const {id} = useAppSelector(({user}) => user.user)
  const {chatRooms, filteredChannels} = useAppSelector(({chat}) => chat.chatRoom)
  const {searchText, searchMode} = useAppSelector(({chat}) => chat.messages)
  const [sort, setSort] = useState('unread')

  // console.log('🚀 ~ file: ContactList.jsx:15 ~ ContactList ~ chatRoom:', chatRoom)
  const contactListScroll = useRef(null)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getChatRooms(id))
  }, [dispatch, id])

  useEffect(() => {
    if (searchMode === 0) dispatch(getFilteredChannels(searchText))
  }, [searchText, searchMode, dispatch])

  const contactList = useMemo(() => {
    let list = _.filter(chatRooms, (e) => {
      if (_.trim(searchText) === '') {
        return true
      } else {
        if (searchMode === 1) {
          if (id !== e.receiver.id) {
            return (
              e.receiver.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
              e.receiver.last_name.toLowerCase().includes(searchText.toLowerCase()) ||
              e.receiver.account.non_profit_name.toLowerCase().includes(searchText.toLowerCase())
            )
          } else {
            return (
              e.sender.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
              e.sender.last_name.toLowerCase().includes(searchText.toLowerCase()) ||
              e.sender.account.non_profit_name.toLowerCase().includes(searchText.toLowerCase())
            )
          }
        } else {
          return filteredChannels.includes(e.id)
        }
      }
    })

    if (sort === 'unread') {
      return list.sort((a, b) => b.unread_count - a.unread_count)
    } else if (sort === 'last') {
      return list.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    }
  }, [searchText, chatRooms, filteredChannels, id, sort, searchMode])
  // console.log('contact===', contactList)
  // const sortContactList = useMemo(() => {
  //   if (sort === 'unread') {
  //     return contactList.sort((a, b) => a.unread_count - b.unread_count)
  //   } else if (sort === 'last') {
  //     return contactList.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
  //   }
  // }, [contactList, sort])

  const handleRadio = (e) => {
    setSort(e.target.value)
  }

  return (
    <Root
      className='flex shrink-0 flex-col overflow-y-auto overscroll-contain h-screen'
      ref={contactListScroll}
      option={{suppressScrollX: true, wheelPropagation: false}}
    >
      <Hidden smDown>
        <Grid container justifyContent='center'>
          <RadioGroup value={sort} row onChange={handleRadio}>
            <Tooltip title='Click here to sort by un-read messages first...' placement='right'>
              <FormControlLabel value='unread' control={<Radio />} label='Unread' />
            </Tooltip>
            <Tooltip title='Click here to sort by latest Messages.' placement='right'>
              <FormControlLabel value='last' control={<Radio />} label='Last message' />
            </Tooltip>
          </RadioGroup>
        </Grid>
      </Hidden>
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
              {contactList?.map((item, index) => (
                <motion.div variants={variant} key={index}>
                  <ContactButton
                    data={item}
                    channel_id={item.id}
                    info={item.sender.id === id ? item.receiver : item.sender}
                  />
                </motion.div>
              ))}
            </motion.div>
          </>
        )
      }, [contactList, id])}
    </Root>
  )
}

export default ContactList
