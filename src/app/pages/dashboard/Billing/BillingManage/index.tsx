import {Button} from '@mui/material'
import axios from 'axios'
import React from 'react'
import {API_URL} from 'src/app/modules/auth/core/_requests'

type Props = {
  customer_id: string
  color: 'primary' | 'secondary' | 'error'
  title: string
  variant: 'contained' | 'outlined'
}

const BillingManage = (props: Props) => {
  const {customer_id, color, title, variant} = props

  const handleClick = () => {
    axios
      .post(`${API_URL}/billing/manage`, {customer_id})
      .then((res) => {
        const {url} = res.data
        window.location.href = url
      })
      .catch((err) => console.log('err=', err))
  }

  return (
    <>
      <Button onClick={handleClick} color={color} variant={variant}>
        {title}
      </Button>
    </>
  )
}

export default BillingManage
