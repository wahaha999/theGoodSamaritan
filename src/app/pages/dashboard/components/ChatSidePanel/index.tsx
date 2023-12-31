import {
  styled,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Paper,
  Input,
  useTheme,
  SwitchProps,
  Switch,
  useMediaQuery,
  Hidden,
} from '@mui/material'
import {useEffect, useMemo, useRef} from 'react'
import {toServerUrl} from 'src/_metronic/helpers'
import FuseSvgIcon from 'src/app/modules/core/FuseSvgIcon/FuseSvgIcon'
import {useAppDispatch, useAppSelector} from 'src/app/store/hook'
import ContactList from './ContactList'
import Chat from './Chat'
import {echoInit} from 'src/app/helpers/echoHelper'
import withReducer from 'src/app/store/withReducer'
import reducer from './store'
import {handleSearch, handleSearchMode} from './store/messageSlice'

type Props = {
  opened: boolean
  isMobile: boolean
  onClose: () => void
}

const Root = styled('div')<{opened: boolean; isMobile: boolean}>(({theme, opened, isMobile}) => ({
  height: '100vh',
  width: isMobile ? '100vw' : 'none',

  '& > .panel': {
    height: '100%',
  },
}))

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName='.Mui-focusVisible' disableRipple {...props} />
))(({theme}) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.secondary.main,
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.primary.main,
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}))

const ChatSidePanel = (props: Props) => {
  const {opened} = props
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const {access_token} = useAppSelector(({user}) => user)
  const {selectedChatRoom, chatRoomInfo} = useAppSelector(({chat}) => chat.chatRoom)
  const {searchText, searchMode} = useAppSelector(({chat}) => chat.messages)
  const {onClose} = props
  const ref = useRef(null)
  useEffect(() => {
    dispatch(echoInit(access_token))
  }, [dispatch, access_token])

  const matches = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Root opened={opened} isMobile={matches}>
      <div className='panel flex flex-col max-w-ful' ref={ref}>
        <AppBar position='static' className='shadow-md'>
          <Toolbar className='px-4 sm:px-2'>
            <div className='flex flex-1 items-center space-x-12'>
              {selectedChatRoom ? (
                <Avatar src={toServerUrl('/media/user/avatar/' + chatRoomInfo?.avatar)} />
              ) : (
                <IconButton
                  className=''
                  color='inherit'
                  //   onClick={(ev) => dispatch(openChatPanel())}
                  size='large'
                >
                  <FuseSvgIcon size={24}>heroicons-outline:chat-alt-2</FuseSvgIcon>
                </IconButton>
              )}
              <Hidden smDown>
                {selectedChatRoom ? (
                  <Typography className='text-16' color='inherit' noWrap>
                    {chatRoomInfo?.first_name} {chatRoomInfo?.last_name}
                  </Typography>
                ) : (
                  <Typography className='text-16' color='inherit'>
                    Chat
                  </Typography>
                )}
              </Hidden>
            </div>
            {useMemo(() => {
              function handleSearchText(event: any) {
                // setSearchText(event.target.value)
                dispatch(handleSearch(event.target.value))
              }
              const handleSwitch = (e: any) => {
                // setType(e.target.checked)
                // console.log('e==', e.target.checked)
                dispatch(handleSearchMode(Number(e.target.checked)))
              }

              return (
                <Paper
                  className='flex p-4 mx-2 items-center px-4 py-2 h-30 rounded-4 shadow-none'
                  sx={{background: theme.palette.primary.light}}
                >
                  <FuseSvgIcon color='secondary' size={20}>
                    heroicons-solid:search
                  </FuseSvgIcon>

                  <Input
                    placeholder={searchMode === 1 ? 'Search user ' : 'Search message'}
                    className='flex flex-1 px-8'
                    disableUnderline
                    fullWidth
                    sx={{color: 'white'}}
                    value={searchText}
                    inputProps={{
                      'aria-label': 'Search',
                    }}
                    onChange={handleSearchText}
                  />
                  <IOSSwitch checked={searchMode === 1} onChange={handleSwitch} />
                </Paper>
              )
            }, [searchText, searchMode, dispatch, theme.palette.primary.light])}
            <div className='flex px-4 sm:px-2'>
              <IconButton color='inherit' size={matches ? 'small' : 'large'} onClick={onClose}>
                <FuseSvgIcon size={matches ? 16 : 24}>heroicons-outline:x</FuseSvgIcon>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <Paper className='flex flex-1 flex-row min-h-px shadow-0'>
          <ContactList className='flex shrink-0' />
          <Chat className='flex flex-1 z-10 w-320' />
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

export default withReducer('chat', reducer)(ChatSidePanel)
