import React from 'react'
import { Typography,Grid,Box,TextField } from '@mui/material'

type Props = {}

const Location = (props: Props) => {
  return (
    <>
      <Typography variant="h5" my={2}>Please enter the physical location of your Non-Profit</Typography>
      <Typography my={2}>**Note: Your state will be used to determine who you can reach out to based on the plan you select</Typography>
      <Box component='form'>

      <Grid container spacing={4} maxWidth='md'>
        <Grid item md={6}>
          <TextField
            id="outlined-controlled"
            label="Phone Number"
            fullWidth
            // value={name}
            // onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            //   setName(event.target.value);
            // }}
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            label="Fax Number"
            fullWidth
          />
        </Grid>
        <Grid item md={12}>
          <TextField
            required
            fullWidth
            label="Address Line"
          />
        </Grid>
        <Grid item md={12}>
          <TextField
            required
            fullWidth
            label="City"
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            required
            fullWidth
            label="State"
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            required
            fullWidth
            label="Zip Code"
          />
        </Grid>
      </Grid>
      </Box>
    </>
  )
}

export default Location