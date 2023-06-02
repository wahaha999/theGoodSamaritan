import {useState} from 'react'
import {Controller, FormProvider, useForm, useFormContext} from 'react-hook-form'
import {Button, Grid, InputAdornment, TextField} from '@mui/material'
import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useAppDispatch} from 'src/app/store/hook'
import {updatePassword} from 'src/app/pages/dashboard/store/accountSlice'
import FuseSvgIcon from 'src/app/modules/core/FuseSvgIcon/FuseSvgIcon'

interface IProps {
  name: string
  label: string
  placeholder?: string
  required?: boolean
  show: any
  setShow: any
}

const passwordFormValidationSchema = Yup.object().shape({
  current_password: Yup.string()
    .min(8, 'Minimum 8 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  password: Yup.string()
    .min(8, 'Minimum 8 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  password_confirmation: Yup.string()
    .min(8, 'Minimum 8 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
})

const StyledTextFiled = (props: IProps) => {
  const {name, label, show, setShow, ...rest} = props
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
          type={show.includes(name) ? 'text' : 'password'}
          fullWidth
          {...field}
          defaultValue=''
          InputProps={{
            endAdornment: (
              <InputAdornment
                position='end'
                sx={{cursor: 'pointer'}}
                onClick={() => {
                  if (show.includes(name)) {
                    setShow(show.filter((item: string) => item !== name))
                  } else {
                    setShow([...show, name])
                  }
                }}
              >
                <FuseSvgIcon size={20}>
                  {show.includes(name) ? `heroicons-solid:eye-off` : `heroicons-solid:eye`}
                </FuseSvgIcon>
              </InputAdornment>
            ),
          }}
          label={label}
          {...rest}
          error={!!errors[name]}
          helperText={errors[name]?.message as string}
        />
      )}
    />
  )
}

export function Settings() {
  const [show, setShow] = useState([])
  const methods = useForm({mode: 'onChange', resolver: yupResolver(passwordFormValidationSchema)})
  const dispatch = useAppDispatch()
  const {handleSubmit} = methods

  const onSubmit = (data: any) => {
    dispatch(updatePassword(data))
  }
  return (
    <>
      <FormProvider {...methods}>
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
          <div className='card-header cursor-pointer'>
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Change Password</h3>
            </div>
            <div className='align-self-center'>
              <Button onClick={() => handleSubmit(onSubmit)()} variant='contained'>
                Change Password
              </Button>
            </div>
          </div>
          <div className='card-body p-9'>
            <Grid container spacing={2}>
              <Grid item md={4}>
                <StyledTextFiled
                  show={show}
                  setShow={setShow}
                  label='Current Password'
                  placeholder='Current Password'
                  name='current_password'
                />
              </Grid>
              <Grid item md={4}>
                <StyledTextFiled
                  show={show}
                  setShow={setShow}
                  label='New Password'
                  placeholder='New Password'
                  name='password'
                />
              </Grid>
              <Grid item md={4}>
                <StyledTextFiled
                  show={show}
                  setShow={setShow}
                  label='Confirm Password'
                  placeholder='Confirm Password'
                  name='password_confirmation'
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </FormProvider>
    </>
  )
}
