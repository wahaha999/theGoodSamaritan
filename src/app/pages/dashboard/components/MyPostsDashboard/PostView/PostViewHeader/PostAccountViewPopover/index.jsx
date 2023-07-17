import {Button, Typography, Paper, Avatar, Grid, Tooltip, TextField} from '@mui/material'
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined'
import React, {useMemo, useState} from 'react'
import {Manager, Popper, Reference} from 'react-popper'
import {useDebounce} from 'src/app/modules/hooks'
import * as ReactDOM from 'react-dom'
import {red} from '@mui/material/colors'
import {motion, AnimatePresence} from 'framer-motion'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import ConnectWithoutContactOutlinedIcon from '@mui/icons-material/ConnectWithoutContactOutlined'
import {toServerUrl} from 'src/_metronic/helpers'
import {maxWidth} from '@mui/system'
import {Link} from '@react-email/link'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import {useAppDispatch} from 'src/app/store/hook'
import {openConnDialog} from 'src/app/pages/dashboard/store/connectDialogSlice'
import ChatButton from '../../component/ChatButton'

const params = ['0~50', '51~100', '101~200', '201~500', '501~1000', '1000~']

const PostAccountView = (props) => {
  const {avatar, data, width, height, status} = props
  const {user} = data
  const {account} = user
  const dispatch = useAppDispatch()
  const [open, setOpened] = useState(false)
  const handleToggle = useDebounce((open) => {
    setOpened(open)
  }, 150)

  return useMemo(() => {
    return (
      <Manager>
        <Reference>
          {({ref}) => (
            <Avatar
              ref={ref}
              sx={{
                bgcolor: red[500],
                mr: 2,
                cursor: 'pointer',
                width: width ? width : 'none',
                height: height ? height : 'none',
              }}
              onMouseEnter={() => handleToggle(true)}
              onMouseLeave={() => handleToggle(false)}
              aria-label='recipe'
              src={avatar}
            />
          )}
        </Reference>
        {ReactDOM.createPortal(
          <Popper placement='bottom-start' eventsEnabled={open} disablePortal={true}>
            {({ref, style, placement}) => {
              return (
                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{opacity: 0}}
                      animate={{opacity: 1}}
                      exit={{opacity: 0}}
                      transition={{duration: 0.3}}
                      ref={ref}
                      style={{
                        ...style,
                        zIndex: 1000,
                        //width: 'auto',
                        minWidth: '500px',
                        // minWidth: 500,
                        height: 'auto',
                        borderRadius: '8px',
                        background: '#fff',
                        padding: '20px',
                        boxShadow: '0px 1px 60px -9px rgba(0,0,0,0.47)',
                      }}
                      data-placement={placement}
                      className='z-1000'
                      onMouseEnter={() => handleToggle(true)}
                      onMouseLeave={() => handleToggle(false)}
                    >
                      {/* <Paper
                        sx={{
                          width: 300,
                          height: 200,
                          borderRadius: 4,
                          p: 2,
                          boxShadow: '10px 10px 26px -11px rgba(0,0,0,0.75)',
                        }}
                        onMouseEnter={() => handleToggle(true)}
                        onMouseLeave={() => handleToggle(false)}
                      > */}
                      <Grid container spacing={4}>
                        <Grid item>
                          <Grid container alignItems='center' spacing={2}>
                            <Grid item>
                              <motion.img
                                transition={{type: 'spring', damping: 10, stiffness: 100}}
                                animate={{scale: 1.1}}
                                style={{width: '70px', height: '70px', borderRadius: '50%'}}
                                src={toServerUrl('/media/account/avatar/' + account?.avatar)}
                              />
                            </Grid>
                            <Grid item direction='column'>
                              <Typography>{user?.account.non_profit_name}</Typography>
                              <Typography variant='subtitle1'>
                                Phone: {account.phone_number}
                              </Typography>
                              <Typography variant='subtitle1'>
                                {' '}
                                Organization Size: {params[account.organize]}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid container spacing={1} my={1}>
                        <Grid item md={12}></Grid>
                      </Grid>
                      <Typography variant='subtitle1'>
                        <h2>Our Mission:</h2>
                      </Typography>
                      <div
                        dangerouslySetInnerHTML={{__html: account.mission}}
                        style={{
                          padding: '4px',
                          maxWidth: '500px',
                          maxHeight: '200px',
                          overflowY: 'auto',
                        }}
                      ></div>

                      <Grid container spacing={1} my={1}>
                        <Grid item md={12}></Grid>
                      </Grid>
                      <Grid item>
                        <Grid container alignItems='center' spacing={2}>
                          <Grid item>
                            <motion.img
                              transition={{type: 'spring', damping: 10, stiffness: 100}}
                              animate={{scale: 1.1}}
                              style={{width: '70px', height: '70px', borderRadius: '50%'}}
                              src={toServerUrl('/media/user/avatar/' + user?.avatar)}
                            />
                          </Grid>
                          <Grid item direction='column'>
                            <Typography>
                              Posted By: {user.first_name} {user.last_name}
                            </Typography>
                            <Typography variant='subtitle1'>
                              <Link href={`mailto:${user.email}`} className='underline'>
                                {user.email}
                              </Link>
                            </Typography>
                            <Typography variant='subtitle1'>{user.phone_number}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid container alignItems='center' spacing={2} marginTop={3}>
                          <Grid item>
                            <LocationOnIcon color='primary' sx={{mr: 2}} />

                            <Typography
                              color='purple'
                              component='a'
                              target='_blank'
                              href={`https://www.google.com/maps/place/${
                                user.account.address || ''
                              } ${user.account.city || ''} ${user.account.state || ''} ${
                                user.zip_code || ''
                              }`}
                            >
                              {user.account.address} , {user.account.city} {user.account.state}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid container spacing={1} my={1}>
                        <Grid item md={12}></Grid>
                      </Grid>
                      <Grid
                        container
                        direction='row'
                        justifyContent='space-around'
                        alignItems='flex-end'
                        mt={2}
                      >
                        <motion.div
                          initial={{opacity: 0}}
                          // transition={{duration: 1}}
                          animate={{opacity: 1}}
                        >
                          <Tooltip title='Connect and follow conversations with this organization'>
                            <Button
                              disabled={status}
                              variant='contained'
                              startIcon={<ConnectWithoutContactOutlinedIcon />}
                            >
                              {status ? status : 'Connect'}
                            </Button>
                          </Tooltip>
                        </motion.div>
                        <motion.div
                          initial={{opacity: 0}}
                          // transition={{duration: 1}}
                          animate={{opacity: 1}}
                        >
                          {/* <Tooltip title='Chat with this organization'>
                            <Button
                              startIcon={<ForumOutlinedIcon />}
                              sx={{mr: 2}}
                              variant='outlined'
                              onClick={() => {
                                dispatch(openConnDialog({open: true, info: user}))
                              }}
                            >
                              Chat
                            </Button>
                          </Tooltip> */}
                          <ChatButton info={user} />
                        </motion.div>
                      </Grid>
                      {/* </Paper> */}
                    </motion.div>
                  )}
                </AnimatePresence>
              )
            }}
          </Popper>,
          document.querySelector('#root')
        )}
      </Manager>
    )
  }, [open, user, account])
}

export default PostAccountView
