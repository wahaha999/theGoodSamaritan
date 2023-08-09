import React, {useState, useEffect} from 'react'
import {Route, Navigate} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from 'src/app/store/hook'
import {getBillingInfo} from './store/billingSlice'

const SubscriptionMiddleware: React.FC<{element: React.ReactElement}> = ({element}) => {
  const {subscription} = useAppSelector(({post}) => post.billing)
  const currentDate = new Date()

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getBillingInfo())
  }, [])

  if (subscription) {
    const startDate = new Date(subscription.data[0].current_period_start * 1000)
    const endDate = new Date(subscription.data[0].current_period_end * 1000)

    if (currentDate >= startDate && currentDate <= endDate) {
      return element
    } else {
      return <Navigate to='/account/billing' />
    }
  }

  return null
}

export default SubscriptionMiddleware
