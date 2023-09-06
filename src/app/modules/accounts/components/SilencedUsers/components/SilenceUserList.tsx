import {Box, IconButton, InputBase, Paper, Typography} from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search'

type Props = {
  children: any
  title: string
}

const SilenceUserList = (props: Props) => {
  const {children, title} = props
  return (
    <Paper sx={{width: '100%', padding: '12px'}}>
      <Typography variant='h6'>{title}</Typography>
      <Paper
        component='form'
        sx={{
          p: '2px 4px',
          m: '4px 0px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <IconButton type='button' sx={{p: '10px'}} aria-label='search'>
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ml: 1, flex: 1}}
          placeholder={'placeholder'}
          inputProps={{'aria-label': 'search google maps'}}
          //   onChange={(e: any) => setSearch(e.target.value)}
        />

        {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
        {/* <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
          <DirectionsIcon />
        </IconButton> */}
      </Paper>
      <Box sx={{minHeight: 50, maxHeight: 300, overflowY: 'auto'}}>{children}</Box>
    </Paper>
  )
}

export default SilenceUserList
