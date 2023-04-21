import { Paper, Typography } from '@mui/material'
import React, { ReactNode } from 'react'
import { IconButton, InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

type Props = {
  children: ReactNode,
  placeholder?: string,
  title:string
}

const FollowingDashboard = (props: Props) => {
  const {children,placeholder,title} = props
  return (
    <Paper sx={{ width: '100%', padding: '12px' }}>
      <Typography variant="h6">{title}</Typography>
      <Paper
        component="form"
        sx={{ p: '2px 4px',m:'4px 0px', display: 'flex', alignItems: 'center', width: '100%' }}
      >
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={placeholder}
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        
        {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
        {/* <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
          <DirectionsIcon />
        </IconButton> */}
      </Paper>
      {children}
    </Paper>
  )
}

export default FollowingDashboard