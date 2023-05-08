import React, {useMemo, useState} from 'react'
import {
  Typography,
  Grid,
  Box,
  TextField,
  InputAdornment,
  Autocomplete,
  CircularProgress,
} from '@mui/material'
import {Controller, useForm, useFormContext} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import FuseSvgIcon from 'src/app/modules/core/FuseSvgIcon/FuseSvgIcon'
import axios from 'axios'
import {API_URL} from 'src/app/modules/auth/core/_requests'
import {IState} from '../../store/planSlice'
import withReducer from 'src/app/store/withReducer'
import reducer from '../../store'
import {useAppSelector} from 'src/app/store/hook'

type Props = {}

const Location = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const [options, setOptions] = React.useState<readonly IState[]>([])
  const loading = open && options.length === 0

  const methods = useFormContext()
  const {control, formState, watch} = methods

  const {errors} = formState
  const {state} = useAppSelector(({Account}) => Account.plan)

  const tempState: any[] = useMemo(() => {
    if (state) {
      let temp: any = []
      Object.keys(state).map((item, index) => {
        temp.push(`${state[item].State} - ${state[item].Description}`)
      })
      return temp
    }
  }, [state])

  // React.useEffect(() => {
  //   let active = true

  //   if (!loading) {
  //     return undefined
  //   }

  //   ;(async () => {
  //     const {data} = await axios.get(`${API_URL}/get_state`)
  //     console.log('data==', data)

  //     if (active) {
  //       setOptions([...data])
  //     }
  //   })()

  //   return () => {
  //     active = false
  //   }
  // }, [loading])

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
              defaultValue=''
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
              defaultValue=''
              render={({field: {value, ...other}}) => {
                console.log('value==', value)
                return (
                  <TextField
                    {...other}
                    className='mt-32'
                    value={value == 'null' ? '' : value}
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
                )
              }}
            />
            {/* <TextField label='Fax Number' fullWidth /> */}
          </Grid>
          <Grid item md={12}>
            <Controller
              control={control}
              defaultValue=''
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
              defaultValue=''
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
            {state && (
              <Controller
                control={control}
                name='state'
                defaultValue=''
                render={({field: {onChange, value}}) => {
                  return (
                    <Autocomplete
                      id='state'
                      fullWidth
                      value={value ?? ''}
                      inputValue={value ?? ''}
                      // defaultValue={value}
                      // onOpen={() => {
                      //   setOpen(true)
                      // }}
                      onChange={(event: any, newValue: any) => {
                        onChange(newValue.split('-')[0].trim())
                      }}
                      onInputChange={(event, newInputValue) => {
                        onChange(newInputValue ?? '')
                      }}
                      // onClose={() => {
                      //   setOpen(false)
                      // }}
                      isOptionEqualToValue={(option, value) => option == value}
                      getOptionLabel={(option) => option}
                      options={tempState}
                      loading={loading}
                      renderInput={(params) => (
                        <TextField
                          error={!!errors.state}
                          helperText={errors?.state?.message as string}
                          {...params}
                          label='state'
                        />
                      )}
                    />
                  )
                }}
              />
            )}
          </Grid>
          <Grid item md={6}>
            <Controller
              control={control}
              name='zip_code'
              defaultValue=''
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

export default withReducer('Account', reducer)(Location)
