import * as React from 'react'
import {styled, useTheme} from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import {Tooltip} from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom'
import SidebarMenuMain from './components/sidebar/sidebar-menu/SidebarMenuMain'
import {toAbsoluteUrl, toServerUrl} from '../helpers'
import {Avatar, Badge, Fab, Hidden, Menu, MenuItem, useMediaQuery} from '@mui/material'
import {useAppDispatch, useAppSelector} from 'src/app/store/hook'
import {logoutUser} from 'src/app/store/userSlice'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import {MenuInner} from './components/header/header-menus/MenuInner'
import FuseSvgIcon from 'src/app/modules/core/FuseSvgIcon/FuseSvgIcon'
import ChatSidePanel from 'src/app/pages/dashboard/components/ChatSidePanel'
import GlobalStyles from '@mui/material/GlobalStyles'
import {alpha} from '@mui/material/styles'
import {deselectChatRoom} from 'src/app/pages/dashboard/components/ChatSidePanel/store/chatRoomSlice'
import {removeMessages} from 'src/app/pages/dashboard/components/ChatSidePanel/store/messageSlice'
import {blueGrey} from '@mui/material/colors'

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window
}

const inputGlobalStyles = (
  <GlobalStyles
    styles={(theme) => ({
      html: {
        backgroundColor: `${theme.palette.background.default}!important`,
        color: `${theme.palette.text.primary}!important`,
      },
      body: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      },
      /*  'code:not([class*="language-"])': {
        color: theme.palette.secondary.dark,
        backgroundColor:
          theme.palette.mode === 'light' ? 'rgba(255, 255, 255, .9)' : 'rgba(0, 0, 0, .9)',
        padding: '2px 3px',
        borderRadius: 2,
        lineHeight: 1.7,
      }, */
      'table.simple tbody tr td': {
        borderColor: theme.palette.divider,
      },
      'table.simple thead tr th': {
        borderColor: theme.palette.divider,
      },
      'a:not([role=button]):not(.MuiButtonBase-root)': {
        color: theme.palette.secondary.main,
        textDecoration: 'underline',
        '&:hover': {},
      },
      'a.link, a:not([role=button])[target=_blank]': {
        background: alpha(theme.palette.secondary.main, 0.2),
        color: 'inherit',
        borderBottom: `1px solid ${theme.palette.divider}`,
        textDecoration: 'none',
        '&:hover': {
          background: alpha(theme.palette.secondary.main, 0.3),
          textDecoration: 'none',
        },
      },
      '[class^="border"]': {
        borderColor: theme.palette.divider,
      },
      '[class*="border"]': {
        borderColor: theme.palette.divider,
      },
      '[class*="divide-"] > :not([hidden]) ~ :not([hidden])': {
        borderColor: theme.palette.divider,
      },
      hr: {
        borderColor: theme.palette.divider,
      },

      '::-webkit-scrollbar-thumb': {
        boxShadow: `inset 0 0 0 20px ${
          theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.24)' : 'rgba(255, 255, 255, 0.24)'
        }`,
      },
      '::-webkit-scrollbar-thumb:active': {
        boxShadow: `inset 0 0 0 20px ${
          theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.37)' : 'rgba(255, 255, 255, 0.37)'
        }`,
      },
    })}
  />
)

