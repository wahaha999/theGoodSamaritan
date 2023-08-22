import {Button, Tooltip} from '@mui/material'
import React, {memo, useMemo} from 'react'
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined'
import {useAppDispatch, useAppSelector} from 'src/app/store/hook'
import _ from 'src/app/modules/@lodash/@lodash'
import {dmSelect} from '../../../ChatSidePanel/store/messageSlice'
import {openConnDialog} from 'src/app/pages/dashboard/store/connectDialogSlice'
import {createChatRoom} from '../../../ChatSidePanel/store/chatRoomSlice'
import {setLoading} from 'src/app/pages/dashboard/store/filterSlice'

type Props = {
  info: any
}

const ChatButton = (props: Props) => {
  const {info} = props
  const {chatRooms} = useAppSelector(({chat}) => chat.chatRoom)
  const dispatch = useAppDispatch()
  const channel: any = useMemo(() => {
    return _.find(chatRooms, (e: any) => e.sender_id === info.id || e.receiver_id === info.id)
  }, [chatRooms, info])

  const sendChat = async () => {
    if (channel) {
      dispatch(
        dmSelect({
          channel_id: channel.id,
          info: info.id === channel.receiver_id ? channel.receiver : channel.sender,
        })
      )
    } else {
      dispatch(setLoading(true))
      // dispatch(openConnDialog({open: true, info: info}))
      const res = await dispatch(createChatRoom({receiver: info.id}))
      // if (res.payload.id) {
      // await sendChat()
      // }
      dispatch(setLoading(false))
      const {id} = res.payload

      dispatch(
        dmSelect({
          channel_id: id,
          info: info.id === res.payload.receiver_id ? res.payload.receiver : res.payload.sender,
        })
      )
      // console.log('res==', res.)
      // })
    }
  }

  return (
    <Tooltip title='Chat with this organization'>
      <Button startIcon={<ForumOutlinedIcon />} sx={{mr: 2}} variant='outlined' onClick={sendChat}>
        Chat
      </Button>
    </Tooltip>
  )
}

export default memo(ChatButton)
