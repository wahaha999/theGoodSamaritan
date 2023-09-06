import {
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import React from 'react'
import {Controller, useFormContext} from 'react-hook-form'
import FilterCenterFocusIcon from '@mui/icons-material/FilterCenterFocus'
type Props = {}
interface IReason {
  id: number
  title: string
}
export const reasons: IReason[] = [
  {
    id: 1,
    title: 'Spam',
  },
  {
    id: 2,
    title: 'Trolling and Disruptive Behavior',
  },
  {
    id: 3,
    title: 'Impersonation',
  },

  {
    id: 4,
    title: 'Violation of Terms of Service',
  },

  {
    id: 5,
    title: 'Doxing and Personal Attacks',
  },

  {
    id: 6,
    title: 'In appropriate behavior',
  },

  {
    id: 7,
    title: 'Falsely Representing Non-Profit',
  },

  {
    id: 8,
    title: 'Other',
  },
]

const Reason = (props: Props) => {
  const methods = useFormContext()
  const {
    control,
    formState: {errors},
  } = methods
  return (
    <Grid container mb={4} alignItems='center'>
      <Grid item md={2}>
        <Typography variant='h6'>Reason*</Typography>
      </Grid>
      <Grid item md={10}>
        <Controller
          name='reason'
          defaultValue={''}
          control={control}
          render={({field}) => (
            <FormControl fullWidth error={!!errors.reason}>
              <InputLabel required id='select-label'>
                Reason
              </InputLabel>
              <Select
                required
                fullWidth
                labelId='select-label'
                placeholder='Select your reason'
                id='label-select'
                {...field}
                startAdornment={
                  <InputAdornment position='start'>
                    <FilterCenterFocusIcon />
                  </InputAdornment>
                }
                //   value={value}
                label='Reason'
                //   onChange={handleChange}
                //   ref={ref}
                classes={{select: 'd-flex items-center space-x-12'}}
              >
                {reasons.map((label) => (
                  <MenuItem value={label.id} key={label.id} className='space-x-12'>
                    {/* {label.icon} */}
                    <span>{label.title}</span>
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors?.reason?.message as string}</FormHelperText>
            </FormControl>
          )}
        />
      </Grid>
    </Grid>
  )
}

export default Reason
