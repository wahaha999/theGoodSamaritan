/* eslint-disable jsx-a11y/anchor-is-valid */
import {Grid, useTheme, Hidden, Typography} from '@mui/material'
import {FC, memo, useEffect} from 'react'
import MyPostsDashboard from './components/MyPostsDashboard'
import {motion} from 'framer-motion'
import {useAppDispatch, useAppSelector} from 'src/app/store/hook'
import {getConnections} from './store/connectionSlice'
import Connections from './components/Connections'
import SupportIcon from './components/SupportFeedback/SupportIcon'
import FeedbackIcon from './components/SupportFeedback/FeedbackIcon'

const container = {
  show: {
    transition: {
      staggerChildren: 2,
    },
  },
}

const item = {
  hidden: {opacity: 0, y: 100},
  show: {opacity: 1, y: 0},
}

const DashboardWrapper: FC = () => {
  const {connections} = useAppSelector(({post}) => post.filter.filter)
  // const media = useMediaQuery()
  return (
    <>
      <motion.div variants={container} initial='hidden' animate='show'>
        <Grid container justifyContent='center' columnSpacing={4} sx={{mt: 5}}>
          {/* <Grid item md={1}></Grid> */}
          <Grid item md={6}>
            {connections && (
              <Typography color='GrayText' textAlign='center'>
                Viewing your Connections. Click "Your Connections" above to view all posts
              </Typography>
            )}
            <motion.div variants={item} initial='hidden' animate='show' className='mt-2'>
              <MyPostsDashboard />
            </motion.div>
          </Grid>
          <Hidden mdDown>
            <Grid item md={3}>
              <Connections position='fixed' />
            </Grid>
          </Hidden>
        </Grid>
      </motion.div>
    </>
  )
}

export default memo(DashboardWrapper)
