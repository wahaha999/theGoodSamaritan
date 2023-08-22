import styled from '@emotion/styled'
import {
  Avatar,
  Button,
  Grid,
  Hidden,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import {Theme} from '@mui/material'
import clsx from 'clsx'
import React from 'react'
import {toServerUrl} from 'src/_metronic/helpers'
import {useAppDispatch, useAppSelector} from 'src/app/store/hook'
import {dmSelect} from './store/messageSlice'
import {formatDistanceToNow} from 'date-fns'

interface Props {
  info: any
  channel_id: number
  data: any
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

const Root = styled(Tooltip)<any>(({theme, active, isMobile}) => ({
  width: isMobile ? 70 : 250,
  minWidth: 70,
  flex: '0 0 auto',
  '&: hover': {background: theme.palette.secondary.light},
  ...(active && {
    backgroundColor: theme.palette.secondary.light,
    // '&:after': {
    //   position: 'absolute',
    //   top: 8,
    //   right: 0,
    //   bottom: 8,
    //   content: "''",
    //   width: 4,
    //   borderTopLeftRadius: 4,
    //   borderBottomLeftRadius: 4,
    //   backgroundColor: theme.palette.primary.main,
    // },
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
  backgroundColor: theme.palette.error.main,
  color: theme.palette.error.contrastText,
  boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.35)',
  zIndex: 10,
}))

const StyledStatus = styled('div', {shouldForwardProp: (prop) => prop !== 'value'})<any>(
  ({theme, value}) => ({
    position: 'absolute',
    width: 16,
    height: 16,
    bottom: 8,
    left: 48,
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
  const {selectedChatRoom, onlineUsers} = useAppSelector(({chat}) => chat.chatRoom)
  const {info, channel_id, data} = props
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <Root
      title={info.name}
      placement='left'
      active={channel_id === selectedChatRoom ? 1 : 0}
      isMobile={matches}
    >
      <Button
        className={clsx(
          'contactButton rounded-3 py-4 h-auto min-h-auto max-h-none max-w-none',
          channel_id === selectedChatRoom && 'active'
        )}
        onClick={() => dispatch(dmSelect({channel_id, info}))}
        sx={{textTransform: 'none'}}
      >
        <Grid container alignItems='center' columnGap={1}>
          <Grid item>
            {data.unread_count > 0 && <StyledUreadBadge>{data.unread_count}</StyledUreadBadge>}
            <StyledStatus value={onlineUsers.includes(info.id) ? 'online' : 'offline'} />
            <Avatar
              src={toServerUrl('/media/user/avatar/' + info?.avatar)}
              sx={{width: 50, height: 50}}
            />{' '}
          </Grid>
          <Hidden smDown>
            <Grid item sm zeroMinWidth container>
              <Grid
                item
                container
                direction='column'
                justifyContent='space-between'
                alignItems='flex-start'
              >
                <Grid item>
                  <Typography>
                    {info.first_name} {info?.last_name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant='caption'
                    color='GrayText'
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      textAlign: 'start',
                    }}
                  >
                    {data.last_message ?? 'Noting yet'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Hidden>
        </Grid>
        <Hidden smDown>
          <Typography
            variant='caption'
            color='CaptionText'
            sx={{position: 'absolute', right: 0, top: 0}}
          >
            {formatDistanceToNow(new Date(data.updated_at))}
          </Typography>
        </Hidden>
      </Button>
    </Root>
  )
}

export default ContactButton
