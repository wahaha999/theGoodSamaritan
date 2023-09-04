import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel} from '@mui/material'
import React from 'react'
import {Controller, useFormContext} from 'react-hook-form'

type Props = {}

const Wants = (props: Props) => {
  const methods = useFormContext()
  const {
    control,
    watch,
    formState: {errors},
  } = methods
  const want = watch('want', [false, false, false])
  console.log('want==', want)
  return (
    <Controller
      name='want'
      control={control}
      defaultValue={[false, false, false]}
      render={({field}) => (
        <FormControl component='fieldset' variant='standard' required fullWidth sx={{mb: 4}}>
          <FormLabel>Do you want to:</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={want[0]}
                  onChange={(e) =>
                    field.onChange(
                      e.target.checked ? [true, ...want.slice(1)] : [false, ...want.slice(1)]
                    )
                  }
                />
              }
              label='Report this user (email will be sent to the Good Samaritan email for further review'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={want[1]}
                  onChange={(e) => field.onChange([want[0], e.target.checked, want[2]])}
                />
              }
              label='Silence this user (All future and previous posts and connections will no longer be displayed from this user'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={want[2]}
                  onChange={(e) => field.onChange([...want.slice(0, 2), e.target.checked])}
                />
              }
              label='Silence this Non-Profit (All future and previous posts and connections will no longer be displayed from this Non-Profit)'
            />
          </FormGroup>
        </FormControl>
      )}
    />
  )
}

export default Wants
