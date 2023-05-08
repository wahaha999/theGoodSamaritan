/* eslint-disable jsx-a11y/anchor-is-valid */
import {Box, Grid} from '@mui/material'
import {FC} from 'react'
import {useIntl} from 'react-intl'
import FollowingDashboard from './components/FollowingDashboard'
import MyPostsDashboard from './components/MyPostsDashboard'
import PostTitleItem from './components/PostTitleItem'
import {motion} from 'framer-motion'

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

const DashboardPage: FC = () => (
  <>
    <motion.div variants={container} initial='hidden' animate='show'>
      <Grid container columnSpacing={4} sx={{mt: 2}}>
        <Grid item md={8}>
          <motion.div variants={item} initial='hidden' animate='show'>
            <MyPostsDashboard />
          </motion.div>
        </Grid>
        <Grid item md={4}>
          <motion.div variants={item} initial='hidden' animate='show'>
            <FollowingDashboard title='3 Connections Pending Your Approval'>
              <PostTitleItem
                pending
                title='Faith Convenant Church'
                img='/media/avatars/300-1.jpg'
              />
              <PostTitleItem
                pending
                title='Brownsville Church of Saints'
                img='/media/avatars/300-3.jpg'
              />
              <PostTitleItem
                pending
                title='Faith Convenant Church'
                img='/media/avatars/300-5.jpg'
              />
            </FollowingDashboard>
          </motion.div>
          <Box sx={{my: 2}}></Box>
          <motion.div variants={item} initial='hidden' animate='show'>
            <FollowingDashboard title='2 Pending Connections'>
              <PostTitleItem title='Brownsville Church of Saints' img='/media/avatars/300-3.jpg' />
              <PostTitleItem title='Faith Convenant Church' img='/media/avatars/300-5.jpg' />
            </FollowingDashboard>
          </motion.div>
          <Box sx={{my: 2}}></Box>
          <motion.div variants={item} initial='hidden' animate='show'>
            <FollowingDashboard placeholder='Search your connections' title='32 Connections'>
              <PostTitleItem
                request
                title='Faith Convenant Church'
                img='/media/avatars/300-1.jpg'
              />
              <PostTitleItem title='Brownsville Church of Saints' img='/media/avatars/300-3.jpg' />
              <PostTitleItem title='Faith Convenant Church' img='/media/avatars/300-5.jpg' />
            </FollowingDashboard>
          </motion.div>
        </Grid>
        {/* <Grid item md={3}>
        <FollowingDashboard placeholder='Search Followed Ports' title='45 Saved Posts'>
          <PostTitleItem request title='Faith Convenant Church' img='/media/avatars/300-2.jpg' />
          <PostTitleItem request title='Faith Convenant Church' img='/media/avatars/300-7.jpg' />
          <PostTitleItem title='Faith Convenant Church' img='/media/avatars/300-8.jpg' />
          <PostTitleItem title='Faith Convenant Church' img='/media/avatars/300-9.jpg' />
          <PostTitleItem title='Faith Convenant Church' img='/media/avatars/300-10.jpg' />
        </FollowingDashboard>
      </Grid> */}
      </Grid>
    </motion.div>
  </>
)

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
