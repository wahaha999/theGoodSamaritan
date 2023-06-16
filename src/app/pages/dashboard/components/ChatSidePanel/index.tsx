import {styled, AppBar, Toolbar, IconButton, Typography, Avatar, Paper} from '@mui/material'
import React, {useRef} from 'react'
import {toServerUrl} from 'src/_metronic/helpers'
import FuseSvgIcon from 'src/app/modules/core/FuseSvgIcon/FuseSvgIcon'
import {useAppSelector} from 'src/app/store/hook'
import ContactList from './ContactList'
import Chat from './Chat'

type Props = {
  opened: boolean
  onClose: () => void
}

const Root = styled('div')<{opened: boolean}>(({theme, opened}) => ({
  height: '100vh',

  '& > .panel': {
    height: '100%',
  },
}))

const ChatSidePanel = (props: Props) => {
  const {opened} = props
  const user = useAppSelector(({user}) => user.user)
  const {onClose} = props
  const ref = useRef(null)
  return (
    <Root opened={opened}>
      <div className='panel flex flex-col max-w-ful' ref={ref}>
        <AppBar position='static' className='shadow-md'>
          <Toolbar className='px-4'>
            <div className='flex flex-1 items-center space-x-12'>
              <IconButton
                className=''
                color='inherit'
                //   onClick={(ev) => dispatch(openChatPanel())}
                size='large'
              >
                <FuseSvgIcon size={24}>heroicons-outline:chat-alt-2</FuseSvgIcon>
              </IconButton>
              <Typography className='text-16' color='inherit'>
                Team Chat
              </Typography>
            </div>
            {/* <div className='flex flex-1 items-center px-12'>
            <Avatar src={toServerUrl('/media/user/avatar/' + user?.avatar)} />
            <Typography className='mx-16 text-16' color='inherit'>
              Jesse scaff
            </Typography>
          </div> */}
            <div className='flex px-4'>
              <IconButton color='inherit' size='large' onClick={onClose}>
                <FuseSvgIcon>heroicons-outline:x</FuseSvgIcon>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <Paper className='flex flex-1 flex-row min-h-px shadow-0'>
          <ContactList className='flex shrink-0' />
          <Chat className='flex flex-1 z-10' />
          {/* <div className='flex flex-col flex-1 items-center justify-center p-24 h-screen overflow-auto'>
            <FuseSvgIcon size={128} color='disabled'>
              heroicons-outline:chat
            </FuseSvgIcon>
            <Typography className='px-16 pb-24 mt-24 text-center' color='text.secondary'>
              Select a contact to start a conversation.
            </Typography>
          </div> */}
        </Paper>
      </div>
    </Root>
  )
}

export default ChatSidePanel
