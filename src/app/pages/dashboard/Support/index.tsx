import {Paper} from '@mui/material'
import React from 'react'
import SupportHeader from './SupportHeader'
import {FormProvider, useForm} from 'react-hook-form'
import SupportContent from './SupportContent'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

type Props = {}

const Support = (props: Props) => {
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(
      yup.object().shape({
        messages: yup.string().required('You must enter message'),
        add_email: yup.string().email('Invalid email'),
      })
    ),
  })
  return (
    <Paper className='m-4 p-4 sm:m-1 sm:p-1'>
      <FormProvider {...methods}>
        <SupportHeader />
        <SupportContent />
      </FormProvider>
    </Paper>
  )
}

export default Support
