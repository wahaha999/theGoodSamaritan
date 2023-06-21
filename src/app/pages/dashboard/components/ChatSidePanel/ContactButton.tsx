import styled from '@emotion/styled'
import {Avatar, Button, Tooltip} from '@mui/material'
import {Theme} from '@mui/material'
import clsx from 'clsx'
import React from 'react'
import {toServerUrl} from 'src/_metronic/helpers'
import {useAppDispatch, useAppSelector} from 'src/app/store/hook'
import {dmSelect} from './store/messageSlice'

interface Props {
  info: any
  channel_id: number
  //   contact: {
  //     id: string
  //     name: string
  //     unread?: string
  //     status: 'online' | 'do-not-disturb' | 'away' | 'offline'
  //     avatar: string
  //   }
  //   selectedContactId: string
  //   onClick: (id: string) => void
}

interface StyledProps {
  theme: Theme
  active: number
  value: string
}

const Root = styled(Tooltip)<any>(({theme, active}) => ({
  width: 70,
  minWidth: 70,
  flex: '0 0 auto',
  ...(active && {
    '&:after': {
      position: 'absolute',
      top: 8,
      right: 0,
      bottom: 8,
      content: "''",
      width: 4,
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
      backgroundColor: theme.palette.primary.main,
    },
  }),
}))

const StyledUreadBadge = styled('div', {
  shouldForwardProp: (prop) => prop !== 'value',
})<any>(({theme, value}) => ({
  position: 'absolute',
  minWidth: 18,
  height: 18,
  top: 4,
  left: 10,
  borderRadius: 9,
  padding: '0 5px',
  fontSize: 11,
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.35)',
  zIndex: 10,
}))

const StyledStatus = styled('div', {shouldForwardProp: (prop) => prop !== 'value'})<any>(
  ({theme, value}) => ({
    position: 'absolute',
    width: 12,
    height: 12,
    bottom: 4,
    left: 44,
    border: `2px solid ${theme.palette.background.default}`,
    borderRadius: '50%',
    zIndex: 10,

    ...(value === 'online' && {
      backgroundColor: '#4CAF50',
    }),

    ...(value === 'do-not-disturb' && {
      backgroundColor: '#F44336',
    }),

    ...(value === 'away' && {
      backgroundColor: '#FFC107',
    }),

    ...(value === 'offline' && {
      backgroundColor: '#646464',
    }),
  })
)

const ContactButton = (props: Props) => {
  const selectedChatRoom = useAppSelector(({chat}) => chat.chatRoom.selectedChatRoom)
  const {info, channel_id} = props
  const dispatch = useAppDispatch()
  return (
    <Root title={info.name} placement='left' active={channel_id === selectedChatRoom ? 1 : 0}>
      <Button
        className={clsx(
          'contactButton rounded-0 py-4 h-auto min-h-auto max-h-none',
          channel_id === selectedChatRoom && 'active'
        )}
        onClick={() => dispatch(dmSelect(channel_id))}
      >
        <StyledUreadBadge>{info.id}</StyledUreadBadge>
        <StyledStatus value='online' />
        <Avatar src={toServerUrl('/media/user/avatar/' + info?.avatar)} />{' '}
      </Button>
    </Root>
  )
}

export default ContactButton
