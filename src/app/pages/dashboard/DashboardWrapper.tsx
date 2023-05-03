/* eslint-disable jsx-a11y/anchor-is-valid */
import {Box, Grid} from '@mui/material'
import {FC} from 'react'
import {useIntl} from 'react-intl'
import FollowingDashboard from './components/FollowingDashboard'
import MyPostsDashboard from './components/MyPostsDashboard'
import PostTitleItem from './components/PostTitleItem'

const DashboardPage: FC = () => (
  <>
    <Grid container columnSpacing={4} sx={{mt: 2}}>
      <Grid item md={8}>
        <MyPostsDashboard />
      </Grid>
      <Grid item md={4}>
        <FollowingDashboard title='3 Connections Pending Your Approval'>
          <PostTitleItem pending title='Faith Convenant Church' img='/media/avatars/300-1.jpg' />
          <PostTitleItem
            pending
            title='Brownsville Church of Saints'
            img='/media/avatars/300-3.jpg'
          />
          <PostTitleItem pending title='Faith Convenant Church' img='/media/avatars/300-5.jpg' />
        </FollowingDashboard>
        <Box sx={{my: 2}}></Box>
        <FollowingDashboard title='2 Pending Connections'>
          <PostTitleItem title='Brownsville Church of Saints' img='/media/avatars/300-3.jpg' />
          <PostTitleItem title='Faith Convenant Church' img='/media/avatars/300-5.jpg' />
        </FollowingDashboard>
        <Box sx={{my: 2}}></Box>
        <FollowingDashboard placeholder='Search your connections' title='32 Connections'>
          <PostTitleItem request title='Faith Convenant Church' img='/media/avatars/300-1.jpg' />
          <PostTitleItem title='Brownsville Church of Saints' img='/media/avatars/300-3.jpg' />
          <PostTitleItem title='Faith Convenant Church' img='/media/avatars/300-5.jpg' />
        </FollowingDashboard>
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
