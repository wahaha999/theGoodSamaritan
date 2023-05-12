import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Toolbar,
} from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import InputBase, {InputBaseProps} from '@mui/material/InputBase'
import Typography from '@mui/material/Typography'
import {red} from '@mui/material/colors'
import {styled} from '@mui/material/styles'
import * as React from 'react'
import {toAbsoluteUrl, toServerUrl} from '../../../../../_metronic/helpers'
import {AnimatePresence, Variants, motion} from 'framer-motion'
import Post from '../../Post'
import {Controller, FormProvider, useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useAppDispatch, useAppSelector} from 'src/app/store/hook'
import {createPost} from '../../store/postSlice'
import {showMessage} from 'src/app/store/fuse/messageSlice'
import withReducer from 'src/app/store/withReducer'
import reducer from '../../store'
import moment from 'moment'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import {Carousel} from 'react-responsive-carousel'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import dayjs from 'dayjs'
const DashboardPaper = styled(Paper)(() => ({
  width: '100%',
  height: '80vh',
  overflow: 'auto',
  padding: 12,
}))

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {type: 'spring', stiffness: 300, damping: 24},
  },
  closed: {opacity: 0, y: 20, transition: {duration: 0.2}},
}

type AnimatedDialogProps = DialogProps & {
  animate?: boolean
}

const AnimatedDialog: React.FC<AnimatedDialogProps> = ({open, onClose, children, ...props}) => {
  const dialogVariants = {
    hidden: {opacity: 0, scale: 0.9},
    visible: {opacity: 1, scale: 1},
    exit: {opacity: 0, scale: 0.9},
  }

  return (
    <AnimatePresence>
      <Dialog
        open={open}
        onClose={onClose}
        {...props}
        // PaperComponent={({children, ...paperProps}: any) => (
        //   <motion.div
        //     {...paperProps}
        //     style={{background: 'white'}}
        //     variants={dialogVariants}
        //     initial={{opacity: 0}}
        //     animate={{opacity: 1}}
        //     exit={{opacity: 0}}
        //     transition={{duration: 0.3}}
        //   >
        //     {children}
        //   </motion.div>
        // )}
      >
        {children}
      </Dialog>
    </AnimatePresence>
  )
}

interface ICustomizedInputBase {
  popup?: boolean
  setPopup?: any
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
          if (!popup) {
            setPopup(true)
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

const schema: any = yup.object().shape({
  purpose: yup.number().required('Purpose is required'),
  title: yup.string().required('Title is required'),
  event_name: yup
    .string()
    .test(
      'is-event-name-required',
      'Event name is required when Purpose is That have an Event',
      function (value) {
        const {purpose} = this.parent
        if (purpose == 4 && !value) {
          return false
        }
        return true
      }
    ),
  category: yup.array().required('Category is required'),
})

const initValue = {
  title: '',
  content: '',
  event_name: '',
  start: dayjs('2022-04-17'),
  end: dayjs('2022-04-17'),
  category: [],
  images: [],
  timezone: '',
  address: {lat: 23, lng: 12},
}

function MyPostsDashboard() {
  const user = useAppSelector(({user}) => user.user)
  const posts = useAppSelector(({post}) => {
    return post.post
  })
  const dispatch = useAppDispatch()
  const [expanded, setExpanded] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [popup, setPopup] = React.useState(false)
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(schema),
  })
  const {
    control,
    reset,
    formState: {isValid},
  } = methods
  const {handleSubmit} = methods
  const onSubmit = (data: any) => {
    dispatch(createPost(data))
      .then(() => {
        // dispatch(showMessage({message: 'Successful posted', variant: 'success'}))
      })
      .catch(() => {})
      .finally(() => {
        setPopup(false)
      })
  }
  React.useEffect(() => {
    if (posts.length > 0) {
      setLoading(false)
    }
  }, [posts])

