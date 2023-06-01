import React from 'react'
import {Avatar, IconButton, InputBase, InputBaseProps, Paper} from '@mui/material'
import {motion} from 'framer-motion'
import {toServerUrl} from 'src/_metronic/helpers'
import SearchIcon from '@mui/icons-material/Search'
import {useAppDispatch, useAppSelector} from 'src/app/store/hook'
import {openPostDialog} from '../../../store/postDialogSlice'

interface ICustomizedInputBase {
  popup?: boolean
  setPopup?: () => void
  layoutId?: string
  field?: any
  user: any
}
function CustomizedInputBase(props: ICustomizedInputBase & InputBaseProps) {
  const {popup, setPopup, layoutId, field, user, ...other} = props
  return (
    <motion.div layoutId={layoutId}>
      <Paper
        elevation={2}
        onClick={() => {
          if (setPopup) {
            setPopup()
          }
        }}
        component='form'
        sx={{
          p: '2px 2px',
          m: '4px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          borderRadius: 8,
        }}
      >
        <IconButton sx={{p: '10px'}} aria-label='menu'>
          <Avatar aria-label='recipe' src={toServerUrl('/media/user/avatar/' + user?.avatar)} />
        </IconButton>
        <InputBase
          fullWidth
          {...other}
          {...field}
          sx={{ml: 1, flex: 1}}
          placeholder="What's on your mind?*"
          inputProps={{'aria-label': 'search google maps'}}
        />
        <IconButton type='button' sx={{p: '10px'}} aria-label='search'>
          <SearchIcon />
        </IconButton>
        {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
        {/* <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
          <DirectionsIcon />
        </IconButton> */}
      </Paper>
    </motion.div>
  )
}
type Props = {}

const PostInput = (props: Props) => {
  const user = useAppSelector(({user}) => user.user)
  const dispatch = useAppDispatch()

  return (
    <motion.div
      initial={{scale: 1.1}}
      animate={{scale: 1}}
      transition={{type: 'spring', damping: 10, stiffness: 100}}
    >
      <CustomizedInputBase
        user={user}
        layoutId='1'
        setPopup={() => dispatch(openPostDialog({postType: 'new_post', open: true}))}
      />
    </motion.div>
  )
}

export default PostInput
