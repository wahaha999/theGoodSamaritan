import React, {useEffect, useMemo} from 'react'
import {motion} from 'framer-motion'
import FollowingDashboard from '../FollowingDashboard'
import PostTitleItem from '../PostTitleItem'
import {Box} from '@mui/material'
import {getConnections} from '../../store/connectionSlice'
import {useAppDispatch, useAppSelector} from 'src/app/store/hook'
import _ from 'src/app/modules/@lodash/@lodash'
import SupportIcon from '../SupportFeedback/SupportIcon'
import FeedbackIcon from '../SupportFeedback/FeedbackIcon'

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
type Props = {
  position: 'fixed' | 'none'
}

const Connections = (props: Props) => {
  const {position} = props
  const {connections} = useAppSelector(({post}) => post)
  const {user} = useAppSelector(({user}) => user)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getConnections())
  }, [dispatch])

  const conns = useMemo(() => {
    let pending = _.filter(
      connections,
      (e: any) => e.status === 'pending' && e.sender.id === user.id
    )
    let pendingWithUser = _.filter(
      connections,
      (e: any) => e.status === 'pending' && e.receiver.id === user.id
    )
    let accepts = _.filter(connections, (e: any) => e.status === 'accepted')
    return {pending, pendingWithUser, accepts}
  }, [connections, user])
  return (
    <Box sx={{position: position}}>
      {conns.pendingWithUser.length > 0 && (
        <>
          <motion.div variants={item} initial='hidden' animate='show'>
            <FollowingDashboard
              title={`${conns.pendingWithUser.length} Connections Pending Your Approval`}
            >
              {conns.pendingWithUser?.map((item: any, index: number) => (
                <PostTitleItem
                  connection_id={item.id}
                  status='pending'
                  key={index}
                  data={{user: item.sender}}
                  pending
                  title={`${item.sender.first_name} ${item.sender.last_name}`}
                  img={item.sender.avatar}
                />
              ))}
              {/* <PostTitleItem pending title='Faith Convenant Church' img='/media/avatars/300-1.jpg' />
          <PostTitleItem
            pending
            title='Brownsville Church of Saints'
            img='/media/avatars/300-3.jpg'
          />
          <PostTitleItem pending title='Faith Convenant Church' img='/media/avatars/300-5.jpg' /> */}
            </FollowingDashboard>
          </motion.div>
          <Box sx={{my: 2}}></Box>
        </>
      )}
      {conns.pending.length > 0 && (
        <>
          <motion.div variants={item} initial='hidden' animate='show'>
            <FollowingDashboard title={`${conns.pending.length} Pending Connections`}>
              {conns.pending?.map((item: any, index: number) => (
                <PostTitleItem
                  connection_id={item.id}
                  key={index}
                  status='pending'
                  data={{user: item.receiver}}
                  title={`${item.receiver.first_name} ${item.receiver.last_name}`}
                  img={item.receiver.avatar}
                />
              ))}

              {/* <PostTitleItem title='Faith Convenant Church' img='/media/avatars/300-5.jpg' /> */}
            </FollowingDashboard>
          </motion.div>
          <Box sx={{my: 2}}></Box>
        </>
      )}
      {conns.accepts.length > 0 && (
        <>
          <motion.div variants={item} initial='hidden' animate='show'>
            <FollowingDashboard
              placeholder='Search your connections'
              title={conns.accepts.length + ' Connections'}
            >
              {conns.accepts?.map((item: any, index: number) => (
                <PostTitleItem
                  connection_id={item.id}
                  request
                  status='accepted'
                  key={index}
                  data={{user: user.id === item.sender.id ? item.receiver : item.sender}}
                  title={
                    user.id === item.sender.id
                      ? `${item.receiver.first_name} ${item.receiver.last_name}`
                      : `${item.sender.first_name} ${item.sender.last_name}`
                  }
                  img={user.id === item.sender.id ? item.receiver.avatar : item.sender.avatar}
                />
              ))}
            </FollowingDashboard>
          </motion.div>
          <Box sx={{my: 2}}></Box>
        </>
      )}

      <motion.div variants={item} initial='hidden' animate='show' className='d-flex justify-around'>
        <SupportIcon />
        <FeedbackIcon />
      </motion.div>
    </Box>
  )
}

export default Connections
