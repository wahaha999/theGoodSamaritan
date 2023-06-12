import {Button, Typography, Paper, Avatar, Grid} from '@mui/material'
import React, {useMemo, useState} from 'react'
import {Manager, Popper, Reference} from 'react-popper'
import {useDebounce} from 'src/app/modules/hooks'
import * as ReactDOM from 'react-dom'
import {red} from '@mui/material/colors'
import {motion, AnimatePresence} from 'framer-motion'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import ConnectWithoutContactOutlinedIcon from '@mui/icons-material/ConnectWithoutContactOutlined'
import {toServerUrl} from 'src/_metronic/helpers'

const params = ['0~50', '51~100', '101~200', '201~500', '501~1000', '1000~']

const PostAccountView = (props) => {
  const {avatar, data} = props
  const {user} = data
  const {account} = user
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
              sx={{bgcolor: red[500], mr: 2, cursor: 'pointer'}}
              onMouseEnter={() => handleToggle(true)}
              onMouseLeave={() => handleToggle(false)}
              aria-label='recipe'
              src={avatar}
            />
          )}
        </Reference>
        {ReactDOM.createPortal(
          <Popper placement='bottom-start' eventsEnabled={open} positionFixed>
            {({ref, style, placement}) => {
              return (
                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{opacity: 0}}
                      animate={{opacity: 1}}
                      exit={{opacity: 0}}
                      transition={{duration: 0.3}}
                      // transition={{duration: 1}}
                      ref={ref}
                      style={{
                        ...style,
                        top: -50,
                        left: -20,
                        zIndex: 1000,
                        width: 'auto',
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
                                src={toServerUrl('/media/account/avatar/' + account.avatar)}
                              />
                            </Grid>
                            <Grid item direction='column'>
                              <Typography>{account.non_profit_name}</Typography>
                            </Grid>
                          </Grid>
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
                                {user.first_name} {user.last_name}
                              </Typography>
                              <Typography variant='subtitle1'>{user.email}</Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid container spacing={2} my={2}>
                        <Grid item md={6}>
                          <Typography variant='subtitle1'>
                            Organize: {params[account.organize]}
                          </Typography>
                        </Grid>

                        <Grid item md={6}>
                          <Typography variant='subtitle1'>
                            Phone Number: {account.phone_number}
                          </Typography>
                        </Grid>
                        <Grid item md={6}>
                          <Typography variant='subtitle1'>
                            Fax Number: {account.fax_number ?? ''}
                          </Typography>{' '}
                        </Grid>
                      </Grid>
                      <Typography variant='subtitle1'>Mission of Organize:</Typography>
                      <div
                        dangerouslySetInnerHTML={{__html: account.mission}}
                        style={{padding: '4px'}}
                      ></div>
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
                          <Button
                            variant='contained'
                            startIcon={<ConnectWithoutContactOutlinedIcon />}
                          >
                            Connect
                          </Button>
                        </motion.div>
                        <motion.div
                          initial={{opacity: 0}}
                          // transition={{duration: 1}}
                          animate={{opacity: 1}}
                        >
                          <Button variant='outlined' startIcon={<SendOutlinedIcon />}>
                            Message
                          </Button>
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
