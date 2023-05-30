import * as React from 'react'
import {styled, useTheme} from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
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
import {Link, Outlet, useLocation} from 'react-router-dom'
import SidebarMenuMain from './components/sidebar/sidebar-menu/SidebarMenuMain'
import {toAbsoluteUrl, toServerUrl} from '../helpers'
import {MenuInner} from './components/header/header-menus'
import {Avatar, Menu, MenuItem} from '@mui/material'
import {useAppDispatch, useAppSelector} from 'src/app/store/hook'
import {logoutUser} from 'src/app/store/userSlice'

const drawerWidth = 240

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})<{
  open?: boolean
}>(({theme, open}) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
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
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
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

export default function AppLayout() {
  const theme = useTheme()
  const [open, setOpen] = React.useState(true)
  const dispatch = useAppDispatch()
  const user = useAppSelector(({user}) => user.user)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

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

  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline />
      <AppBar position='fixed' open={open} color='default' sx={{zIndex: 1000, boxShadow: 1}}>
        <Toolbar>
          <img
            className='h-35px app-sidebar-logo-default'
            src={toAbsoluteUrl('/media/logos/logo.png')}
            style={{marginRight: '20px', ...(open && {display: 'none'})}}
          />
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{mr: 2, ...(open && {display: 'none'})}}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{flexGrow: 1}}>
            <MenuInner />
          </Box>
          <Avatar
            sx={{cursor: 'pointer'}}
            src={toServerUrl('/media/user/avatar/' + user?.avatar)}
            onClick={handleOpenUserMenu}
          />
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
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
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
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  )
}
