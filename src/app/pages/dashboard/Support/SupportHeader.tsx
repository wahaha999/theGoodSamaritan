import {Grid, TextField, Typography} from '@mui/material'
import {Controller, useFormContext} from 'react-hook-form'
import {useAppSelector} from 'src/app/store/hook'

type Props = {}

const SupportHeader = (props: Props) => {
  const methods = useFormContext()
  const {control, watch, formState} = methods
  const {errors} = formState
  const {first_name, last_name, email} = useAppSelector(({user}) => user.user)
  const {non_profit_name} = useAppSelector(({user}) => user.user.account)

  return (
    <div>
      <Typography variant='h5' color='primary'>
        Welcome to Support, we are hear to server you. Please enter the required fields below and we
        will get back to you as soon as we can.
      </Typography>
      <Grid container sx={{mt: 4}} spacing={4}>
        <Grid item md={3} sm={6} xs={12}>
          <Controller
            name='non_profit_name'
            control={control}
            defaultValue={non_profit_name}
            render={({field}) => (
              <TextField label='Non Profit Name' fullWidth disabled {...field} />
            )}
          />
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <Controller
            name='first_name'
            control={control}
            defaultValue={first_name}
            render={({field}) => <TextField label='First Name' fullWidth disabled {...field} />}
          />
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <Controller
            name='last_name'
            control={control}
            defaultValue={last_name}
            render={({field}) => <TextField label='Last Name' fullWidth disabled {...field} />}
          />
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <Controller
            name='email'
            control={control}
            defaultValue={email}
            render={({field}) => <TextField label='User Email' fullWidth disabled {...field} />}
          />
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <Controller
            name='add_email'
            defaultValue=''
            control={control}
            render={({field}) => (
              <TextField
                label='Additional Email'
                fullWidth
                {...field}
                error={!!errors.add_email}
                helperText={errors?.add_email?.message as string}
              />
            )}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default SupportHeader
