import {Grid, TextField} from '@mui/material'
import React from 'react'
import {Controller, useFormContext} from 'react-hook-form'

type Props = {}

const ConnectionContent = (props: Props) => {
  const methods = useFormContext()
  const {control} = methods

  return (
    <div>
      <Grid container flexDirection='column' gap={2}>
        {/* <Grid item>
          <TextField label='Enter a Subject' fullWidth />
        </Grid>
        <Grid item>
          <TextField fullWidth label='Select neighbors' />
        </Grid> */}
        <Grid item>
          <Controller
            name='message'
            control={control}
            render={({field}) => (
              <TextField multiline rows={6} fullWidth label='Enter a Message' {...field} />
            )}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default ConnectionContent
