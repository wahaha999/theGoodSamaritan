import {Button, Tooltip} from '@mui/material'
import React, {memo, useMemo} from 'react'
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined'
import {useAppDispatch, useAppSelector} from 'src/app/store/hook'
import _ from 'src/app/modules/@lodash/@lodash'
import {dmSelect} from '../../../ChatSidePanel/store/messageSlice'
import {openConnDialog} from 'src/app/pages/dashboard/store/connectDialogSlice'

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

  const sendChat = () => {
    if (channel) {
      dispatch(dmSelect({channel_id: channel.id, info: channel}))
    } else {
      dispatch(openConnDialog({open: true, info: info}))
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
