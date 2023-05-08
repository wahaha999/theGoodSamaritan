/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {KTIcon} from '../../../../_metronic/helpers'
import {
  ChartsWidget1,
  ListsWidget5,
  TablesWidget1,
  TablesWidget5,
} from '../../../../_metronic/partials/widgets'
import {Button, Grid, TextField, Typography, styled} from '@mui/material'
import {Controller, FormProvider, useForm, useFormContext} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useAppSelector} from 'src/app/store/hook'
interface IProps {
  name: string
  label: string
  placeholder?: string
  required?: boolean
}

const StyledTextFiled = (props: IProps) => {
  const {name, label, ...rest} = props
  const methods = useFormContext()
  const {
    control,
    watch,
    formState: {errors},
  } = methods
  const value = watch(`${name}`)
  return (
    <Controller
      name={name}
      control={control}
      render={({field}) => (
        <TextField
          {...field}
          label={label}
          {...rest}
          error={!!errors[name]}
          helperText={errors[name]?.message as string}
        />
      )}
    />
  )
}

const schema = yup.object().shape({
  first_name: yup.string().required('First Name is required'),
  title: yup.string().required('Title is required'),
  email: yup
    .string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
})
export function Overview() {
  const [edit, setEdit] = useState(false)
  const users = useAppSelector(({user}) => user.user)
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })
  const {control, reset, handleSubmit, watch} = methods
  useEffect(() => {
    if (users.account) {
      const {account, ...newData} = users
      reset({...newData})
    }
  }, [reset, users])
  const onSubmit = (data: any) => {
    console.log('data===', data)
  }
  const user = watch()

  return (
    <>
      <FormProvider {...methods}>
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
          <div className='card-header cursor-pointer'>
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Profile Details</h3>
            </div>
            <div className='align-self-center'>
              {edit && (
                <Button
                  onClick={() => {
                    setEdit(false)
                  }}
                  variant='contained'
                  color='inherit'
                  sx={{mr: 2}}
                >
                  Cancel
                </Button>
              )}
              <Button
                onClick={() => {
                  setEdit(true)
                  if (edit) {
                    handleSubmit(onSubmit)
                  }
                }}
                variant='contained'
              >
                {edit ? 'Save' : 'Edit Profile'}
              </Button>
            </div>
          </div>

          <div className='card-body p-9'>
            <Grid container spacing={2} alignItems='center' mb={3}>
              <Grid item md={4}>
                <Typography>First Name</Typography>
              </Grid>
              <Grid item md={8}>
                {edit ? (
                  <StyledTextFiled label='First Name' name='first_name' required />
                ) : (
                  <Typography>{user?.first_name}</Typography>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems='center' mb={3}>
              <Grid item md={4}>
                <Typography>Last Name</Typography>
              </Grid>
              <Grid item md={8}>
                {edit ? (
                  <StyledTextFiled label='Last Name' name='last_name' required />
                ) : (
                  <Typography>{user?.last_name}</Typography>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems='center' mb={3}>
              <Grid item md={4}>
                <Typography>Email</Typography>
              </Grid>
              <Grid item md={8}>
                {edit ? (
                  <StyledTextFiled label='Email' name='email' required />
                ) : (
                  <Typography>{user?.email}</Typography>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems='center' mb={3}>
              <Grid item md={4}>
                <Typography>Contact Phone</Typography>
              </Grid>
              <Grid item md={8}>
                {edit ? (
                  <StyledTextFiled label='Contact Phone' name='contact_phone' />
                ) : (
                  <Typography>{user?.phone_number}</Typography>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems='center' mb={3}>
              <Grid item md={4}>
                <Typography>Level</Typography>
              </Grid>
              <Grid item md={8}>
                <Typography>Account owner</Typography>
              </Grid>
            </Grid>
            {/* <div className='row  mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Full Name</label>

            <div className='col-lg-8'>
              {edit ? <TextField /> : <span className='fw-bolder fs-6 text-dark'>Max Smith</span>}
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Company</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>Keenthemes</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              Contact Phone
              <i
                className='fas fa-exclamation-circle ms-1 fs-7'
                data-bs-toggle='tooltip'
                title='Phone number must be active'
              ></i>
            </label>

            <div className='col-lg-8 d-flex align-items-center'>
              <span className='fw-bolder fs-6 me-2'>044 3276 454 935</span>

              <span className='badge badge-success'>Verified</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Company Site</label>

            <div className='col-lg-8'>
              <a href='#' className='fw-bold fs-6 text-dark text-hover-primary'>
                keenthemes.com
              </a>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              Country
              <i
                className='fas fa-exclamation-circle ms-1 fs-7'
                data-bs-toggle='tooltip'
                title='Country of origination'
              ></i>
            </label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>Germany</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Communication</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>Email, Phone</span>
            </div>
          </div>

          <div className='row mb-10'>
            <label className='col-lg-4 fw-bold text-muted'>Allow Changes</label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'>Yes</span>
            </div>
          </div> */}

            {/* <div className='notice d-flex bg-light-warning rounded border-warning border border-dashed p-6'>
            <KTIcon iconName='information-5' className='fs-2tx text-warning me-4' />
            <div className='d-flex flex-stack flex-grow-1'>
              <div className='fw-bold'>
                <h4 className='text-gray-800 fw-bolder'>We need your attention!</h4>
                <div className='fs-6 text-gray-600'>
                  Your payment was declined. To start using tools, please
                  <Link className='fw-bolder' to='/crafted/account/settings'>
                    {' '}
                    Add Payment Method
                  </Link>
                  .
                </div>
              </div>
            </div>
          </div> */}
          </div>
        </div>
      </FormProvider>

      {/* <div className='row gy-10 gx-xl-10'>
        <div className='col-xl-6'>
          <ChartsWidget1 className='card-xxl-stretch mb-5 mb-xl-10' />
        </div>

        <div className='col-xl-6'>
          <TablesWidget1 className='card-xxl-stretch mb-5 mb-xl-10' />
        </div>
      </div>

      <div className='row gy-10 gx-xl-10'>
        <div className='col-xl-6'>
          <ListsWidget5 className='card-xxl-stretch mb-5 mb-xl-10' />
        </div>

        <div className='col-xl-6'>
          <TablesWidget5 className='card-xxl-stretch mb-5 mb-xl-10' />
        </div>
      </div> */}
    </>
  )
}
