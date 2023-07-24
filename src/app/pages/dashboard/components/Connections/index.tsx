import React, {useEffect, useMemo, useState} from 'react'
import {motion} from 'framer-motion'
import FollowingDashboard from '../FollowingDashboard'
import PostTitleItem from '../PostTitleItem'
import {Box} from '@mui/material'
import {getConnections} from '../../store/connectionSlice'
import {useAppDispatch, useAppSelector} from 'src/app/store/hook'
import _ from 'src/app/modules/@lodash/@lodash'
import SupportIcon from '../SupportFeedback/SupportIcon'
import FeedbackIcon from '../SupportFeedback/FeedbackIcon'
import {addFilterForHeader} from '../../store/filterSlice'

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
  const [search, setSearch] = useState<string>('')

  const [selectedUser, setSelectedUser] = useState<any>([])
  useEffect(() => {
    dispatch(addFilterForHeader({selectedUser}))
  }, [dispatch, selectedUser])
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

  const searchConnections = useMemo(() => {
    return _.filter(
      conns.accepts,
      (e: any) =>
        e.sender.account.non_profit_name.includes(search) ||
        e.sender.account.non_profit_name.includes(search) ||
        e.receiver.account.non_profit_name.includes(search) ||
        e.receiver.account.non_profit_name.includes(search)
    )
  }, [search, conns.accepts])

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
                  title={`${item.sender.account.non_profit_name}`}
                  img={item.sender.account.avatar}
                />
              ))}
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
                  title={`${item.receiver.account.non_profit_name}`}
                  img={item.receiver.account.avatar}
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
              setSearch={setSearch}
            >
              {searchConnections?.map((item: any, index: number) => (
                <PostTitleItem
                  connection_id={item.id}
                  request
                  status='accepted'
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                  key={index}
                  data={{user: user.id === item.sender.id ? item.receiver : item.sender}}
                  title={
                    user.id === item.sender.id
                      ? `${item.receiver.account.non_profit_name}`
                      : `${item.sender.account.non_profit_name}`
                  }
                  img={
                    user.id === item.sender.id
                      ? item.receiver.account.avatar
                      : item.sender.account.avatar
                  }
                />
              ))}
            </FollowingDashboard>
          </motion.div>
          <Box sx={{my: 2}}></Box>
        </>
      )}

      
    </Box>
  )
}

export default Connections
