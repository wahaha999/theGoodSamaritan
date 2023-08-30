import React, {useMemo, useState} from 'react'
import {
  Typography,
  Grid,
  Box,
  TextField,
  InputAdornment,
  Autocomplete,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
  Button,
} from '@mui/material'
import {Controller, useFormContext} from 'react-hook-form'
import FuseSvgIcon from 'src/app/modules/core/FuseSvgIcon/FuseSvgIcon'
import {IState} from '../../store/planSlice'
import {useAppSelector} from 'src/app/store/hook'
import {ITimezone, timezone} from 'src/app/constants/timezone'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import BillingManage from '../../Billing/BillingManage'

type Props = {}

const Location = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const [options, setOptions] = React.useState<readonly IState[]>([])
  const loading = open && options.length === 0

  const methods = useFormContext()
  const {control, formState, watch} = methods
  const {product_name, state, customer_id} = useAppSelector(({user}) => user.user.account)
  const {states: plan_state} = useAppSelector(({user}) => user)

  const {errors} = formState
  const {state: states} = useAppSelector(({post}) => post.plan)

  const tempState: any[] = useMemo(() => {
    if (states) {
      let temp: any = []
      Object.keys(states).map((item, index) => {
        temp.push(`${states[item].State} - ${states[item].Description}`)
      })
      return temp
    }
  }, [states])

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
        <Grid container spacing={4}>
          <Grid item md={6} sm={12} xs={12}>
            <Controller
              name='phone_number'
              control={control}
              defaultValue=''
              render={({field: {value, ...other}}) => (
                <TextField
                  className='mt-32'
                  value={value == 'null' ? '' : value}
                  {...other}
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
          <Grid item md={6} sm={12} xs={12}>
            <Controller
              control={control}
              name='fax_number'
              defaultValue=''
              render={({field: {value, ...other}}) => {
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
          <Grid item md={12} sm={12} xs={12}>
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
          <Grid item md={6} sm={12} xs={12}>
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
          <Grid item md={6} sm={12} xs={12}>
            <Controller
              name='timezone'
              control={control}
              defaultValue=''
              render={({field}) => (
                <FormControl fullWidth error={!!errors.timezone}>
                  <InputLabel>Timezone</InputLabel>
                  <Select
                    {...field}
                    label='Timezone'
                    // fullWidth
                    startAdornment={
                      <InputAdornment position='start'>
                        <AccessTimeIcon />
                      </InputAdornment>
                    }
                  >
                    {timezone.map((item: ITimezone, index: number) => (
                      <MenuItem value={item.title} key={index}>
                        {item.title}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.timezone?.message as string}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            {states && (
              <Controller
                control={control}
                name='state'
                defaultValue=''
                render={({field: {onChange, value}}) => {
                  return (
                    <Autocomplete
                      id='state'
                      value={value ?? ''}
                      inputValue={value ?? ''}
                      fullWidth
                      // defaultValue={value}
                      // onOpen={() => {
                      //   setOpen(true)
                      // }}
                      onChange={(event: any, newValue: any) => {
                        onChange(newValue === null ? '' : newValue.split('-')[0].trim())
                      }}
                      onInputChange={(event, newInputValue) => {
                        onChange(newInputValue ?? '')
                      }}
                      // onClose={() => {
                      //   setOpen(false)
                      // }}
                      isOptionEqualToValue={(option, value) => option == value}
                      getOptionLabel={(option) => option}
                      getOptionDisabled={(option) => {
                        let disableOption = true // Default value
                        if (state) {
                          Object.keys(plan_state).forEach((item) => {
                            if (item == option.split('-')[0].trim()) {
                              disableOption = false
                            }
                          })
                          return disableOption
                        } else {
                          return false
                        }
                      }}
                      options={tempState}
                      loading={loading}
                      renderInput={(params) => {
                        return (
                          <TextField
                            error={!!errors.state}
                            helperText={errors?.state?.message as string}
                            {...params}
                            label='state'
                          />
                        )
                      }}
                    />
                  )
                }}
              />
            )}
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
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
      <Typography my={2}>
        {product_name === 'Local' && (
          <span>
            You are currently registered for the local plan. This plan only allows you to change
            your state 1 time. If you want to view and interact with organizations from different
            states please consider upgrading to either our regional or national plan. Click
            {
              <span>
                <BillingManage
                  title='here'
                  variant='text'
                  color='primary'
                  customer_id={customer_id}
                  sx={{textTransform: 'lowercase', fontSize: 14, p: 0, textDecoration: 'underline'}}
                />
              </span>
            }{' '}
            to upgrade your plan.
          </span>
        )}
        {product_name === 'Regional' && (
          <span>
            You are currently registered for the regional plan. If you want to view and interact
            with organizations from different regions you will need to upgrade to the National plan.
            Click
            <span>
              <BillingManage
                title='here'
                variant='text'
                color='primary'
                customer_id={customer_id}
                sx={{textTransform: 'lowercase', fontSize: 14, p: 0, textDecoration: 'underline'}}
              />
            </span>
            to upgrade your plan.
          </span>
        )}
      </Typography>
    </>
  )
}

export default Location
