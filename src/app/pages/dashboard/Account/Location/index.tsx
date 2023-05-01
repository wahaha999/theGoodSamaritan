import React from 'react'
import {Typography, Grid, Box, TextField, InputAdornment} from '@mui/material'
import {Controller, useForm, useFormContext} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import FuseSvgIcon from 'src/app/modules/core/FuseSvgIcon/FuseSvgIcon'

const schema = yup.object().shape({
  phone_number: yup.string().required('You must enter a Phone Number'),
})

type Props = {}

const Location = (props: Props) => {
  const methods = useFormContext()
  const {control, formState, watch} = methods
  const {errors} = formState

  return (
    <>
      <Typography variant='h5' my={2}>
        Please enter the physical location of your Non-Profit
      </Typography>
      <Typography my={2}>
        **Note: Your state will be used to determine who you can reach out to based on the plan you
        select
      </Typography>
      <Box component='form'>
        <Grid container spacing={4} maxWidth='md'>
          <Grid item md={6}>
            <Controller
              name='phone_number'
              control={control}
              render={({field}) => (
                <TextField
                  className='mt-32'
                  {...field}
                  label='Phone Number'
                  placeholder='Phone Number'
                  id='phone_number'
                  error={!!errors.phone_number}
                  helperText={errors?.phone_number?.message as string}
                  variant='outlined'
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <FuseSvgIcon size={20}>heroicons-solid:phone</FuseSvgIcon>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
          <Grid item md={6}>
            <Controller
              control={control}
              name='fax_number'
              render={({field}) => (
                <TextField
                  className='mt-32'
                  {...field}
                  label='Fax Number'
                  placeholder='Fax Number'
                  id='fax_number'
                  error={!!errors.fax_number}
                  helperText={errors?.fax_number?.message as string}
                  variant='outlined'
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <FuseSvgIcon size={20}>heroicons-solid:paper-airplane</FuseSvgIcon>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            {/* <TextField label='Fax Number' fullWidth /> */}
          </Grid>
          <Grid item md={12}>
            <Controller
              control={control}
              name='address'
              render={({field}) => (
                <TextField
                  className='mt-32'
                  required
                  {...field}
                  label='Address'
                  placeholder='Address'
                  id='address'
                  error={!!errors.address}
                  helperText={errors?.address?.message as string}
                  variant='outlined'
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <FuseSvgIcon size={20}>heroicons-solid:location-marker</FuseSvgIcon>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
          <Grid item md={12}>
            <Controller
              control={control}
              name='city'
              render={({field}) => (
                <TextField
                  required
                  className='mt-32'
                  {...field}
                  label='City'
                  placeholder='City'
                  id='city'
                  error={!!errors.city}
                  helperText={errors?.city?.message as string}
                  variant='outlined'
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <FuseSvgIcon size={20}>heroicons-solid:office-building</FuseSvgIcon>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
          <Grid item md={6}>
            <Controller
              control={control}
              name='state'
              render={({field}) => (
                <TextField
                  required
                  className='mt-32'
                  {...field}
                  label='State'
                  placeholder='State'
                  id='state'
                  error={!!errors.state}
                  helperText={errors?.state?.message as string}
                  variant='outlined'
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <FuseSvgIcon size={20}>heroicons-solid:beaker</FuseSvgIcon>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
          <Grid item md={6}>
            <Controller
              control={control}
              name='zip_code'
              render={({field}) => (
                <TextField
                  className='mt-32'
                  required
                  {...field}
                  label='Zip Code'
                  placeholder='Zip Code'
                  id='zip_code'
                  error={!!errors.zip_code}
                  helperText={errors?.zip_code?.message as string}
                  variant='outlined'
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <FuseSvgIcon size={20}>heroicons-solid:code</FuseSvgIcon>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Location
