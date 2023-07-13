import React, {useState} from 'react'
import {
  Stack,
  Grid,
  Typography,
  IconButton,
  Badge,
  Tooltip,
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
} from '@mui/material'
import {toAbsoluteUrl, toServerUrl} from '../../../../../_metronic/helpers'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import {useAppDispatch} from 'src/app/store/hook'
import {updateConnection} from '../../store/connectionSlice'
import PostAccountView from '../MyPostsDashboard/PostView/PostViewHeader/PostAccountViewPopover'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'

type Props = {
  title: string
  img: string
  pending?: boolean
  request?: boolean
  connection_id: number
  data?: any
  status?: string
  selectedUser?: number[]
  setSelectedUser?: any
}

const PostTitleItem = (props: Props) => {
  const {title, img, data, request, pending, connection_id, status, selectedUser, setSelectedUser} =
    props
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  return (
    <Stack sx={{my: 1, cursor: 'pointer', '&: hover': {background: '#f7f7f7'}}}>
      <Grid container alignItems='center' justifyContent='space-between'>
        <Grid item>
          <Grid container alignItems='center'>
            {request ? (
              <Badge
                anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                badgeContent={<NotificationsActiveIcon color='secondary' />}
              >
                <PostAccountView
                  avatar={toServerUrl(`/media/user/avatar/${img}`)}
                  data={data}
                  status={status}
                  width='30px'
                  height='30px'
                />
                {/* <img
                  width='30px'
                  height='30px'
                  style={{borderRadius: '6px'}}
                  src={toServerUrl(`/media/user/avatar/${img}`)}
                  alt=''
                /> */}
              </Badge>
            ) : (
              <PostAccountView
                avatar={toServerUrl(`/media/user/avatar/${img}`)}
                data={data}
                status={status}
                width='30px'
                height='30px'
              />

              // <img
              //   width='30px'
              //   height='30px'
              //   style={{borderRadius: '6px'}}
              //   src={toServerUrl(`/media/user/avatar/${img}`)}
              //   alt=''
              // />
            )}

            <Typography sx={{pl: 4}}>{title}</Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container alignItems='center'>
            {pending && (
              <Tooltip title='Approve Connection'>
                <IconButton
                  sx={{color: 'green'}}
                  onClick={() => dispatch(updateConnection({status: 1, connection_id}))}
                >
                  <CheckCircleOutlineIcon />
                </IconButton>
              </Tooltip>
            )}
            {status === 'accepted' && (
              <Tooltip title='Click to search for this user'>
                <Checkbox
                  onChange={() => {
                    let temp = [...(selectedUser ? selectedUser : [])] // Create a copy of the selectedUser array
                    const userId = data.user.id

                    // Check if userId exists in selectedUser array
                    const index = temp.indexOf(userId)
                    if (index === -1) {
                      temp.push(userId) // Add userId if it doesn't exist
                    } else {
                      temp.splice(index, 1) // Remove userId if it exists
                    }

                    setSelectedUser(temp) // Update the selectedUser state
                  }}
                  icon={<BookmarkBorderIcon />}
                  checkedIcon={<BookmarkIcon />}
                />
              </Tooltip>
            )}
            <Tooltip title='Remove Connection'>
              <IconButton
                sx={{color: 'red'}}
                onClick={() => {
                  setOpen(true)
                }}
              >
                <HighlightOffIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false)
        }}
      >
        <DialogTitle>Notice</DialogTitle>
        <DialogContent>
          <Typography>{`Are you sure you want to remove connection with ${title}?`}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant='outlined'
            color='error'
            onClick={() => {
              dispatch(updateConnection({status: 0, connection_id}))
              setOpen(false)
            }}
          >
            Yes
          </Button>
          <Button
            variant='outlined'
            onClick={() => {
              setOpen(false)
            }}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  )
}

export default PostTitleItem
