import {Box, Grid, MenuItem, Select, TextField, Typography} from '@mui/material'
import React from 'react'

type Props = {}
const labels = [
  {id: 1, color: 'red', title: 'Sharing Message'},
  {id: 2, color: 'green', title: 'With Resources to Share'},
  {id: 3, color: 'yellow', title: 'In need of Resources'},
  {id: 4, color: 'dark', title: 'That have an Event'},
]
const PostOptions = (props: Props) => {
  return (
    <>
      <Box sx={{borderRadius: '8px', margin: 4, backgroundColor: '#F6F5F9', padding: 4}}>
        <Grid container alignItems='center' justifyContent='space-between'>
          <Grid item md={4}>
            <Typography>Select the Purpose</Typography>
          </Grid>
          <Grid item md={6}>
            <Select
              fullWidth
              labelId='select-label'
              id='label-select'
              //   value={value}
              label='Label'
              //   onChange={handleChange}
              //   ref={ref}
              classes={{select: 'flex items-center space-x-12'}}
            >
              {labels.map((label) => (
                <MenuItem value={label.id} key={label.id} className='space-x-12'>
                  <Box
                    className='w-12 h-12 shrink-0 rounded-full'
                    sx={{backgroundColor: label.color}}
                  />
                  <span>{label.title}</span>
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <Grid container alignItems='center' mt={2}>
          <Grid item md={3}>
            <Typography>Select the Purpose</Typography>
          </Grid>
          <Grid item md={3}>
            <TextField label='Event Name' fullWidth />
          </Grid>
          <Grid item md={3}>
            <Typography>Timezone</Typography>
          </Grid>
          <Grid item md={3}>
            <Select label='Event Name' fullWidth>
              <MenuItem>Central</MenuItem>
              <MenuItem>Central</MenuItem>
              <MenuItem>Central</MenuItem>
              <MenuItem>Central</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default PostOptions
