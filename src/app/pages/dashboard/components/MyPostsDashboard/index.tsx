import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import SearchIcon from '@mui/icons-material/Search'
import {Button, Dialog, Grid, Paper, Skeleton} from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Typography from '@mui/material/Typography'
import {red} from '@mui/material/colors'
import {styled} from '@mui/material/styles'
import * as React from 'react'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {AnimatePresence, motion} from 'framer-motion'
import Post from '../../Post'

const DashboardPaper = styled(Paper)(() => ({
  width: '100%',
  padding: 12,
}))

interface ICustomizedInputBase {
  popup?: boolean
  setPopup?: any
  layoutId?: string
}

function CustomizedInputBase(props: ICustomizedInputBase) {
  const {popup, setPopup, layoutId} = props
  return (
    <motion.div layoutId={layoutId}>
      <Paper
        onClick={() => {
          console.log('hello')
          setPopup(true)
        }}
        component='form'
        sx={{p: '2px 4px', m: '4px 0px', display: 'flex', alignItems: 'center', width: '100%'}}
      >
        <IconButton sx={{p: '10px'}} aria-label='menu'>
          <Avatar aria-label='recipe' src={toAbsoluteUrl('/media/avatars/300-1.jpg')} />
        </IconButton>
        <InputBase
          sx={{ml: 1, flex: 1}}
          placeholder="What's on your mind?"
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

export default function MyPostsDashboard() {
  const [expanded, setExpanded] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [popup, setPopup] = React.useState(false)
  // React.useEffect(() => {
  //   setInterval(() => {
  //     setLoading(false)
  //   }, 3000)
  // }, [])
  const handleImageLoaded = () => {
    console.log('hello')
    setLoading(true)
  }
  return (
    <>
      <DashboardPaper>
        {!popup && <CustomizedInputBase layoutId='1' popup={popup} setPopup={setPopup} />}
        <AnimatePresence>
          {popup && (
            <motion.div layoutId='1'>
              <CustomizedInputBase />
              <Post />
              <Button variant='outlined' onClick={() => setPopup(false)}>
                Close
              </Button>

              {/* </Dialog> */}
            </motion.div>
          )}
        </AnimatePresence>
        <Card sx={{width: '100%', margin: '4px 0px'}}>
          <CardHeader
            avatar={
              <Avatar
                sx={{bgcolor: red[500]}}
                aria-label='recipe'
                src={toAbsoluteUrl('/media/avatars/300-1.jpg')}
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
            title='Shrimp and Chorizo Paella'
            subheader='September 14, 2016'
          />
          {/* {!loading ? (
          <Skeleton sx={{height: 194}} animation='wave' variant='rectangular' />
        ) : ( */}
          <CardMedia
            component='img'
            height={194}
            // onLoad={handleImageLoaded}
            image={toAbsoluteUrl('/media/example/example.png')}
            alt='Paella dish'
          />
          {/* )} */}
          <CardContent>
            <Typography variant='body2' color='text.secondary'>
              This impressive paella is a perfect party dish and a fun meal to cook together with
              your guests. Add 1 cup of frozen peas along with the mussels, if you like.
            </Typography>
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
          <Collapse in={expanded} timeout='auto' unmountOnExit>
            <CardContent>
              <Typography paragraph>Method:</Typography>
              <Typography paragraph>
                Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                minutes.
              </Typography>
              <Typography paragraph>
                Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
                chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
                salt and pepper, and cook, stirring often until thickened and fragrant, about 10
                minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
              </Typography>
              <Typography paragraph>
                Add rice and stir very gently to distribute. Top with artichokes and peppers, and
                cook without stirring, until most of the liquid is absorbed, 15 to 18 minutes.
                Reduce heat to medium-low, add reserved shrimp and mussels, tucking them down into
                the rice, and cook again without stirring, until mussels have opened and rice is
                just tender, 5 to 7 minutes more. (Discard any mussels that don&apos;t open.)
              </Typography>
              <Typography>
                Set aside off of the heat to let rest for 10 minutes, and then serve.
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </DashboardPaper>
    </>
  )
}
