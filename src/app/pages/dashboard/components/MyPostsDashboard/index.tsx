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
  Hidden,
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
import ConnectionDialog from '../ConnectionDialog'
import {usePrevious} from 'src/app/modules/hooks'
import _ from 'src/app/modules/@lodash/@lodash'

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

const BoxFeedback = styled('div')({
  backgroundImage: 'url("/media/misc/balanced-feedback.webp")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: 150,
  height: 150,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  border: '0px solid black',
  position: 'relative',
  '&::before': {
    content: '"We embrace your feedback. Click here"',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '0.8rem',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: '4px',
    borderRadius: '2px',
    visibility: 'hidden',
    opacity: 0,
    transition: 'visibility 0s, opacity 0.3s linear',
  },
  '&:hover::before': {
    visibility: 'visible',
    opacity: 1,
    backgroundColor: '#F9BF3B',
  },
  // '@media (max-width: 1800px)': {
  //   width: 200,
  //   height: 200,
  // },
  '@media (max-width: 1300px)': {
    width: 100,
    height: 100,
  },
})

const Box_Support = styled('div')({
  backgroundImage: 'url("/media/misc/support.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: 150,
  height: 150,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  border: '0px solid black', // Add border styles here
  position: 'relative', // Add position relative to create a new stacking context
  '&::before': {
    content: '"Need Help? Click here"',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '0.8rem',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: '4px',
    borderRadius: '2px',
    visibility: 'hidden',
    opacity: 0,
    transition: 'visibility 0s, opacity 0.3s linear',
  },
  '&:hover::before': {
    visibility: 'visible',
    opacity: 1,
    backgroundColor: '#F9BF3B',
  },
  // '@media (max-width: 1800px)': {
  //   width: 200,
  //   height: 200,
  // },
  // '@media (max-width: 400px)': {
  //   width: 150,
  //   height: 150,
  // },
  '@media (max-width: 1300px)': {
    width: 100,
    height: 100,
  },
})

const BoxWithBackground = () => {
  const handleLinkClick = () => {
    // Replace 'https://www.example.com' with your desired external website URL
    window.open(
      'https://docs.google.com/forms/d/e/1FAIpQLSc83BeNQnjY9HaTLZvrJJxbuEmzw4DmWBQr_gZKjIG7g32H4w/viewform?usp=sf_link',
      '_blank'
    )
  }

  return (
    <BoxFeedback onClick={handleLinkClick}>
      {/* You can add content inside the box if needed */}
    </BoxFeedback>
  )
}

const BoxWithBackground_support = () => {
  const handleLinkClick = () => {
    // Replace 'https://www.example.com' with your desired external website URL
    window.open(
      'https://docs.google.com/forms/d/e/1FAIpQLSc83BeNQnjY9HaTLZvrJJxbuEmzw4DmWBQr_gZKjIG7g32H4w/viewform?usp=sf_link',
      '_blank'
    )
  }

  return (
    <Box_Support onClick={handleLinkClick}>
      {/* You can add content inside the box if needed */}
    </Box_Support>
  )
}

function MyPostsDashboard(props: Props) {
  const posts = useAppSelector(({post}) => {
    return post.post
  })
  const post_loading = useAppSelector(({post}) => post.filter.loading)
  const dispatch = useAppDispatch()
  const {filter} = useAppSelector(({post}) => post.filter)
  const getPostsByFilter = React.useCallback(
    (filter: any) => {
      dispatch(getPosts(filter))
    },
    [filter]
  )
  const prevData = usePrevious(filter ? _.merge({}, filter) : null)
  React.useEffect(() => {
    if (filter.states && filter.states.length > 0) {
      if (_.isEqual(prevData, filter)) {
        return
      }
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
        <Hidden mdDown>
          <div style={{position: 'fixed', right: '10px', bottom: '100px'}}>
            <BoxWithBackground />
            <BoxWithBackground_support />
          </div>
        </Hidden>
        <ScrollTop {...props}>
          <Fab size='small' aria-label='scroll back to top' color='primary'>
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </React.Fragment>
      {/* </DashboardPaper> */}
      <PostDialog />
      <CheckDialog />
      <ConnectionDialog />
    </>
  )
}

export default withReducer('post', reducer)(MyPostsDashboard)