const drawerWidth = 240
const filterDrawerWidth = 300

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})<{
  open?: boolean
}>(({theme, open}) => ({
  flexGrow: 1,
  background: '#f5f8fa',
  padding: theme.spacing(3),
  // [theme.breakpoints.down('sm')]: {
  //   width: `calc(100% - ${drawerWidth}px)`,
  // },
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [theme.breakpoints.not('xs')]: {
    ...(!open && {marginLeft: `-${drawerWidth}px`}),
  },
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
  [theme.breakpoints.down('sm')]: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1), // Modify the value here to adjust the padding for small devices
    // Modify the value here to adjust the padding for small devices
  },
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    // width: `calc(100% - ${drawerWidth}px)`,
    // marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const DrawerHeader = styled('div')(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}))

export default function AppLayout(props: Props) {
  const {selectedChatRoom, total_unread_count} = useAppSelector(({chat}) => chat.chatRoom)
  const theme = useTheme()
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(true)
  const dispatch = useAppDispatch()
  const user = useAppSelector(({user}) => user.user)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
  const {window} = props
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [filterOpen, setFilterOpen] = React.useState(false)
  const [chatOpen, setChatOpen] = React.useState<boolean>(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  const handleDrawerOpen = () => {
    setOpen(!open)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const externalLink = 'https://www.example.com' // Replace this with your external link

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const {pathname} = useLocation()

  React.useEffect(() => {
    if (pathname == '/youtube') {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }, [pathname])

  const container = window !== undefined ? () => window().document.body : undefined
  const matches = useMediaQuery(theme.breakpoints.not('xs'))
  return (
    <>
      {inputGlobalStyles}
      <Box sx={{display: 'flex'}}>
        {/* <CssBaseline /> */}
        <AppBar
          position='fixed'
          open={open}
          color='default'
          sx={{
            zIndex: 1000,
            boxShadow: 1,
            ...(open && {
              width: {sm: `calc(100% - ${drawerWidth}px)`},
              ml: {sm: `${drawerWidth}px`},
            }),
          }}
        >
          <Toolbar>
            <img
              className='h-35px app-sidebar-logo-default'
              src={toAbsoluteUrl('/media/logos/logo.png')}
              style={{marginRight: '20px', ...(open && {display: 'none'})}}
            />
            {/* <Hidden smUp>
            <img
              className='h-35px app-sidebar-logo-default'
              src={toAbsoluteUrl('/media/logos/logo.png')}
              style={{marginRight: '20px', ...(open && {display: 'block'})}}
            />
          </Hidden> */}
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={() => (matches ? handleDrawerOpen() : handleDrawerToggle())}
              edge='start'
              sx={{
                mr: 2,
                ...(open && {display: {sm: 'none'}}),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{flexGrow: 1}}>
              {/* <Hidden mdDown> */}
              <MenuInner type='header' />
              {/* </Hidden> */}
            </Box>

            <Tooltip title='Help us improve this platform. We need your Feedback.' arrow>
              <a
                href={
                  'https://docs.google.com/forms/d/e/1FAIpQLSc83BeNQnjY9HaTLZvrJJxbuEmzw4DmWBQr_gZKjIG7g32H4w/viewform?pli=1'
                }
                target='_blank'
                rel='noopener noreferrer'
                style={{textDecoration: 'none', background: 'transparent'}}
              >
                <IconButton className='mx-0'>
                  <FuseSvgIcon size={24} color={'primary'}>
                    heroicons-solid:star
                  </FuseSvgIcon>
                </IconButton>
              </a>
            </Tooltip>
            <Tooltip title='Need Help?' arrow>
              {/* <a
                href={
                  'https://docs.google.com/forms/d/e/1FAIpQLSc83BeNQnjY9HaTLZvrJJxbuEmzw4DmWBQr_gZKjIG7g32H4w/viewform?pli=1'
                }
                target='_blank'
                rel='noopener noreferrer'
                style={{textDecoration: 'none', background: 'transparent'}}
              > */}
              <IconButton className='mx-0' onClick={() => navigate('support')}>
                <FuseSvgIcon size={24} color={'primary'}>
                  heroicons-solid:question-mark-circle
                </FuseSvgIcon>
              </IconButton>
              {/* </a> */}
            </Tooltip>
            <Tooltip title='Click to open chat' arrow>
              <IconButton
                className='mx-4 sm:mx-2'
                onClick={() => {
                  setChatOpen(true)
                }}
              >
                <Badge badgeContent={total_unread_count} color='error'>
                  <FuseSvgIcon size={24}>heroicons-outline:chat-alt-2</FuseSvgIcon>
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title='Click to open Profile' arrow>
              <Avatar
                sx={{cursor: 'pointer'}}
                src={toServerUrl('/media/user/avatar/' + user?.avatar)}
                onClick={handleOpenUserMenu}
              />
            </Tooltip>
            <Menu
              sx={{mt: '45px'}}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <div className='menu-item px-3'>
                <div className='menu-content d-flex align-items-center px-3'>
                  <div className='symbol symbol-50px me-5'>
                    <img alt='Logo' src={toServerUrl('/media/user/avatar/' + user?.avatar)} />
                  </div>

                  <div className='d-flex flex-column'>
                    <a href='#' className='fw-bold text-muted text-hover-primary fs-7'>
                      {user?.email}
                    </a>
                    <Typography>{user.role}</Typography>
                  </div>
                </div>
              </div>

              <div className='separator my-2'></div>
              <div className='menu-item px-5'>
                <Link to={'/crafted/account'} className='menu-link px-5'>
                  My Profile
                </Link>
              </div>

              <div className='separator my-2'></div>

              <div className='menu-item px-5 my-1'>
                <Link to='/account/info' className='menu-link px-5'>
                  Account Settings
                </Link>
              </div>

              <div className='menu-item px-5'>
                <a onClick={() => dispatch(logoutUser())} className='menu-link px-5'>
                  Sign Out
                </a>
              </div>
            </Menu>
            {/* <Typography variant='h6' noWrap component='div'>
            Persistent drawer
          </Typography> */}
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Box
            onClick={() => setFilterOpen(!filterOpen)}
            sx={{
              position: 'fixed',
              top: 80,
              right: -26,
              ...(filterOpen && {right: filterDrawerWidth - 26}),
              // width: 50,
              // height: 50,
              // m: 'auto',
              p: '10px 30px 10px 10px',
              borderRadius: 8,
              background: theme.palette.secondary.main,
              transition: 'right 0.3s ease',
              boxShadow: theme.shadows[1],
              zIndex: 1200,
              '&:hover': {
                right: -14,
                // mr: 10,
                // p: '10px 20px 10px 10px',
              },
            }}
          >
            {/* <Fab> */}
            <FilterAltOutlinedIcon color='primary' />
            {/* </Fab> */}
          </Box>
        </Hidden>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: {xs: 'block', sm: 'none'},
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          {/* <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: theme.palette.primary.dark,
          },
        }}
        variant='temporary'
        anchor='left'
        open={open}
      > */}
          <DrawerHeader>
            <img
              alt='Logo'
              src={toAbsoluteUrl('/media/logos/logo_dark.png')}
              className='h-35px app-sidebar-logo-default'
            />
            <IconButton color='secondary' onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <SidebarMenuMain />
        </Drawer>

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            display: {xs: 'none', sm: 'block'},
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: theme.palette.primary.dark,
            },
          }}
          variant='persistent'
          anchor='left'
          open={open}
        >
          <DrawerHeader>
            <img
              alt='Logo'
              src={toAbsoluteUrl('/media/logos/logo_dark.png')}
              className='h-35px app-sidebar-logo-default'
            />
            <IconButton color='secondary' onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <SidebarMenuMain />
        </Drawer>
        <Drawer
          anchor='right'
          sx={{'& .MuiDrawer-paper': {width: filterDrawerWidth, px: 2}}}
          open={filterOpen}
          onClose={() => setFilterOpen(false)}
        >
          <DrawerHeader>
            <Toolbar />
          </DrawerHeader>
          <Divider />
          <MenuInner type='drawer' />
        </Drawer>
        <Drawer
          open={chatOpen || selectedChatRoom}
          anchor='right'
          variant='persistent'
          PaperProps={{sx: {overflowY: 'clip'}}}
          onClose={() => {
            setChatOpen(false)
            dispatch(deselectChatRoom())
            dispatch(removeMessages())
          }}
        >
          <ChatSidePanel
            opened={chatOpen}
            onClose={() => {
              setChatOpen(false)
              dispatch(deselectChatRoom())
              dispatch(removeMessages())
            }}
          />
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <Outlet />
        </Main>
      </Box>
    </>
  )
}
