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
import {Avatar, Fab, Hidden, Menu, MenuItem, useMediaQuery} from '@mui/material'
import {useAppDispatch, useAppSelector} from 'src/app/store/hook'
import {logoutUser} from 'src/app/store/userSlice'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window
}

const drawerWidth = 240
const filterDrawerWidth = 300

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})<{
  open?: boolean
}>(({theme, open}) => ({
  flexGrow: 1,
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
  const theme = useTheme()
  const [open, setOpen] = React.useState(true)
  const dispatch = useAppDispatch()
  const user = useAppSelector(({user}) => user.user)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
  const {window} = props
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [filterOpen, setFilterOpen] = React.useState(false)
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
    <Box sx={{display: 'flex'}}>
      <CssBaseline />
      <AppBar
        position='fixed'
        open={open}
        color='default'
        sx={{
          zIndex: 1000,
          boxShadow: 1,
          ...(open && {width: {sm: `calc(100% - ${drawerWidth}px)`}, ml: {sm: `${drawerWidth}px`}}),
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
            background: theme.palette.background.paper,
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
        sx={{'& .MuiDrawer-paper': {width: filterDrawerWidth}}}
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
      >
        <DrawerHeader>
          <Toolbar />
        </DrawerHeader>
        <Divider />
        <MenuInner type='drawer' />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  )
}
