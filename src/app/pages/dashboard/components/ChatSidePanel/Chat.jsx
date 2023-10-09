import {styled} from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import clsx from 'clsx'
import {useEffect, useMemo, useRef, useState} from 'react'
import {useDispatch} from 'react-redux'
import FuseSvgIcon from 'src/app/modules/core/FuseSvgIcon/FuseSvgIcon'
import FuseScrollbars from 'src/app/modules/core/FuseScrollbars/FuseScrollbars'
import {Avatar, Box, CircularProgress, Fab, Fade, Grid, Typography} from '@mui/material'
import {getPageMessages, sendMessage} from './store/messageSlice'
import {useAppSelector} from 'src/app/store/hook'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import './chat.css'
import {toServerUrl} from 'src/_metronic/helpers'
import {showMessage} from 'src/app/store/fuse/messageSlice'
import {formatBytes} from 'src/app/helpers/fileHelper'
import {addMessage, removeMessage} from './store/messageSlice'
import Attach from './Attach'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const StyledMessageRow = styled('div')(({theme}) => ({
  '&.contact': {
    '& .bubble': {
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.secondary.contrastText,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
    },
    '& .attachment': {
      '& .time': {
        marginLeft: 12,
      },
    },
    '&.first-of-group': {
      '& .bubble': {
        borderTopLeftRadius: 20,
      },
    },
    '&.last-of-group': {
      '& .bubble': {
        borderBottomLeftRadius: 20,
      },
    },
  },
  '&.me': {
    paddingLeft: 40,

    '& .bubble': {
      marginLeft: 'auto',
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
    },
    '& .attachment': {
      marginLeft: 'auto',
      '& .time': {
        justifyContent: 'flex-end',
        right: 0,
        marginRight: 12,
      },
    },
    '&.first-of-group': {
      '& .bubble': {
        borderTopRightRadius: 20,
      },
    },

    '&.last-of-group': {
      '& .bubble': {
        borderBottomRightRadius: 20,
      },
    },
  },
  '&.contact + .me, &.me + .contact': {
    paddingTop: 20,
    marginTop: 20,
  },
  '&.first-of-group': {
    '& .bubble': {
      borderTopLeftRadius: 20,
      paddingTop: 13,
    },
  },
  '&.last-of-group': {
    '& .bubble': {
      borderBottomLeftRadius: 20,
      paddingBottom: 13,
    },
    '& .attachment': {
      '& .time': {
        display: 'flex',
      },
    },
  },
}))

