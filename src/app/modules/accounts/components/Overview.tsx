/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect, useState} from 'react'
import {toServerUrl} from '../../../../_metronic/helpers'
import {Button, Grid, IconButton, TextField, Typography} from '@mui/material'
import {Controller, FormProvider, useForm, useFormContext} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useAppDispatch, useAppSelector} from 'src/app/store/hook'
import {updateUser} from 'src/app/pages/dashboard/store/accountSlice'
import {showMessage} from 'src/app/store/fuse/messageSlice'
import FuseSvgIcon from '../../core/FuseSvgIcon/FuseSvgIcon'
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
    formState: {errors},
  } = methods
  // const value = watch(`${name}`)
  return (
    <Controller
      name={name}
      control={control}
      render={({field}) => (
        <TextField
          {...field}
          defaultValue=''
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
  const [preview, setPreview] = useState()
  const users = useAppSelector(({user}) => user.user)
  const dispatch = useAppDispatch()
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
  const user = watch()
  const onSubmit = (data: any) => {
    const {account_dbkey, email_verified_at, id, updated_at, ...res_data} = data
    dispatch(updateUser(res_data))
      .then(() => {
        dispatch(showMessage({message: 'Successful updated', variant: 'success'}))
      })
      .catch(() => {})
      .finally(() => {
        setEdit(false)
      })
  }

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
                    handleSubmit(onSubmit)()
                  }
                }}
                variant='contained'
              >
                {edit ? 'Save' : 'Edit Profile'}
              </Button>
            </div>
          </div>

          <div className='card-body p-9'>
            <Grid container alignItems='center'>
              <Grid item md={10}>
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
                    <Typography>Title</Typography>
                  </Grid>
                  <Grid item md={8}>
                    {edit ? (
                      <StyledTextFiled label='Title' name='title' required />
                    ) : (
                      <Typography>{user?.title}</Typography>
                    )}
                  </Grid>
                </Grid>
                <Grid container spacing={2} alignItems='center' mb={3}>
                  <Grid item md={4}>
                    <Typography>Contact Phone</Typography>
                  </Grid>
                  <Grid item md={8}>
                    {edit ? (
                      <StyledTextFiled label='Contact Phone' name='phone_number' />
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
              </Grid>
              <Grid item md={2}>
                <Controller
                  name='avatar'
                  control={control}
                  render={({field: {onChange}}) => (
                    <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                      <img
                        src={preview ? preview : toServerUrl('/media/user/avatar/' + user?.avatar)}
                        alt='Metronic'
                      />
                      <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div>
                      <div className='absolute inset-0 flex items-center justify-around z-20'>
                        <div>
                          <label htmlFor='button-avatar' className='flex p-2 cursor-pointer'>
                            <input
                              accept='image/*'
                              className='hidden'
                              id='button-avatar'
                              type='file'
                              onChange={async (e: any) => {
                                function readFileAsync() {
                                  return new Promise((resolve, reject) => {
                                    const file = e.target.files[0]
                                    if (!file) {
                                      return
                                    }
                                    const reader: any = new FileReader()

                                    reader.onload = () => {
                                      resolve(`data:${file.type};base64,${btoa(reader.result)}`)
                                    }
                                    reader.onerror = reject
                                    reader.readAsBinaryString(file)
                                  })
                                }
                                const newImage: any = await readFileAsync()
                                setPreview(newImage)
                                onChange(e.target.files[0])
                              }}
                            />
                            {edit && (
                              <FuseSvgIcon className='text-white'>
                                heroicons-solid:camera
                              </FuseSvgIcon>
                            )}
                          </label>
                        </div>
                        {edit && (
                          <div>
                            <IconButton
                              onClick={() => {
                                onChange('')
                              }}
                            >
                              <FuseSvgIcon className='text-white'>
                                heroicons-solid:trash
                              </FuseSvgIcon>
                            </IconButton>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </FormProvider>
    </>
  )
}