  // const descriptionElementRef = React.useRef<HTMLElement>(null)
  // React.useEffect(() => {
  //   if (popup) {
  //     const {current: descriptionElement} = descriptionElementRef
  //     if (descriptionElement !== null) {
  //       descriptionElement.focus()
  //     }
  //   }
  // }, [popup])
  return (
    <>
      <DashboardPaper>
        <AppBar position='sticky' color='inherit' sx={{boxShadow: 'none'}}>
          <motion.div
            initial={{scale: 1.1}}
            animate={{scale: 1}}
            transition={{type: 'spring', damping: 10, stiffness: 100}}
          >
            <CustomizedInputBase user={user} layoutId='1' popup={popup} setPopup={setPopup} />
          </motion.div>
          {/* <Toolbar > */}
          {/* </Toolbar> */}
        </AppBar>
        {/* {!popup && ( */}
        {/* )} */}
        {/* {popup && (
            
          )} */}
        {posts?.map((post: any, index: number) => (
          <motion.div variants={itemVariants} key={index}>
            <Card sx={{width: '100%', margin: '16px 0px', border: '1px solid #D5DBDB'}}>
              <CardHeader
                avatar={
                  <Avatar
                    sx={{bgcolor: red[500]}}
                    aria-label='recipe'
                    src={toServerUrl('/media/account/avatar/' + post?.user?.account.avatar)}
                  />
                }
                action={
                  <>
                    <Button variant='outlined' sx={{mr: 4}}>
                      Make A Connection
                    </Button>
                    <IconButton aria-label='settings'>
                      <MoreVertIcon />
                    </IconButton>
                  </>
                }
                title={<Typography>{post?.user?.account.non_profit_name}</Typography>}
                subheader={
                  post?.event_name && (
                    <Grid container>
                      <Typography sx={{mr: 2}}>Event Name:{post?.event_name}</Typography>
                      <Typography>
                        Starts on {moment(post?.start).format('DD/MM/YY')} at{' '}
                        {moment(post?.start).format('h:mm A')} and end on{' '}
                        {moment(post?.end).format('DD/MM/YY')} at{' '}
                        {moment(post?.end).format('h:mm A')}
                      </Typography>
                    </Grid>
                  )
                }
              />
              {/* {!loading ? (
          <Skeleton sx={{height: 194}} animation='wave' variant='rectangular' />
        ) : ( */}
              <CardMedia
                component='div'
                sx={{maxHeight: '500px'}}
                // height='500px'
                // // onLoad={handleImageLoaded}
                // image={toServerUrl('/media/post/image/' + JSON.parse(post?.images)[0])}
                // alt='Paella dish'
              >
                {loading ? (
                  <Skeleton height={200} animation='wave' variant='rectangular' />
                ) : (
                  <Carousel showThumbs={false} autoPlay infiniteLoop>
                    {JSON.parse(post?.images).map((item: any, index: number) => (
                      <div key={index}>
                        <img
                          src={toServerUrl('/media/post/image/' + item)}
                          style={{maxHeight: '500px'}}
                        />
                      </div>
                    ))}
                  </Carousel>
                )}
              </CardMedia>
              {/* )} */}
              <CardContent>
                <div dangerouslySetInnerHTML={{__html: post?.content}}></div>
                <Divider sx={{m: 4, border: '1px solid'}} />
                <Grid container alignItems='center' sx={{mb: 2}}>
                  <LocationOnIcon color='primary' sx={{mr: 2}} />
                  <Typography color='purple'>
                    lat: {post?.lat} lng: {post?.lng}
                  </Typography>
                </Grid>
                <Grid container alignItems='center'>
                  <Avatar
                    sx={{mr: 2}}
                    src={toServerUrl('/media/user/avatar/' + post?.user?.avatar)}
                  />
                  <Typography>
                    {`${post?.user?.first_name} ${post?.user?.last_name}`} posted on{' '}
                    {moment(post?.created_at).format('DD/MM/YY')} at{' '}
                    {moment(post?.created_at).format('h:mm A')}
                  </Typography>
                </Grid>
                {/* <Typography variant='body2' color='text.secondary'>
                This impressive paella is a perfect party dish and a fun meal to cook together with
                your guests. Add 1 cup of frozen peas along with the mussels, if you like.
              </Typography> */}
              </CardContent>
              <CardActions disableSpacing>
                <Grid container flexDirection='row-reverse'>
                  <IconButton sx={{color: 'purple'}}>
                    <ForumOutlinedIcon />
                  </IconButton>
                  <Button startIcon={<SaveOutlinedIcon />} sx={{mr: 2}} variant='outlined'>
                    Save Post
                  </Button>
                  <Button startIcon={<ChatBubbleOutlineIcon />} sx={{mr: 2}}>
                    Comment
                  </Button>
                  <Button startIcon={<FavoriteBorderIcon />} sx={{mr: 2}}>
                    Like
                  </Button>
                </Grid>
                {/* <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                <ExpandMoreIcon />
                </ExpandMore> */}
              </CardActions>
              {/* <Collapse in={expanded} timeout='auto' unmountOnExit>
                <CardContent>
                  <Typography paragraph>Method:</Typography>
                  <Typography paragraph>
                    Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside
                    for 10 minutes.
                  </Typography>
                  <Typography paragraph>
                    Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                    medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                    occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a large
                    plate and set aside, leaving chicken and chorizo in the pan. Add pimentón, bay
                    leaves, garlic, tomatoes, onion, salt and pepper, and cook, stirring often until
                    thickened and fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
                    cups chicken broth; bring to a boil.
                  </Typography>
                  <Typography paragraph>
                    Add rice and stir very gently to distribute. Top with artichokes and peppers,
                    and cook without stirring, until most of the liquid is absorbed, 15 to 18
                    minutes. Reduce heat to medium-low, add reserved shrimp and mussels, tucking
                    them down into the rice, and cook again without stirring, until mussels have
                    opened and rice is just tender, 5 to 7 minutes more. (Discard any mussels that
                    don&apos;t open.)
                  </Typography>
                  <Typography>
                    Set aside off of the heat to let rest for 10 minutes, and then serve.
                  </Typography>
                </CardContent>
              </Collapse> */}
            </Card>
          </motion.div>
        ))}
      </DashboardPaper>
      <AnimatedDialog open={popup} scroll='paper' maxWidth='md'>
        <FormProvider {...methods}>
          <DialogTitle>
            <>
              <Stack mb={2}>
                <motion.div
                  initial={{x: 30}}
                  animate={{x: 0}}
                  exit={{opacity: 0}}
                  transition={{duration: 1}}
                >
                  {/* <Grid container direction='row-reverse'> */}
                  <Button
                    variant='contained'
                    color='success'
                    sx={{
                      mx: 2,
                      borderRadius: 12,
                      float: 'right',
                      '&.Mui-disabled': {
                        backgroundColor: '#a7dda7',
                        // color: 'white',
                      },
                    }}
                    disabled={!isValid}
                    onClick={() => handleSubmit(onSubmit)()}
                  >
                    Post
                  </Button>
                </motion.div>
                <motion.div
                  initial={{x: -30}}
                  animate={{x: 0}}
                  style={{position: 'absolute', top: 8, left: 8}}
                  exit={{opacity: 0}}
                  transition={{duration: 1}}
                >
                  <IconButton
                    onClick={() => {
                      setPopup(false)
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </motion.div>
              </Stack>
              <motion.div
                initial={{scale: 1.1}}
                animate={{scale: 1}}
                transition={{type: 'spring', damping: 10, stiffness: 100}}
              >
                <Controller
                  name={'title' as never}
                  control={control}
                  render={({field}) => (
                    <CustomizedInputBase
                      user={user}
                      popup={popup}
                      field={field}
                      // ref={descriptionElementRef}
                    />
                  )}
                />
              </motion.div>
            </>
          </DialogTitle>
          <DialogContent tabIndex={-1}>
            <Post />
          </DialogContent>
        </FormProvider>
      </AnimatedDialog>
      {/* <AnimatePresence>
          {popup && (
            <Dialog PaperComponent={motion.div} open={popup}> */}
      {/* </Dialog> */}
      {/* <motion.dialog layoutId='1'> */}
      {/* </Dialog>
            // </>
          )}
        </AnimatePresence> */}
    </>
  )
}

export default withReducer('post', reducer)(MyPostsDashboard)
