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
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  Fab,
  Grid,
  Menu,
  MenuItem,
  Paper,
  Skeleton,
  Stack,
  Toolbar,
  Tooltip,
} from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import InputBase, {InputBaseProps} from '@mui/material/InputBase'
import Typography from '@mui/material/Typography'
import {red} from '@mui/material/colors'
import {styled} from '@mui/material/styles'
import * as React from 'react'
import {toServerUrl} from '../../../../../_metronic/helpers'
import {AnimatePresence, Variants, motion} from 'framer-motion'
import Post, {labels} from '../../Post'
import {FormProvider, useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useAppDispatch, useAppSelector} from 'src/app/store/hook'
import {createPost, deletePost, getPosts} from '../../store/postSlice'
import withReducer from 'src/app/store/withReducer'
import reducer from '../../store'
import moment from 'moment'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import {Carousel} from 'react-responsive-carousel'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import FuseSvgIcon from 'src/app/modules/core/FuseSvgIcon/FuseSvgIcon'
import CircularProgress from '@mui/material/CircularProgress'

const DashboardPaper = styled(Paper)(() => ({
  width: '100%',
  height: '80vh',
  overflow: 'auto',
  padding: 24,
  position: 'relative',
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
  // title: yup.string().required('Title is required'),
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
  category: yup.array().min(1, 'Category is required and must contain at least one item'),
})

function MyPostsDashboard() {
  const user = useAppSelector(({user}) => user.user)
  const posts = useAppSelector(({post}) => {
    return post.post
  })
  const post_loading = useAppSelector(({post}) => post.filter.loading)
  const dispatch = useAppDispatch()
  const [loading, setLoading] = React.useState(true)
  const [popup, setPopup] = React.useState(false)
  const [edit, setEdit] = React.useState(false)
  const [postData, setPostData] = React.useState<any>({})
  const [confirm, setConfirm] = React.useState(false)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, post: any) => {
    setAnchorEl(event.currentTarget)
    let tempPost = {...post}
    tempPost.category = JSON.parse(tempPost.category)
    setPostData(tempPost)
  }
  const handleClose = () => {
    setAnchorEl(null)
    setEdit(false)
  }
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(schema),
  })
  const {
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
        setEdit(false)
        setPostData({})
      })
  }
  React.useEffect(() => {
    if (posts.length > 0) {
      setLoading(false)
    }
  }, [posts])

  React.useEffect(() => {
    if (user.account) {
      if (edit && postData) {
        reset({
          ...postData,
        })
      } else {
        const {address, state, city, zip_code, timezone} = user.account
        reset({
          content: '',
          event_name: undefined,
          category: undefined,
          images: [],
          timezone,
          purpose: undefined,
          address,
          state,
          city,
          zip_code,
          location: {lat: 10.99835602, lng: 77.01502627},
        })
      }
    }
  }, [user, popup, reset, edit, postData])

  const {filter} = useAppSelector(({post}) => post.filter)
  const getPostsByFilter = React.useCallback((filter: any) => {
    dispatch(getPosts(filter))
  }, [])
  React.useEffect(() => {
    if (filter) {
      getPostsByFilter(filter)
    }
  }, [getPostsByFilter, filter])

  // React.useEffect(() => {
  //   if (edit && postData) {
  //     reset({
  //       ...postData,
  //     })
  //   }
  // }, [edit, reset])
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
        <motion.div
          initial={{scale: 1.1}}
          animate={{scale: 1}}
          transition={{type: 'spring', damping: 10, stiffness: 100}}
        >
          <CustomizedInputBase user={user} layoutId='1' popup={popup} setPopup={setPopup} />
        </motion.div>
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
        {/* <Toolbar > */}
        {/* </Toolbar> */}
        {/* {!popup && ( */}
        {/* )} */}
        {/* {popup && (
            
          )} */}
        {posts?.map((post: any, index: number) => (
          <motion.div variants={itemVariants} key={index}>
            <Card sx={{width: '100%', margin: '16px 0px', border: '1px solid #D5DBDB'}}>
              <CardHeader
                action={
                  <>
                    <Button variant='outlined' sx={{mr: 4}}>
                      Make A Connection
                    </Button>
                    {post?.user?.account_dbkey == user.account_dbkey && (
                      <>
                        <IconButton aria-label='settings' onClick={(e) => handleClick(e, post)}>
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          elevation={1}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          id='basic-menu'
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          MenuListProps={{
                            'aria-labelledby': 'basic-button',
                          }}
                        >
                          <MenuItem
                            onClick={() => {
                              setConfirm(true)
                              handleClose()
                            }}
                          >
                            <FuseSvgIcon sx={{mr: 1}} size={16}>
                              heroicons-outline:trash
                            </FuseSvgIcon>
                            Delete
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              handleClose()
                              setEdit(true)
                              setPopup(true)
                            }}
                          >
                            <FuseSvgIcon sx={{mr: 1}} size={16}>
                              heroicons-outline:pencil
                            </FuseSvgIcon>
                            Edit
                          </MenuItem>
                        </Menu>
                      </>
                    )}
                  </>
                }
                title={
                  <>
                    <Grid container direction='row' alignItems='center'>
                      <Avatar
                        sx={{bgcolor: red[500], mr: 2}}
                        aria-label='recipe'
                        src={toServerUrl('/media/account/avatar/' + post?.user?.account.avatar)}
                      />
                      <Typography>{post?.user?.account.non_profit_name}</Typography>
                      <Divider
                        orientation='vertical'
                        flexItem
                        sx={{border: '1px solid black', mx: 2, my: 1}}
                      />
                      <Avatar
                        sx={{mr: 2}}
                        src={toServerUrl('/media/user/avatar/' + post?.user?.avatar)}
                      />
                      <Typography>
                        {`${post?.user?.first_name} ${post?.user?.last_name}`} posted on{' '}
                        {moment(post?.created_at).format('MM/DD/YY')} at{' '}
                        {moment(post?.created_at).format('h:mm A')}
                      </Typography>
                      <Tooltip title={labels[Number(post?.purpose) - 1].title} arrow>
                        {post?.purpose && labels[Number(post?.purpose) - 1].icon}
                      </Tooltip>
                    </Grid>
                    {/* <Grid container direction='row' alignItems='center'>
                      <Chip label='Event' />
                    </Grid> */}
                  </>
                }
                subheader={
                  <>
                    {post?.event_name && (
                      <Grid container mt={1}>
                        <Typography sx={{mr: 2}}>Event Name: {post?.event_name}</Typography>
                        <Typography>
                          Starts on {moment(post?.start).format('MM/DD/YY')} at{' '}
                          {moment(post?.start).format('h:mm A')} and end on{' '}
                          {moment(post?.end).format('MM/DD/YY')} at{' '}
                          {moment(post?.end).format('h:mm A')}
                        </Typography>
                      </Grid>
                    )}
                    <Box sx={{my: 2}} />
                    <div dangerouslySetInnerHTML={{__html: post?.content}}></div>
                  </>
                }
              />

              {/* {!loading ? (
          <Skeleton sx={{height: 194}} animation='wave' variant='rectangular' />
        ) : ( */}
              <CardMedia
                component='div'
                // sx={{maxHeight: '500px'}}
                // height='500px'
                // // onLoad={handleImageLoaded}
                // image={toServerUrl('/media/post/image/' + JSON.parse(post?.images)[0])}
                // alt='Paella dish'
              >
                <>
                  {loading ? (
                    <Skeleton height={500} animation='wave' variant='rectangular' />
                  ) : (
                    <Carousel showThumbs={false} infiniteLoop dynamicHeight>
                      {JSON.parse(post?.images).map((item: any, index: number) => (
                        <div key={index}>
                          <img
                            src={toServerUrl('/media/post/image/' + item)}
                            style={{height: 'unset', objectFit: 'cover'}}
                            alt={item}
                          />
                        </div>
                      ))}
                    </Carousel>
                  )}
                </>
              </CardMedia>
              {/* )} */}
              <CardContent>
                <Grid container alignItems='center' sx={{mb: 2}}>
                  <LocationOnIcon color='primary' sx={{mr: 2}} />
                  {post?.address ? (
                    <Typography
                      color='purple'
                      component='a'
                      target='_blank'
                      href={`https://www.google.com/maps/place/${post?.address || ''} ${
                        post?.city || ''
                      } ${post?.state || ''} ${post?.zip_code || ''}`}
                    >
                      {post?.address}
                    </Typography>
                  ) : (
                    <Typography color='purple'>
                      lat: {post?.lat} lng: {post?.lng}
                    </Typography>
                  )}
                </Grid>
                <Grid container alignItems='center' gap={2}>
                  {post?.keyword != 'null' &&
                    JSON.parse(post?.keyword ? post?.keyword : '[]').length > 0 && (
                      <Typography variant='caption'>Keyword: </Typography>
                    )}
                  {post?.keyword != 'null' &&
                    JSON.parse(post?.keyword ? post?.keyword : '[]').map(
                      (item: string, index: number) => <Chip label={item} key={index} />
                    )}
                </Grid>
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
      <AnimatedDialog
        open={popup}
        scroll='paper'
        maxWidth='md'
        fullWidth
        disableEnforceFocus
        disableRestoreFocus
        disablePortal
        sx={{zIndex: 1000}}
      >
        <FormProvider {...methods}>
          {/* <DialogTitle> */}
          <AppBar position='static' color='default'>
            <Toolbar>
              <Typography component='div' sx={{flexGrow: 1}}>
                New Post
              </Typography>
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
                exit={{opacity: 0}}
                transition={{duration: 1}}
              >
                <IconButton
                  size='small'
                  sx={{
                    backgroundColor: 'white',
                  }}
                  onClick={() => {
                    setPostData({})
                    setEdit(false)
                    setPopup(false)
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </motion.div>
            </Toolbar>
          </AppBar>
          {/* <motion.div
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
              </motion.div> */}
          {/* </DialogTitle> */}
          <DialogContent tabIndex={-1}>
            <Post />
          </DialogContent>
        </FormProvider>
      </AnimatedDialog>
      <Dialog
        open={confirm}
        onClose={() => {
          setConfirm(false)
        }}
      >
        <DialogTitle>Notice</DialogTitle>
        <DialogContent>
          <Typography>Are you sure?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant='outlined'
            color='error'
            onClick={() => {
              dispatch(deletePost(postData?.id))
              setConfirm(false)
            }}
          >
            Yes
          </Button>
          <Button
            variant='outlined'
            onClick={() => {
              setConfirm(false)
            }}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
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
