import {Button, ButtonProps} from '@mui/material'
import axios from 'axios'
import React from 'react'
import {API_URL} from 'src/app/modules/auth/core/_requests'

type BillingManageProps = {
  customer_id: string
  title: string
}
type ExtendedButtonProps = BillingManageProps & ButtonProps

const BillingManage = (props: ExtendedButtonProps) => {
  const {customer_id, title} = props

  const handleClick = () => {
    axios
      .post(`${API_URL}/billing/manage`, {customer_id})
      .then((res) => {
        const {url} = res.data
        window.location.href = url
      })
      .catch((err) => console.log('err=', err))
  }

  // Use ComponentProps to extend Button props

  return (
    <>
      <Button onClick={handleClick} {...props}>
        {title}
      </Button>
    </>
  )
}

export default BillingManage
