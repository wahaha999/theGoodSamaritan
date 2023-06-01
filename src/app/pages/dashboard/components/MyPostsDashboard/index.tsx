import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Grid,
  Paper,
  Toolbar,
} from '@mui/material'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import InputBase, {InputBaseProps} from '@mui/material/InputBase'
import Typography from '@mui/material/Typography'
import {styled} from '@mui/material/styles'
import * as React from 'react'
import {toServerUrl} from '../../../../../_metronic/helpers'
import {AnimatePresence, Variants, motion} from 'framer-motion'
import Post from '../../Post'
import {FormProvider, useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useAppDispatch, useAppSelector} from 'src/app/store/hook'
import {createPost, deletePost, getPosts} from '../../store/postSlice'
import withReducer from 'src/app/store/withReducer'
import reducer from '../../store'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import CircularProgress from '@mui/material/CircularProgress'
import PostView from './PostView'
import PostDialog from './PostDialog'
import PostInput from './PostInput'
import CheckDialog from './CheckDialog'

const DashboardPaper = styled(Paper)(() => ({
  width: '100%',
  height: '80vh',
  overflow: 'auto',
  padding: 24,
  position: 'relative',
}))

type AnimatedDialogProps = DialogProps & {
  animate?: boolean
}

function MyPostsDashboard() {
  const posts = useAppSelector(({post}) => {
    return post.post
  })
  const post_loading = useAppSelector(({post}) => post.filter.loading)
  const dispatch = useAppDispatch()
  const [postData, setPostData] = React.useState<any>({})
  const [confirm, setConfirm] = React.useState(false)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const {filter} = useAppSelector(({post}) => post.filter)
  const getPostsByFilter = React.useCallback((filter: any) => {
    dispatch(getPosts(filter))
  }, [])
  React.useEffect(() => {
    if (filter.states && filter.states.length > 0) {
      getPostsByFilter(filter)
    }
  }, [getPostsByFilter, filter])

  return (
    <>
      <DashboardPaper>
        <Grid container justifyContent='center'>
          {post_loading && (
            <Box
              sx={{
                position: 'fixed',
                zIndex: 2000,
                background: 'white',
                borderRadius: '50%',
                width: 50,
                height: 50,
                boxShadow: 1,
                display: 'flex',
              }}
            >
              <CircularProgress sx={{margin: 'auto'}} size={30} />
            </Box>
          )}
        </Grid>
        <PostInput />
        {posts?.map((post: any, index: number) => (
          <PostView post={post} key={index} />
        ))}
      </DashboardPaper>
      <PostDialog />
      <CheckDialog />
    </>
  )
}

export default withReducer('post', reducer)(MyPostsDashboard)
