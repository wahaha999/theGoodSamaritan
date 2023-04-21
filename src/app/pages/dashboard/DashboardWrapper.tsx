/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {useIntl} from 'react-intl'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {PageTitle} from '../../../_metronic/layout/core'
import { Box, Grid,Paper } from '@mui/material'
import MyPostsDashboard from './components/MyPostsDashboard'
import FollowingDashboard from './components/FollowingDashboard'
import PostTitleItem from './components/PostTitleItem'


const DashboardPage: FC = () => (
  <>
    <Grid container columnSpacing={4} sx={{mt:2}}>
      <Grid item md={5}>
        <MyPostsDashboard/>
      </Grid>
      <Grid item md={4}>
        <FollowingDashboard placeholder='Search Followers' title="Following 25 Profits">
          <PostTitleItem title='Faith Convenant Church' img='/media/avatars/300-1.jpg'/>
          <PostTitleItem title='Brownsville Church of Saints' img='/media/avatars/300-3.jpg'/>
          <PostTitleItem title='Faith Convenant Church' img='/media/avatars/300-5.jpg'/>
        </FollowingDashboard>
        <Box sx={{my:2}}></Box>
        <FollowingDashboard placeholder='Search Followers' title="32 Non Profits Following Me">
          <PostTitleItem title='Faith Convenant Church' img='/media/avatars/300-1.jpg'/>
          <PostTitleItem title='Brownsville Church of Saints' img='/media/avatars/300-3.jpg'/>
          <PostTitleItem title='Faith Convenant Church' img='/media/avatars/300-5.jpg'/>
        </FollowingDashboard>
      </Grid>
      <Grid item md={3}>
        <FollowingDashboard placeholder='Search Followed Ports' title="Following 45 Posts">
          <PostTitleItem title='Faith Convenant Church' img='/media/avatars/300-2.jpg'/>
          <PostTitleItem title='Faith Convenant Church' img='/media/avatars/300-7.jpg'/>
          <PostTitleItem title='Faith Convenant Church' img='/media/avatars/300-8.jpg'/>
          <PostTitleItem title='Faith Convenant Church' img='/media/avatars/300-9.jpg'/>
          <PostTitleItem title='Faith Convenant Church' img='/media/avatars/300-10.jpg'/>
        </FollowingDashboard>
      </Grid>
    </Grid>
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
