import {styled} from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import clsx from 'clsx'
import {useEffect, useMemo, useRef, useState} from 'react'
import {useDispatch} from 'react-redux'
import InputBase from '@mui/material/InputBase'
import FuseSvgIcon from 'src/app/modules/core/FuseSvgIcon/FuseSvgIcon'
import FuseScrollbars from 'src/app/modules/core/FuseScrollbars/FuseScrollbars'
import {Avatar, Typography} from '@mui/material'
import {sendMessage} from './store/messageSlice'
import {useAppSelector} from 'src/app/store/hook'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import './chat.css'
import {toServerUrl} from 'src/_metronic/helpers'

const StyledMessageRow = styled('div')(({theme}) => ({
  '&.contact': {
    '& .bubble': {
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.secondary.contrastText,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
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
      '& .time': {
        display: 'flex',
      },
    },
  },
}))

function Chat(props) {
  const dispatch = useDispatch()
  const selectedChatRoom = useAppSelector(({chat}) => chat.chatRoom.selectedChatRoom)
  const {messages, typeEvent} = useAppSelector(({chat}) => chat.messages)
  const {chatRoomInfo} = useAppSelector(({chat}) => chat.chatRoom)
  console.log('typeEvent===', typeEvent)
  const {user} = useAppSelector(({user}) => user)
  //   const selectedContactId = useSelector(selectSelectedContactId)
  //   const chat = useSelector(selectChat)
  //   const user = useSelector(selectUser)

  const chatScroll = useRef(null)
  const [messageText, setMessageText] = useState('')

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  function scrollToBottom() {
    if (!chatScroll.current) {
      return
    }
    chatScroll.current.scrollTo({
      top: chatScroll.current.scrollHeight,
      behavior: 'smooth',
    })
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

  return (
    <Paper
      className={clsx('flex flex-col relative pb-64 shadow', props.className)}
      sx={{background: (theme) => theme.palette.background.default}}
    >
      <FuseScrollbars
        ref={chatScroll}
        className='flex flex-1 flex-col overflow-y-auto overscroll-contain'
        option={{suppressScrollX: true, wheelPropagation: false}}
      >
        <div className='flex flex-col flex-1 pb-16'>
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
                      <div className='bubble flex relative items-center justify-center p-4 max-w-full'>
                        <div className='leading-tight whitespace-pre-wrap'>{item.message}</div>
                        <Typography
                          variant='caption'
                          className='time absolute hidden w-full mt-8 -mb-24 ltr:left-0 rtl:right-0 -bottom-12 whitespace-nowrap'
                          color='text.secondary'
                        >
                          {formatDistanceToNow(new Date(item.created_at), {addSuffix: true})}
                        </Typography>
                      </div>
                    </StyledMessageRow>
                  )
                })
              : null
          }, [messages, user?.id])}
        </div>

        {messages?.length === 0 && (
          <div className='flex flex-col flex-1'>
            <div className='flex flex-col flex-1 items-center justify-center'>
              <FuseSvgIcon size={128} color='disabled'>
                heroicons-outline:chat
              </FuseSvgIcon>
            </div>
            <Typography className='px-16 pb-24 text-center' color='text.secondary'>
              Start a conversation by typing your message below.
            </Typography>
          </div>
        )}
      </FuseScrollbars>

      {useMemo(() => {
        const onMessageSubmit = (ev) => {
          ev.preventDefault()
          if (messageText === '') {
            return
          }
          dispatch(
            sendMessage({
              message: messageText,
              channel_id: selectedChatRoom,
              channel_type: 'dm',
              receiver_id: chatRoomInfo.id,
            })
          ).then(() => {
            setMessageText('')
          })
        }

        return (
          <>
            {/* {chat && ( */}
            <form onSubmit={onMessageSubmit} className='pb-6 px-8 absolute bottom-0 left-0 right-0'>
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
              <Paper className='flex items-center relative shadow' sx={{borderRadius: '2.4rem'}}>
                <InputBase
                  autoFocus={false}
                  id='message-input'
                  className='flex flex-1 grow shrink-0 mx-16 ltr:mr-48 rtl:ml-48 my-6'
                  placeholder='Type your message'
                  onChange={(e) => onInputChange(e, selectedChatRoom)}
                  value={messageText}
                />
                <IconButton
                  className='absolute ltr:right-0 rtl:left-0 top-0'
                  type='submit'
                  size='large'
                >
                  <FuseSvgIcon className='rotate-90' color='action'>
                    heroicons-outline:paper-airplane
                  </FuseSvgIcon>
                </IconButton>
              </Paper>
            </form>
            {/* )} */}
          </>
        )
      }, [dispatch, messageText, selectedChatRoom, typeEvent])}
    </Paper>
  )
}

export default Chat