var store_page_num = 1
function Chat(props) {
  const dispatch = useDispatch()
  const selectedChatRoom = useAppSelector(({chat}) => chat.chatRoom.selectedChatRoom)
  const {messages, typeEvent, loading_messages, current_page} = useAppSelector(
    ({chat}) => chat.messages
  )
  const {chatRoomInfo} = useAppSelector(({chat}) => chat.chatRoom)
  const {user} = useAppSelector(({user}) => user)
  //   const selectedContactId = useSelector(selectSelectedContactId)
  //   const chat = useSelector(selectChat)
  //   const user = useSelector(selectUser)

  const chatScroll = useRef(null)
  const [messageText, setMessageText] = useState('')
  const inputRef = useRef(null)
  const [filePreviews, setFilePreviews] = useState([])
  const [scroll, setScroll] = useState(false)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [messages])

  useEffect(() => {
    if (store_page_num === current_page) {
      scrollToBottom()
    }
    store_page_num = current_page
    // }
  }, [messages, current_page])

  function scrollToBottom() {
    if (!chatScroll.current) {
      return
    }
    chatScroll.current.scrollTo({
      top: chatScroll.current.scrollHeight,
      behavior: 'smooth',
    })
    setScroll(false)
  }

  useEffect(() => {
    const targetDiv = document.getElementById('chat_scroll')

    function handleScroll() {
      if (targetDiv.scrollTop === 0) {
        setScroll(true)
        dispatch(getPageMessages(selectedChatRoom))
      }
    }

    targetDiv.addEventListener('scroll', handleScroll)

    return () => targetDiv.removeEventListener('scroll', handleScroll)
  }, [selectedChatRoom])

  const readFileAsync = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader?.result === 'string') {
          resolve(`data:${file.type};base64,${btoa(reader?.result)}`)
        } else {
          return
        }
      }
      reader.onerror = reject
      reader.readAsBinaryString(file)
    })
  }

  return (
    <Paper
      className={clsx('flex flex-col relative pb-64 shadow', props.className)}
      sx={{background: (theme) => theme.palette.background.default}}
    >
      <Fade in={scroll}>
        <Fab
          size='small'
          color='secondary'
          onClick={() => scrollToBottom()}
          sx={{position: 'absolute', right: 8, top: 10}}
        >
          <KeyboardArrowDownIcon />
        </Fab>
      </Fade>
      <Grid container justifyContent='center'>
        {loading_messages && (
          <Box
            sx={{
              position: 'fixed',
              zIndex: 2000,
              background: 'white',
              borderRadius: '50%',
              width: 40,
              height: 40,
              boxShadow: 1,
              display: 'flex',
            }}
          >
            <CircularProgress sx={{margin: 'auto'}} size={20} />
          </Box>
        )}
      </Grid>
      <FuseScrollbars
        id='chat_scroll'
        ref={chatScroll}
        className='flex flex-1 flex-col overflow-y-auto overscroll-contain'
        option={{suppressScrollX: true, wheelPropagation: false}}
      >
        <div className='flex flex-col flex-1 pb-16 pt-4'>
          {useMemo(() => {
            function isFirstMessageOfGroup(item, i) {
              return i === 0 || (messages[i - 1] && messages[i - 1].user_id !== item.user_id)
            }

            function isLastMessageOfGroup(item, i) {
              return (
                i === messages.length - 1 ||
                (messages[i + 1] && messages[i + 1].user_id !== item.user_id)
              )
            }
            const handleLoadComplete = (item, data) => {
              if (item.type !== undefined) {
                dispatch(
                  sendMessage({
                    message: item.message,
                    channel_id: item.channel_id,
                    channel_type: 'dm',
                    receiver_id: item.user_id,
                    attachments: data
                      .filter((item) => item.success)
                      .map((item) => item.attachment.id),
                  })
                )
                dispatch(removeMessage(item.id))
              }
            }

            return messages?.length > 0
              ? messages.map((item, i) => {
                  return (
                    <StyledMessageRow
                      key={i}
                      className={clsx(
                        'flex flex-col grow-0 shrink-0 items-start justify-end relative px-4 pb-1',
                        item.user_id === user.id ? 'me' : 'contact',
                        {'first-of-group': isFirstMessageOfGroup(item, i)},
                        {'last-of-group': isLastMessageOfGroup(item, i)},
                        i + 1 === messages.length && 'pb-72'
                      )}
                    >
                      {item.message !== '' && item.message !== null && (
                        <div className='bubble flex relative items-center justify-center p-4 max-w-full'>
                          <div className='leading-tight whitespace-pre-wrap'>{item.message}</div>
                        </div>
                      )}
                      <div className='attachment flex relative flex-column max-w-full'>
                        <Attach
                          files={item.attachments !== undefined ? item.attachments : []}
                          onLoadComplete={(data) => handleLoadComplete(item, data)}
                        ></Attach>
                        <Typography
                          variant='caption'
                          className='time absolute hidden w-full mt-8 -mb-24 ltr:left-0 rtl:right-0 -bottom-12 whitespace-nowrap'
                          color='text.secondary'
                        >
                          {formatDistanceToNow(new Date(item?.created_at), {addSuffix: true})}
                        </Typography>
                      </div>
                    </StyledMessageRow>
                  )
                })
              : null
          }, [messages, dispatch, user?.id])}
        </div>

        {messages?.length === 0 && (
          <div className='flex flex-col flex-1'>
            <div className='flex flex-col flex-1 items-center justify-center'>
              <FuseSvgIcon size={128} color='disabled'>
                heroicons-outline:chat
              </FuseSvgIcon>
            </div>
            {selectedChatRoom ? (
              <Typography className='px-16 pb-24 text-center' color='text.secondary'>
                Start a conversation by typing your message below.
              </Typography>
            ) : (
              <Typography className='px-16 pb-24 text-center' color='text.secondary'>
                Please select chatroom to start chat
              </Typography>
            )}
          </div>
        )}
      </FuseScrollbars>

      {useMemo(() => {
        const onMessageSubmit = (ev) => {
          ev.preventDefault()
          if (messageText === '' && filePreviews.length === 0) {
            return
          }
          if (filePreviews.length === 0) {
            dispatch(
              sendMessage({
                message: messageText,
                channel_id: selectedChatRoom,
                channel_type: 'dm',
                receiver_id: chatRoomInfo.id,
              })
            )
          } else {
            dispatch(
              addMessage({
                id: new Date().getTime(),
                type: 'temp',
                message: messageText,
                channel_id: selectedChatRoom,
                user_id: user.id,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                attachments: filePreviews,
              })
            )
          }
          setMessageText('')
          setFilePreviews([])
        }

        const onInputChange = (ev, selectedChatRoom) => {
          setMessageText(ev.target.value)
          let channel = window.Echo.join(`chat.dm.${selectedChatRoom}`)
          setTimeout(() => {
            // console.log('win0==',window.Echo)
            channel.whisper('typing', {
              name: user.last_name,
              avatar: user.avatar,
            })

            // console.log('win1==',window.Echo)
          }, 300)
        }

        const handleRemove = (index) => {
          filePreviews.splice(index, 1)
          setFilePreviews([...filePreviews])
        }

        return (
          <>
            {/* {chat && ( */}
            <form onSubmit={onMessageSubmit} className='pb-3 px-4 absolute bottom-0 left-0 right-0'>
              {/* <Typography variant='caption' textAlign="center">Typing</Typography> */}
              {typeEvent ? (
                <div className='typing-container'>
                  <Avatar
                    sx={{width: 30, height: 30}}
                    src={toServerUrl('/media/user/avatar/' + typeEvent?.avatar)}
                  />

                  <div>
                    <div className='typingBubble'>
                      <div className='dot'></div>
                      <div className='dot'></div>
                      <div className='dot'></div>
                    </div>
                    <span>{typeEvent?.name} is typing... </span>
                  </div>
                </div>
              ) : null}

              {/* {typingArrayReady()} */}
              <Paper className='relative shadow' sx={{borderRadius: '1.2rem'}}>
                <Grid
                  container
                  direction={'row'}
                  gap={1}
                  sx={{paddingTop: filePreviews.length > 0 ? '12px' : '0px'}}
                >
                  {filePreviews?.map((item, index) => (
                    <div
                      onClick={() => handleRemove(index)}
                      role='button'
                      tabIndex={0}
                      className='w-120 h-120 rounded-8 mx-2 mb-2 pt-1 px-2 pb-3 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg'
                      key={index}
                    >
                      <div className='flex justify-content-end'>
                        <FuseSvgIcon>heroicons-outline:x-circle</FuseSvgIcon>
                      </div>
                      <FuseSvgIcon size={30}>heroicons-outline:document-text</FuseSvgIcon>
                      <Typography
                        variant='h6'
                        color='text.secondary'
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          paddingTop: '15px',
                          paddingBottom: '20px',
                        }}
                      >
                        {typeof item === 'string' ? item : item.file.name}
                      </Typography>
                      <Typography
                        variant='caption'
                        color='text.secondary'
                        sx={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}
                      >
                        {typeof item === 'string' ? item : formatBytes(item.file.size)}
                      </Typography>
                    </div>
                  ))}
                </Grid>
                <Grid container direction='row' alignItems='center' justifyContent='flex-end'>
                  <Grid item flexGrow={1}>
                    <textarea
                      multiple
                      rows={3}
                      // autoFocus
                      type='text'
                      ref={inputRef}
                      disabled={selectedChatRoom === null}
                      id='message-input'
                      className='mx-4 focus:outline-none my-6  flex w-full'
                      // className='flex flex-1 grow shrink-0 mx-16 ltr:mr-48 rtl:ml-48 my-6 border-x-0'
                      placeholder='Type your message'
                      onChange={(e) => onInputChange(e, selectedChatRoom)}
                      value={messageText}
                    />
                  </Grid>
                  <Grid item>
                    <IconButton
                      className='absolute ltr:right-0 rtl:left-0 top-0'
                      type='submit'
                      size='small'
                      disabled={selectedChatRoom === null}
                    >
                      <FuseSvgIcon className='rotate-90' size={16} color='action'>
                        heroicons-outline:paper-airplane
                      </FuseSvgIcon>
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton
                      className='absolute ltr:right-0 rtl:left-0 top-0'
                      size='small'
                      component='label'
                      disabled={selectedChatRoom === null}
                    >
                      <input
                        id='chat-attachment'
                        hidden
                        accept='.doc, .docx, .pdf, .exe'
                        type='file'
                        onChange={async (e) => {
                          const files = Array.from(e.target.files)
                          if (files.length > 5) {
                            dispatch(
                              showMessage({
                                message: 'Only allow up to 5 attachments per chat.',
                                variant: 'error',
                              })
                            )
                          } else {
                            const filePreviewsPromises = files.map(async (file) => {
                              const fileDataUrl = await readFileAsync(file)
                              return {file, fileDataUrl}
                            })

                            const newFilePreviews = await Promise.all(filePreviewsPromises)
                            let canUpload = true
                            newFilePreviews.forEach((item) => {
                              if (item.file.size > 10485760) {
                                canUpload = false
                                return
                              }
                            })
                            if (canUpload) {
                              setFilePreviews([...filePreviews, ...newFilePreviews])
                            } else {
                              dispatch(
                                showMessage({
                                  message: 'Only allow sizes up to 10 MB.',
                                  variant: 'error',
                                })
                              )
                            }
                          }
                        }}
                        multiple
                      />
                      <FuseSvgIcon color='action' size={16}>
                        heroicons-outline:paper-clip
                      </FuseSvgIcon>
                    </IconButton>
                  </Grid>
                </Grid>
              </Paper>
            </form>
            {/* )} */}
          </>
        )
      }, [
        dispatch,
        messageText,
        selectedChatRoom,
        typeEvent,
        filePreviews,
        chatRoomInfo.id,
        user.id,
        user.avatar,
        user.last_name,
      ])}
    </Paper>
  )
}

export default Chat
