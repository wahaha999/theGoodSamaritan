import {Grid, TextField} from '@mui/material'
import React from 'react'

type Props = {}

const ConnectionContent = (props: Props) => {
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
          <TextField multiline rows={6} fullWidth label='Enter a Message' />
        </Grid>
      </Grid>
    </div>
  )
}

export default ConnectionContent
