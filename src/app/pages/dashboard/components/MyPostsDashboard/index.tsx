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
  Card,
  useScrollTrigger,
  Fade,
  Fab,
  CssBaseline,
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
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

const DashboardPaper = styled(Paper)(() => ({
  width: '100%',
  height: '80vh',
  overflow: 'auto',
  padding: 24,
  position: 'relative',
}))
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window
  children: React.ReactElement
}

function ScrollTop(props: Props) {
  const {children, window} = props
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  })

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    )

    if (anchor) {
      // const anchorTop = anchor.getBoundingClientRect().top +window?.scrollY
      anchor.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      })
    }
  }

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role='presentation'
        sx={{position: 'fixed', bottom: 16, right: 16}}
      >
        {children}
      </Box>
    </Fade>
  )
}

function MyPostsDashboard(props: Props) {
  const posts = useAppSelector(({post}) => {
    return post.post
  })
  const post_loading = useAppSelector(({post}) => post.filter.loading)
  const dispatch = useAppDispatch()
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
      {' '}
      {/* <DashboardPaper> */}
      <React.Fragment>
        <CssBaseline />
        <div id='back-to-top-anchor' />
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
              <CircularProgress sx={{margin: 'auto'}} size={20} />
            </Box>
          )}
        </Grid>
        <PostInput type='post' />
        {posts?.map((post: any, index: number) => (
          <Card
            key={index}
            sx={{
              width: '100%',
              margin: '16px 0px',
              border: '1px solid #D5DBDB',
              borderRadius: '10px 10px 30px 30px',
            }}
          >
            <PostView post={post} key={index} type='post' />
          </Card>
        ))}
        <ScrollTop {...props}>
          <Fab size='small' aria-label='scroll back to top' color='primary'>
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </React.Fragment>
      {/* </DashboardPaper> */}
      <PostDialog />
      <CheckDialog />
    </>
  )
}

export default withReducer('post', reducer)(MyPostsDashboard)
